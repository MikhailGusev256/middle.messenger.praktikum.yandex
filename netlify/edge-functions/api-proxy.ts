// Прокси к ya-praktikum API вместо [[redirects]]-rewrite: редирект Netlify
// передаёт Set-Cookie как есть, а браузер отбрасывает куку с
// Domain=ya-praktikum.tech на домене *.netlify.app. Здесь Domain вырезается,
// и кука становится first-party (аналог cookieDomainRewrite у vite-прокси).
const API_ORIGIN = 'https://ya-praktikum.tech';

export default async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const target = API_ORIGIN + url.pathname + url.search;

  const body = ['GET', 'HEAD'].includes(request.method)
    ? undefined
    : await request.arrayBuffer();

  const apiResponse = await fetch(target, {
    method: request.method,
    headers: request.headers,
    body,
    redirect: 'manual',
  });

  const headers = new Headers();
  for (const [key, value] of apiResponse.headers) {
    // set-cookie обрабатывается отдельно; content-encoding/length не совпадают
    // с телом после того, как fetch распаковал ответ
    if (!['set-cookie', 'content-encoding', 'content-length'].includes(key)) {
      headers.append(key, value);
    }
  }
  for (const cookie of apiResponse.headers.getSetCookie()) {
    headers.append('set-cookie', cookie.replace(/;\s*Domain=[^;]+/i, ''));
  }

  return new Response(apiResponse.body, {
    status: apiResponse.status,
    headers,
  });
};

export const config = { path: '/api/v2/*' };
