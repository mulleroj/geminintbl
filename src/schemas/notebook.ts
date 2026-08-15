import type { Provenance } from './common';

export interface PublicNotebook extends Provenance {
  id: string;
  title: string;
  author?: string;
  publisher?: string;
  category: string;
  description: string;
  url: string;
}
