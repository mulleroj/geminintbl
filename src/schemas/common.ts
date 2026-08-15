export type FavoriteType = 'prompt' | 'source' | 'tool' | 'notebook' | 'guide';

export type Audience = 'teacher' | 'student' | 'researcher' | 'general';
export type EducationLevel = 'primary' | 'secondary' | 'vocational' | 'university';

export interface Provenance {
  author?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  retrievedAt?: string;
  license?: string;
  needsReview?: boolean;
}
