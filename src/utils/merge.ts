import deepClone from './deep-clone';
import { type Indexed, isIndexed } from './indexed.ts';

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = deepClone(lhs);

  for (const [key, rightValue] of Object.entries(rhs)) {
    const leftValue = result[key];

    if (isIndexed(leftValue) && isIndexed(rightValue)) {
      result[key] = merge(leftValue, rightValue);
    } else {
      result[key] = rightValue;
    }
  }

  return result;
}
