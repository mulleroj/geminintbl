import type { Provenance } from './common';

export interface Tool extends Provenance {
  id: string;
  title: string;
  author?: string;
  type: string;
  description: string;
  tags: string[];
  pricing: 'free' | 'freemium' | 'paid' | 'open source';
  url: string;
  github?: string;
  featured?: boolean;
}
