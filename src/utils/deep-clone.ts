function deepClone<T extends object = object>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    const result: Record<string, unknown> = {};

    for (const [key, item] of Object.entries(obj)) {
      result[key] = deepClone(item);
    }

    return result as T;
  }

  // примитив (или null) — копируется по значению
  return obj;
}

export default deepClone;
