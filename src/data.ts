export * from './schemas';
export { assertCatalogValid, validateCatalog, type CatalogIntegrityReport, type CatalogInput } from './schemas/validate';

export { promptCategories, sourceCategories, guideCategories, toolCategories, notebookCategories } from './data/categories';
export { prompts } from './data/prompts';
export { sources } from './data/sources';
export { tools } from './data/tools';
export { notebooks } from './data/notebooks';
export { guides } from './data/guides';

import { guideCategories, notebookCategories, promptCategories, sourceCategories, toolCategories } from './data/categories';
import { guides } from './data/guides';
import { notebooks } from './data/notebooks';
import { prompts } from './data/prompts';
import { sources } from './data/sources';
import { tools } from './data/tools';
import { assertCatalogValid } from './schemas/validate';

export const catalogIntegrity = assertCatalogValid({ prompts, sources, tools, notebooks, guides, promptCategories, sourceCategories, guideCategories, toolCategories, notebookCategories });

export function promptCategory(id: string) {
  return promptCategories.find((category) => category.id === id) ?? promptCategories[0];
}

export function sourceCategory(id: string) {
  return sourceCategories.find((category) => category.id === id) ?? sourceCategories[0];
}

export function guideCategory(id: string) {
  return guideCategories.find((category) => category.id === id) ?? guideCategories[0];
}

export function toolCategory(id: string) {
  return toolCategories.find((category) => category.id === id) ?? toolCategories[0];
}

export function notebookCategory(id: string) {
  return notebookCategories.find((category) => category.id === id) ?? notebookCategories[0];
}

export function promptBySlug(slug: string) {
  return prompts.find((prompt) => prompt.slug === slug);
}

export function guideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
