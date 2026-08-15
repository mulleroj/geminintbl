import type { Provenance } from './common';

export type SourceAccess = 'free' | 'freemium' | 'paid' | 'institutional';

export interface Source extends Provenance {
  id: string;
  title: string;
  url: string;
  domain: string;
  category: string;
  description: string;
  importTip?: string;
  access: SourceAccess;
  language?: string[];
  region?: string[];
  featured?: boolean;
}

export interface SourceCategory {
  id: string;
  label: string;
  description: string;
}
