import type { CatalogCategory, Guide, GuideCategory, Prompt, PromptCategory, PublicNotebook, Source, SourceCategory, Tool } from './index';

export interface CatalogInput {
  prompts: Prompt[];
  sources: Source[];
  tools: Tool[];
  notebooks: PublicNotebook[];
  guides: Guide[];
  promptCategories: PromptCategory[];
  sourceCategories: SourceCategory[];
  guideCategories: GuideCategory[];
  toolCategories: CatalogCategory[];
  notebookCategories: CatalogCategory[];
  teacherWorkflows?: Array<{ id: string }>;
}

export interface CatalogIntegrityReport {
  duplicateIds: string[];
  duplicateSlugs: string[];
  invalidUrls: string[];
  invalidRelatedReferences: string[];
  missingSourceUrl: number;
  needsReview: number;
}

const isNonEmpty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

function isValidUrl(value: string, allowInternal = false): boolean {
  if (allowInternal && value.startsWith('/')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function duplicates(values: string[]): string[] {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value).sort();
}

export function validateCatalog(input: CatalogInput): CatalogIntegrityReport {
  const issues: string[] = [];
  const invalidUrls: string[] = [];
  const invalidRelatedReferences: string[] = [];
  const allIdEntries = [
    ...input.prompts.map((item) => ['prompt', item.id] as const),
    ...input.sources.map((item) => ['source', item.id] as const),
    ...input.tools.map((item) => ['tool', item.id] as const),
    ...input.notebooks.map((item) => ['notebook', item.id] as const),
    ...input.guides.map((item) => ['guide', item.id] as const),
  ];
  const duplicateIds = duplicates(allIdEntries.map(([, id]) => id));
  const duplicateSlugs = [
    ...duplicates(input.prompts.map((item) => item.slug)).map((slug) => `prompt:${slug}`),
    ...duplicates(input.guides.map((item) => item.slug)).map((slug) => `guide:${slug}`),
  ].sort();
  const promptCategoryIds = new Set(input.promptCategories.map((item) => item.id));
  const sourceCategoryIds = new Set(input.sourceCategories.map((item) => item.id));
  const guideCategoryIds = new Set(input.guideCategories.map((item) => item.id));
  const toolCategoryIds = new Set(input.toolCategories.map((item) => item.id));
  const notebookCategoryIds = new Set(input.notebookCategories.map((item) => item.id));
  const promptIds = new Set(input.prompts.map((item) => item.id));
  const sourceIds = new Set(input.sources.map((item) => item.id));
  const toolIds = new Set(input.tools.map((item) => item.id));
  const guideIds = new Set(input.guides.map((item) => item.id));
  const workflowIds = new Set((input.teacherWorkflows ?? []).map((item) => item.id));

  input.prompts.forEach((item) => {
    if (!isNonEmpty(item.id) || !isNonEmpty(item.slug) || !isNonEmpty(item.title) || !isNonEmpty(item.description) || !isNonEmpty(item.category) || !isNonEmpty(item.prompt)) issues.push(`prompt:${item.id || '(missing)'} missing required field`);
    if (!promptCategoryIds.has(item.category)) issues.push(`prompt:${item.id} unknown category ${item.category}`);
  });
  input.sources.forEach((item) => {
    if (!isNonEmpty(item.id) || !isNonEmpty(item.title) || !isNonEmpty(item.url) || !isNonEmpty(item.category)) issues.push(`source:${item.id || '(missing)'} missing required field`);
    if (!sourceCategoryIds.has(item.category)) issues.push(`source:${item.id} unknown category ${item.category}`);
    if (!isValidUrl(item.url)) invalidUrls.push(`source:${item.id}:url`);
  });
  input.tools.forEach((item) => {
    if (!isNonEmpty(item.id) || !isNonEmpty(item.title) || !isNonEmpty(item.url) || !isNonEmpty(item.category) || !isNonEmpty(item.workflowTip)) issues.push(`tool:${item.id || '(missing)'} missing required field`);
    if (!toolCategoryIds.has(item.category)) issues.push(`tool:${item.id} unknown category ${item.category}`);
    if (!isValidUrl(item.url, true)) invalidUrls.push(`tool:${item.id}:url`);
    if (item.githubUrl && !isValidUrl(item.githubUrl)) invalidUrls.push(`tool:${item.id}:githubUrl`);
    if (item.github && !isValidUrl(item.github)) invalidUrls.push(`tool:${item.id}:github`);
  });
  input.notebooks.forEach((item) => {
    if (!isNonEmpty(item.id) || !isNonEmpty(item.title) || !isNonEmpty(item.url) || !isNonEmpty(item.category) || !isNonEmpty(item.language.join(' ')) || !isNonEmpty(item.region.join(' ')) || !isNonEmpty(item.topicTags.join(' '))) issues.push(`notebook:${item.id || '(missing)'} missing required field`);
    if (!notebookCategoryIds.has(item.category)) issues.push(`notebook:${item.id} unknown category ${item.category}`);
    if (!isValidUrl(item.url)) invalidUrls.push(`notebook:${item.id}:url`);
  });
  input.guides.forEach((item) => {
    if (!isNonEmpty(item.id) || !isNonEmpty(item.slug) || !isNonEmpty(item.title) || !isNonEmpty(item.category)) issues.push(`guide:${item.id || '(missing)'} missing required field`);
    if (!guideCategoryIds.has(item.category)) issues.push(`guide:${item.id} unknown category ${item.category}`);
    if (!isNonEmpty(item.level) || !isNonEmpty(item.depthClass) || !isNonEmpty(item.lastVerified)) issues.push(`guide:${item.id} missing V1 verification metadata`);
    item.relatedPromptIds.forEach((id) => { if (!promptIds.has(id)) invalidRelatedReferences.push(`guide:${item.id}:prompt:${id}`); });
    item.relatedSourceIds.forEach((id) => { if (!sourceIds.has(id)) invalidRelatedReferences.push(`guide:${item.id}:source:${id}`); });
    item.relatedToolIds.forEach((id) => { if (!toolIds.has(id)) invalidRelatedReferences.push(`guide:${item.id}:tool:${id}`); });
    item.relatedWorkflowIds.forEach((id) => { if (!workflowIds.has(id)) invalidRelatedReferences.push(`guide:${item.id}:workflow:${id}`); });
    (item.relatedGuideIds ?? []).forEach((id) => { if (id === item.id || !guideIds.has(id)) invalidRelatedReferences.push(`guide:${item.id}:guide:${id}`); });
    item.officialReferences.forEach((reference) => { if (!isNonEmpty(reference.label) || !isValidUrl(reference.url)) invalidUrls.push(`guide:${item.id}:officialReferences`); });
  });

  [...input.prompts, ...input.sources, ...input.tools, ...input.notebooks, ...input.guides].forEach((item) => {
    if (item.sourceUrl && !isValidUrl(item.sourceUrl, true)) invalidUrls.push(`${item.id}:sourceUrl`);
  });

  if (duplicateIds.length) issues.push(`duplicate ids: ${duplicateIds.join(', ')}`);
  if (duplicateSlugs.length) issues.push(`duplicate slugs: ${duplicateSlugs.join(', ')}`);
  if (invalidRelatedReferences.length) issues.push(`invalid related references: ${invalidRelatedReferences.join(', ')}`);
  if (invalidUrls.length) issues.push(`invalid urls: ${invalidUrls.join(', ')}`);
  if (issues.length) throw new Error(`Catalog integrity failed:\n${issues.map((issue) => `- ${issue}`).join('\n')}`);

  const recordsWithProvenance = [...input.prompts, ...input.tools, ...input.notebooks, ...input.guides];
  return {
    duplicateIds,
    duplicateSlugs,
    invalidUrls,
    invalidRelatedReferences,
    missingSourceUrl: recordsWithProvenance.filter((item) => !item.sourceUrl).length,
    needsReview: [...input.prompts, ...input.sources, ...input.tools, ...input.notebooks, ...input.guides].filter((item) => item.needsReview).length,
  };
}

export function assertCatalogValid(input: CatalogInput): CatalogIntegrityReport {
  return validateCatalog(input);
}
