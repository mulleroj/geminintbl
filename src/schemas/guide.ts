import type { Provenance } from './common';

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide extends Provenance {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  updatedAt?: string;
  tags: string[];
  content: GuideSection[];
  featured?: boolean;
}

export interface GuideCategory {
  id: string;
  label: string;
  description: string;
}
