import type { Indexed } from './indexed.ts';
import merge from './merge.ts';

export default function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed {
  if (typeof object !== 'object' || object === null) {
    return {} as Indexed;
  }

  const result = path.split('.').reduceRight<unknown>(
    (acc, key) => ({
      [key]: acc,
    }),
    value,
  );
  return merge(object as Indexed, result as Indexed);
}
