import { defineConfig } from 'vite';

const apiProxy = {
  '/api/v2': {
    target: 'https://ya-praktikum.tech',
    changeOrigin: true,
    // API ставит куку с Domain=ya-praktikum.tech — браузер на localhost её отбросит
    cookieDomainRewrite: '',
  },
};

export default defineConfig({
  server: {
    port: 3000,
    proxy: apiProxy,
  },
  preview: {
    port: 3000,
    proxy: apiProxy,
  },
  resolve: {
    alias: {
      styles: '/src/styles',
    },
  },
});
