const praktikumDomain = 'ya-praktikum.tech';
export const wsOrigin = import.meta.env.PROD
  ? `wss://${praktikumDomain}`
  : `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`;

const apiOrigin = import.meta.env.PROD ? `https://${praktikumDomain}` : '';
export const apiUrl = `${apiOrigin}/api/v2/`;
export const resourcesUrl = apiUrl + 'resources';
