import type { Provenance } from './common';

export type NotebookSourceType = 'official' | 'education' | 'research' | 'community';
export type NotebookAccess = 'public' | 'google-account';

export interface PublicNotebook extends Provenance {
  id: string;
  title: string;
  author?: string;
  publisher?: string;
  category: string;
  description: string;
  url: string;
  language: string[];
  region: string[];
  topicTags: string[];
  sourceType: NotebookSourceType;
  access: NotebookAccess;
  featured?: boolean;
}
