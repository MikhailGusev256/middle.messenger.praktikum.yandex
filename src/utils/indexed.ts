export type Indexed<T = unknown> = { [key: string]: T };
export function isIndexed(value: unknown): value is Indexed {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
