type StringIndexed = Record<string, unknown>;

function stringify(key: string, value: unknown): string {
  if (value !== null && typeof value === 'object') {
    return Object.entries(value as StringIndexed)
      .map(([childKey, childValue]) =>
        stringify(`${key}[${childKey}]`, childValue),
      )
      .join('&');
  }

  return `${key}=${value}`;
}

export default function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object' || data === null) {
    throw new Error('input must be an object');
  }

  return Object.entries(data)
    .map(([key, value]) => stringify(key, value))
    .join('&');
}
