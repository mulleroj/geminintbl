function fieldValue(block, field) {
  return block.match(new RegExp(`\\b${field}:\\s*'([^']*)'`))?.[1] ?? '';
}

function listValue(block, field) {
  const value = block.match(new RegExp(`\\b${field}:\\s*\\[([^\\]]*)\\]`))?.[1] ?? '';
  return [...value.matchAll(/'([^']*)'/g)].map((match) => match[1]);
}

function wordCount(value) {
  return value.trim() ? value.trim().split(/\s+/u).length : 0;
}

function normalizeTitle(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('cs-CZ').replace(/[^a-z0-9]+/g, ' ').trim();
}

export function parsePromptRecord(record) {
  const block = record.block;
  const prompt = fieldValue(block, 'prompt');
  return {
    ...record,
    id: fieldValue(block, 'id') || record.id,
    slug: fieldValue(block, 'slug'),
    title: fieldValue(block, 'title'),
    description: fieldValue(block, 'description'),
    prompt,
    category: fieldValue(block, 'category'),
    target: fieldValue(block, 'target'),
    complexity: fieldValue(block, 'complexity'),
    tags: listValue(block, 'tags'),
    audience: listValue(block, 'audience'),
    wordCount: wordCount(prompt),
    normalizedTitle: normalizeTitle(fieldValue(block, 'title')),
    featured: /\bfeatured:\s*true\b/.test(block),
    needsReview: /\bneedsReview:\s*true\b/.test(block),
    original: /\.\.\.projectProvenance\b/.test(block),
    hasAuthor: /\bauthor:\s*'/.test(block) || /\.\.\.projectProvenance\b/.test(block),
    hasProvenance: /\bsourceLabel:\s*'/.test(block) || /\.\.\.projectProvenance\b/.test(block),
  };
}

function duplicateValues(values) {
  const counts = new Map();
  values.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value).sort();
}

export function auditPromptQuality(records) {
  const prompts = records.map(parsePromptRecord);
  const errors = [];
  for (const prompt of prompts) {
    if (prompt.wordCount < 30) errors.push(`prompt:${prompt.id} extremely short (${prompt.wordCount} words)`);
    if (!prompt.description) errors.push(`prompt:${prompt.id} missing description`);
    if (!prompt.prompt) errors.push(`prompt:${prompt.id} missing prompt`);
    if (!prompt.tags.length) errors.push(`prompt:${prompt.id} empty tags`);
    if (!prompt.complexity) errors.push(`prompt:${prompt.id} missing complexity`);
    if (!prompt.hasAuthor) errors.push(`prompt:${prompt.id} missing author/provenance`);
    if (!prompt.hasProvenance) errors.push(`prompt:${prompt.id} missing sourceLabel/provenance`);
    if (/\[TODO\]|TODO:|\blorem\s+ipsum/i.test(prompt.prompt)) errors.push(`prompt:${prompt.id} contains placeholder text`);
  }
  const duplicateTitles = duplicateValues(prompts.map((prompt) => prompt.title));
  const duplicateNormalizedTitles = duplicateValues(prompts.map((prompt) => prompt.normalizedTitle));
  if (duplicateTitles.length) errors.push(...duplicateTitles.map((title) => `duplicate title: ${title}`));
  if (duplicateNormalizedTitles.length) errors.push(...duplicateNormalizedTitles.map((title) => `duplicate normalized title: ${title}`));
  return {
    prompts,
    errors,
    duplicateTitles,
    duplicateNormalizedTitles,
    metrics: {
      byCategory: Object.fromEntries([...new Set(prompts.map((prompt) => prompt.category))].sort().map((category) => [category, prompts.filter((prompt) => prompt.category === category).length])),
      byTarget: Object.fromEntries([...new Set(prompts.map((prompt) => prompt.target))].sort().map((target) => [target, prompts.filter((prompt) => prompt.target === target).length])),
      byAudience: Object.fromEntries([...new Set(prompts.flatMap((prompt) => prompt.audience))].sort().map((audience) => [audience, prompts.filter((prompt) => prompt.audience.includes(audience)).length])),
      byComplexity: Object.fromEntries([...new Set(prompts.map((prompt) => prompt.complexity))].sort().map((complexity) => [complexity, prompts.filter((prompt) => prompt.complexity === complexity).length])),
      featured: prompts.filter((prompt) => prompt.featured).length,
      needsReview: prompts.filter((prompt) => prompt.needsReview).length,
      missingDescription: prompts.filter((prompt) => !prompt.description).length,
      missingPrompt: prompts.filter((prompt) => !prompt.prompt).length,
      missingAuthor: prompts.filter((prompt) => !prompt.hasAuthor).length,
      missingProvenance: prompts.filter((prompt) => !prompt.hasProvenance).length,
      original: prompts.filter((prompt) => prompt.original).length,
      externalAttributed: prompts.filter((prompt) => !prompt.original && prompt.hasProvenance).length,
    },
  };
}

export { normalizeTitle };
