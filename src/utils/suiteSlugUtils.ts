
// Mapping between suite names and URL slugs
export const SUITE_SLUG_MAP = {
  "Smart Suite": "smart-suite",
  "Flexible Suite": "flexible-suite", 
  "Signature Suite": "signature-suite"
} as const;

// Reverse mapping for lookup
export const SLUG_TO_SUITE_MAP = Object.fromEntries(
  Object.entries(SUITE_SLUG_MAP).map(([name, slug]) => [slug, name])
) as Record<string, string>;

export function getSuiteSlug(suiteName: string): string {
  return SUITE_SLUG_MAP[suiteName as keyof typeof SUITE_SLUG_MAP] || suiteName.toLowerCase().replace(/\s+/g, '-');
}

export function getSuiteNameFromSlug(slug: string): string {
  return SLUG_TO_SUITE_MAP[slug] || slug;
}
