import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import esLintPrettier from 'eslint-config-prettier/flat';
import perfectionListEsLint from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/']),
  {
    extends: ['js/recommended'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.browser },
    plugins: { js },
  },
  tseslint.configs.recommended,
  {
    extends: ['json/recommended'],
    files: ['**/*.json'],
    language: 'json/json',
    plugins: { json },
  },
  {
    extends: ['markdown/recommended'],
    files: ['**/*.md'],
    language: 'markdown/commonmark',
    plugins: { markdown },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { perfectionist: perfectionListEsLint },
    rules: {
      'perfectionist/sort-classes': [
        'error',
        {
          groups: [
            'static-property',
            'static-method',
            'property',
            'constructor',
            'method',
          ],
        },
      ],
    },
  },
  esLintPrettier,
]);
