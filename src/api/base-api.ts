import { type ApiError, HttpError } from '../utils/http-error.ts';
import HTTPTransport, { type RequestOptions } from '../utils/http.ts';

export class BaseAPI {
  private transport: HTTPTransport;
  constructor(path: string) {
    this.transport = new HTTPTransport(path);
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
      if (!this.hasResponse(error)) {
        throw new HttpError(0, 'Сеть недоступна');
      }

      const errorResponse: unknown = this.getParsedError(error.response);
      if (this.isApiError(errorResponse)) {
        throw new HttpError(error.status, errorResponse.reason);
      }
      throw new HttpError(error.status, 'Неопознанная ошибка');
    }
  }

  private getParsedError(response: string): unknown {
    try {
      return JSON.parse(response);
    } catch {
      return null;
    }
  }

  private hasResponse(
    reason: unknown,
  ): reason is { status: number; response: string } {
    return (
      typeof reason === 'object' &&
      reason !== null &&
      'status' in reason &&
      'response' in reason
    );
  }
  private isApiError(reason: unknown): reason is ApiError {
    return (
      typeof reason === 'object' &&
      reason !== null &&
      'reason' in reason &&
      typeof (reason as ApiError).reason === 'string'
    );
  }
}
