import { describe, expect, it, vi } from 'vitest';
import { HttpError, HttpNetworkError } from './errors.ts';
import HTTPTransport from './http.ts';

interface Overrides {
  baseUrl: string;
  status: number;
  responseText: string;
}

function createFakeXhr(overrides?: Partial<Overrides>) {
  return {
    open: vi.fn(),
    setRequestHeader: vi.fn(),
    getResponseHeader: vi.fn(() => 'application/json'),
    send: vi.fn(),
    withCredentials: false,
    status: 200,
    statusText: 'OK',
    responseText: '{}',
    onload: () => {},
    onerror: () => {},
    ...overrides,
  };
}

function setup(overrides?: Partial<Overrides>) {
  const fakeXhr = createFakeXhr(overrides);
  return {
    xhr: fakeXhr,
    transport: new HTTPTransport(
      overrides?.baseUrl ?? '',
      () => fakeXhr as unknown as XMLHttpRequest,
    ),
  };
}

describe('HTTPTransport', () => {
  it('get вызывает open с параметрами', async () => {
    const { xhr, transport } = setup();
    const promise = transport.get('/', { queryParameters: { offset: 0 } });
    xhr.onload();
    await promise;
    expect(xhr.open).toHaveBeenCalledWith('GET', '/?offset=0');
  });

  it('get склеивает baseUrl и путь', async () => {
    const { xhr, transport } = setup({ baseUrl: 'base' });
    const promise = transport.get('/', {});
    xhr.onload();
    await promise;
    expect(xhr.open).toHaveBeenCalledWith('GET', 'base/');
  });

  it('get устанавливает withCredentials в true', async () => {
    const { xhr, transport } = setup();
    const promise = transport.get('/', {});
    xhr.onload();
    await promise;
    expect(xhr.withCredentials).toBe(true);
  });

  it('get возвращает распаршенный объект', async () => {
    const { xhr, transport } = setup({ responseText: '{"id":1}' });
    const promise = transport.get('/', {});
    xhr.onload();
    await expect(promise).resolves.toEqual({ id: 1 });
  });

  it('post отправляет объект как JSON строку', async () => {
    const { xhr, transport } = setup();
    const promise = transport.post('/', { data: { id: 1 } });
    xhr.onload();
    await promise;
    expect(xhr.send).toHaveBeenCalledWith('{"id":1}');
    expect(xhr.setRequestHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/json',
    );
  });

  it('post отправляет форму как FormData', async () => {
    const { xhr, transport } = setup();
    const data = new FormData();
    const promise = transport.post('/', { data });
    xhr.onload();
    await promise;
    expect(xhr.send).toHaveBeenCalledWith(data);
    expect(xhr.setRequestHeader).not.toHaveBeenCalled();
  });

  it('статус ≥400 → HttpError', async () => {
    const { xhr, transport } = setup({
      status: 404,
      responseText: '{"reason":"Not found"}',
    });
    const promise = transport.get('/', {});
    xhr.onload();
    await expect(promise).rejects.toBeInstanceOf(HttpError);
    await expect(promise).rejects.toMatchObject({
      status: 404,
    });
  });

  it('событие onerror → HttpNetworkError', async () => {
    const { xhr, transport } = setup();
    const promise = transport.get('/', {});
    xhr.onerror();
    await expect(promise).rejects.toBeInstanceOf(HttpNetworkError);
  });
});
