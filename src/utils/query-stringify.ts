export function queryStringify(
  data: Record<string, string | number | boolean | undefined>,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) {
      continue;
    }
    params.append(key, String(value));
  }
  return params.toString();
}
