import { describe, expect, it, vi } from 'vitest';
import HTTPTransport from './http.ts';

function createFakeXhr() {
  return {
    open: vi.fn(),
    setRequestHeader: vi.fn(),
    getResponseHeader: vi.fn(() => 'application/json'),
    send: vi.fn(),
    status: 200,
    statusText: 'OK',
    responseText: '{}',
    onload: () => {},
  };
}

function setup() {
  const fakeXhr = createFakeXhr();
  return {
    xhr: fakeXhr,
    transport: new HTTPTransport(
      '',
      () => fakeXhr as unknown as XMLHttpRequest,
    ),
  };
}

describe('get', () => {
  it('вызывает open с параметрами', async () => {
    const { xhr, transport } = setup();
    const promise = transport.get('/', { queryParameters: { offset: 0 } });
    xhr.onload();
    await promise;
    expect(xhr.open).toHaveBeenCalledWith('GET', '/?offset=0');
  });
});
