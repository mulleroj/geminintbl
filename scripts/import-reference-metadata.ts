/**
 * Development-only import boundary.
 *
 * This intentionally does not scrape or publish reference editorial content.
 * A future implementation may fetch title/slug/category/sourceUrl metadata,
 * validate it with a schema, and write a review queue with needsReview: true.
 */
export type ReferenceMetadata = {
  title: string;
  slug: string;
  category: string;
  sourceUrl?: string;
  author?: string;
  needsReview: true;
};

export function toReviewRecord(input: Omit<ReferenceMetadata, 'needsReview'>): ReferenceMetadata {
  return { ...input, needsReview: true };
}
