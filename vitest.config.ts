import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Или 'jsdom' для браузерного окружения
    include: ['**/*.{test,spec}.{js,ts}'],
  },
});
