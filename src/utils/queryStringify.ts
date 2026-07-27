export function queryStringify(
  data: Record<string, string | number | boolean | undefined>,
) {
  const keys = Object.keys(data);

  if (keys.length === 0) {
    return '';
  }

  return keys.reduce((result, key, index) => {
    const value = data[key];

    if (value === undefined || value === null) {
      return result;
    }

    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);

    const separator = index < keys.length - 1 ? '&' : '';

    return `${result}${encodedKey}=${encodedValue}${separator}`;
  }, '?');
}
