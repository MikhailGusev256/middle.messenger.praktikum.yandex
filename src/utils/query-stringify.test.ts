import { describe, expect, it } from 'vitest';
import { queryStringify } from './query-stringify.ts';

describe('queryStringify', () => {
  it('возвращает пустую строку при отсутствии свойств', () => {
    expect(queryStringify({})).toBe('');
  });

  it('склеивает несколько параметров через &', () => {
    expect(queryStringify({ offset: 0, limit: 20 })).toBe('offset=0&limit=20');
  });
});
