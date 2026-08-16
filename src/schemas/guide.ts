import type { Provenance } from './common';

export type GuideLevel = 'beginner' | 'intermediate' | 'advanced';

export type GuideAudience = 'teacher' | 'student' | 'researcher' | 'professional' | 'general';

export interface GuideReference {
  label: string;
  url: string;
}

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
  level: GuideLevel;
  audience: GuideAudience[];
  relatedPromptIds: string[];
  relatedSourceIds: string[];
  relatedToolIds: string[];
  relatedWorkflowIds: string[];
  officialReferences: GuideReference[];
  lastVerified: string;
  availabilityNote?: string;
  featured?: boolean;
}

export interface GuideCategory {
  id: string;
  label: string;
  description: string;
}
