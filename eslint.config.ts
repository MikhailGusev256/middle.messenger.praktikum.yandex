import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import esLintPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    extends: ['markdown/recommended'],
  },
  esLintPrettier,
]);
