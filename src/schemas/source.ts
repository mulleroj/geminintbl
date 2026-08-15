import type { Provenance } from './common';

export type SourceAccess = 'free' | 'freemium' | 'paid' | 'institutional';
export type SourceType = 'official' | 'academic' | 'open-data' | 'library' | 'archive' | 'reference' | 'journalism' | 'fact-check';
export type NotebookSuitability = 'high' | 'medium' | 'limited';

export interface Source extends Provenance {
  id: string;
  title: string;
  url: string;
  domain: string;
  category: string;
  description: string;
  importTip: string;
  access: SourceAccess;
  sourceType: SourceType;
  notebookSuitability: NotebookSuitability;
  verifiedAt: string;
  language: string[];
  region: string[];
  featured?: boolean;
}

export interface SourceCategory {
  id: string;
  label: string;
  description: string;
}
