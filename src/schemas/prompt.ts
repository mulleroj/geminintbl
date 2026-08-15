import type { Audience, EducationLevel, Provenance } from './common';

export type PromptTarget = 'chat' | 'chat-settings' | 'audio' | 'slides' | 'infographic' | 'video' | 'other';

export interface Prompt extends Provenance {
  id: string;
  slug: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  target: PromptTarget;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  audience?: Audience[];
  educationLevel?: EducationLevel[];
}

export interface PromptCategory {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  color: string;
}
