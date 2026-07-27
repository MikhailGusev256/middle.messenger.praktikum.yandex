import {
  HttpAbortError,
  HttpError,
  HttpNetworkError,
  HttpTimeoutError,
} from './http-error.ts';
import { queryStringify } from './query-stringify.ts';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

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

export function parseXhr(xhr: XMLHttpRequest) {
  if (xhr.responseType) {
    return xhr.response;
  } else {
    try {
      const contentType = xhr.getResponseHeader('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return JSON.parse(xhr.responseText);
      } else {
        return xhr.responseText;
      }
    } catch (e) {
      console.log(e);
      return xhr.responseText;
    }
  }
}

class HTTPTransport {
  private readonly _baseUrl: string;
  private readonly _createXhr: () => XMLHttpRequest;

  constructor(
    baseUrl: string,
    createXhr: () => XMLHttpRequest = () => new XMLHttpRequest(),
  ) {
    this._baseUrl = baseUrl;
    this._createXhr = createXhr;
  }

  private makeMethod(requestMethod: keyof typeof METHODS) {
    return <TResponse = unknown>(
      shortUrl: string,
      options: RequestOptions = {},
    ): Promise<TResponse> => {
      return this.request(
        shortUrl,
        { ...options, method: requestMethod },
        options.timeout,
      );
    };
  }

  get = this.makeMethod(METHODS.GET);
  post = this.makeMethod(METHODS.POST);
  put = this.makeMethod(METHODS.PUT);
  delete = this.makeMethod(METHODS.DELETE);

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

      const xhr = this._createXhr();
      xhr.withCredentials = true;
      xhr.timeout = timeout;
      const isGet = method === METHODS.GET;
      const queryString = queryStringify(queryParameters);
      xhr.open(method, isGet && queryString ? `${url}?${queryString}` : url);

      if (responseType) {
        xhr.responseType = responseType;
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(parseXhr(xhr));
        } else {
          reject(new HttpError(xhr.status, xhr.statusText, xhr.responseText));
        }
      };

      xhr.onabort = () => reject(new HttpAbortError());
      xhr.onerror = () => reject(new HttpNetworkError());
      xhr.ontimeout = () => reject(new HttpTimeoutError());

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
