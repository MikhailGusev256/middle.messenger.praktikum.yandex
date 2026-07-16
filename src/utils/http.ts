import { apiUrl } from '../api/constants.ts';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

function queryStringify(
  data: Record<string, string | number | boolean | undefined>,
) {
  const keys = Object.keys(data);

  if (keys.length === 0) {
    return '';
  }

  return keys.reduce((result, key, index) => {
    const value = data[key];

    if (value === undefined || value === null) {
      return result;
    }

    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);

    const separator = index < keys.length - 1 ? '&' : '';

    return `${result}${encodedKey}=${encodedValue}${separator}`;
  }, '?');
}

export interface RequestOptions {
  data?: FormData | Record<string, unknown>;
  queryParameters?: Record<string, string | number | boolean | undefined>;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
  headers?: Record<string, string>;
}
interface RequestOptionsWithMethod extends RequestOptions {
  method: keyof typeof METHODS;
}

class HTTPTransport {
  private readonly _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = apiUrl + baseUrl;
  }

  get = <TResponse = unknown>(
    shortUrl: string,
    options: RequestOptions = {},
  ): Promise<TResponse> => {
    return this.request(
      shortUrl,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  post = <TResponse = unknown>(
    shortUrl: string,
    options: RequestOptions = {},
  ): Promise<TResponse> => {
    return this.request(
      shortUrl,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  put = <TResponse = unknown>(
    shortUrl: string,
    options: RequestOptions = {},
  ): Promise<TResponse> => {
    return this.request(
      shortUrl,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  delete = <TResponse = unknown>(
    shortUrl: string,
    options: RequestOptions = {},
  ): Promise<TResponse> => {
    return this.request(
      shortUrl,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = <TResponse = unknown>(
    shortUrl: string,
    options: RequestOptionsWithMethod,
    timeout = 5000,
  ): Promise<TResponse> => {
    const url = this._baseUrl + shortUrl;
    const {
      headers = {},
      method,
      data,
      queryParameters = {},
      responseType,
    } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('HTTP method is required'));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && queryParameters
          ? `${url}${queryStringify(queryParameters)}`
          : url,
      );

      if (responseType) {
        xhr.responseType = responseType;
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response;

          if (xhr.responseType) {
            response = xhr.response;
          } else {
            try {
              const contentType = xhr.getResponseHeader('Content-Type');
              if (contentType && contentType.includes('application/json')) {
                response = JSON.parse(xhr.responseText);
              } else {
                response = xhr.responseText;
              }
            } catch (e) {
              console.log(e);
              response = xhr.responseText;
            }
          }

          resolve(response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.responseText,
            request: xhr,
          });
        }
      };

      xhr.onabort = () =>
        reject({
          reason: 'Request aborted',
          request: xhr,
        });

      xhr.onerror = () =>
        reject({
          reason: 'Network error',
          request: xhr,
        });

      xhr.timeout = timeout;

      xhr.ontimeout = () =>
        reject({
          reason: 'Request timeout',
          timeout: timeout,
          request: xhr,
        });

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else if (typeof data === 'object') {
        if (!headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
