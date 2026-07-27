import {
  ApiError,
  HttpAbortError,
  HttpError,
  HttpNetworkError,
  HttpTimeoutError,
  type YandexApiError,
} from '../utils/http-error.ts';
import HTTPTransport, { type RequestOptions } from '../utils/http.ts';
import { apiUrl } from './constants.ts';

export class BaseAPI {
  private transport: HTTPTransport;
  constructor(path: string) {
    this.transport = new HTTPTransport(apiUrl + path);
  }

  get = <T = unknown>(
    shortUrl: string,
    options: RequestOptions = {},
  ): Promise<T> => {
    return this.wrap(this.transport.get<T>(shortUrl, options));
  };

  post = <T = unknown>(
    shortUrl: string,
    options: RequestOptions = {},
  ): Promise<T> => {
    return this.wrap(this.transport.post<T>(shortUrl, options));
  };

  put = <T = unknown>(
    shortUrl: string,
    options: RequestOptions = {},
  ): Promise<T> => {
    return this.wrap(this.transport.put<T>(shortUrl, options));
  };

  delete = <T = unknown>(
    shortUrl: string,
    options: RequestOptions = {},
  ): Promise<T> => {
    return this.wrap(this.transport.delete<T>(shortUrl, options));
  };

  private async wrap<T>(p: Promise<T>): Promise<T> {
    try {
      return await p;
    } catch (error) {
      if (error instanceof HttpNetworkError) {
        throw new ApiError('Сеть недоступна');
      }
      if (error instanceof HttpAbortError) {
        throw new ApiError('Запрос был прерван');
      }
      if (error instanceof HttpTimeoutError) {
        throw new ApiError('Сервер не отвечает');
      }
      if (error instanceof HttpError) {
        const errorResponse: unknown = this.getParsedError(error.responseText);
        if (this.isYandexApiError(errorResponse)) {
          throw new ApiError(errorResponse.reason);
        }
      }

      throw new ApiError('Неопознанная ошибка');
    }
  }

  private getParsedError(response: string): unknown {
    try {
      return JSON.parse(response);
    } catch {
      return null;
    }
  }

  private isYandexApiError(reason: unknown): reason is YandexApiError {
    return (
      typeof reason === 'object' &&
      reason !== null &&
      'reason' in reason &&
      typeof (reason as YandexApiError).reason === 'string'
    );
  }
}
