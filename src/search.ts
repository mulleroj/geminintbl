export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('cs-CZ')
    .trim();
}

export function matchesSearch(values: Array<string | undefined>, query: string): boolean {
  const needle = normalizeSearchText(query);
  if (!needle) return true;
  const haystack = normalizeSearchText(values.filter(Boolean).join(' '));
  return needle.split(/\s+/).every((token) => haystack.includes(token));
}
