export default function trim(value: string, trimmedCharacters = ' ') {
  const characterSet = new Set(trimmedCharacters);
  let result = '';
  for (const char of value) {
    if (!characterSet.has(char)) {
      result += char;
    }
  }
  return result;
}
