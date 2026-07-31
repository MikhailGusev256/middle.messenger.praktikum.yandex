export class HttpError extends Error {
  public status: number;
  public responseText: string;
  constructor(status: number, message: string, responseText: string) {
    super(message);
    this.status = status;
    this.responseText = responseText;
  }
}

export class HttpAbortError extends Error {}
export class HttpNetworkError extends Error {}
export class HttpTimeoutError extends Error {}
export class WsDisconnectedError extends Error {}

export class ApiError extends Error {}

export type YandexApiError = {
  reason: string;
};
