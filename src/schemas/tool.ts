import type { Provenance } from './common';

export type ToolSourceType = 'official' | 'open-source' | 'commercial' | 'community';
export type ToolIntegrationLevel = 'direct' | 'workflow' | 'adjacent';

export interface Tool extends Provenance {
  id: string;
  title: string;
  author?: string;
  type: string;
  category: string;
  description: string;
  tags: string[];
  pricing: 'free' | 'freemium' | 'paid' | 'open source';
  url: string;
  sourceType: ToolSourceType;
  integrationLevel: ToolIntegrationLevel;
  workflowTip: string;
  githubUrl?: string;
  github?: string;
  featured?: boolean;
}
