import js from '@eslint/js';
import markdown from '@eslint/markdown';
import esLintPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/', '.claude/']),
  {
    extends: ['js/recommended'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.browser },
    plugins: { js },
  },
  tseslint.configs.recommended,
  {
    extends: ['markdown/recommended'],
    files: ['**/*.md'],
    language: 'markdown/commonmark',
    plugins: { markdown },
  },
  esLintPrettier,
]);
