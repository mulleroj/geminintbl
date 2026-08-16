import type { Provenance } from './common';

export type GuideLevel = 'beginner' | 'intermediate' | 'advanced';

export type GuideDepthClass = 'quick' | 'standard' | 'advanced';

export type GuideAudience = 'teacher' | 'student' | 'researcher' | 'professional' | 'general';

export interface GuideReference {
  label: string;
  url: string;
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: GuideSection[];
}

export interface GuideStudySetup {
  bestFor: string;
  recommendedSettings: string[];
  studyMethod: string;
  promptTip: string;
  commonMistake: string;
  proTip: string;
  verifiedAt: string;
  officialReference: GuideReference;
}

export interface GuideDepthDefinition {
  id: string;
  depthClass: GuideDepthClass;
  relatedGuideIds: string[];
  sections: GuideSection[];
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
  advancedSections?: GuideSection[];
  studySetup?: GuideStudySetup;
  level: GuideLevel;
  depthClass?: GuideDepthClass;
  audience: GuideAudience[];
  relatedPromptIds: string[];
  relatedSourceIds: string[];
  relatedToolIds: string[];
  relatedWorkflowIds: string[];
  relatedGuideIds?: string[];
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
