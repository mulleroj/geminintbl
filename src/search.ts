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
  const haystackTokens = haystack.split(/\s+/u);
  const rawTokens = query.trim().split(/\s+/u);
  return needle.split(/\s+/u).every((token, index) => {
    const rawToken = rawTokens[index] ?? '';
    const isAcronym = /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]{2,}$/u.test(rawToken);
    return isAcronym ? haystackTokens.includes(token) : haystack.includes(token);
  });
}
