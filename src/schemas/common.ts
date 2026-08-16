export type FavoriteType = 'prompt' | 'source' | 'tool' | 'notebook' | 'guide';

export type Audience = 'teacher' | 'student' | 'researcher' | 'professional' | 'general';
export type EducationLevel = 'primary' | 'secondary' | 'vocational' | 'university';

export interface CatalogCategory {
  id: string;
  label: string;
  description: string;
}

export interface Provenance {
  author?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  retrievedAt?: string;
  verifiedAt?: string;
  license?: string;
  needsReview?: boolean;
}
