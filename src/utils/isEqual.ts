import { isIndexed } from './indexed.ts';

export default function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length != b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (isIndexed(a) && isIndexed(b)) {
    const aEntries = Object.entries(a);
    const keyB = Object.keys(b);
    if (aEntries.length != keyB.length) {
      return false;
    }
    for (const [key, value] of aEntries) {
      if (!isEqual(b[key], value)) {
        return false;
      }
    }
    return true;
  }

  return false;
}
