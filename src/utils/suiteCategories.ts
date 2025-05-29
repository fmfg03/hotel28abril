
// Mapping between suite names and their category codes
export const SUITE_CATEGORY_MAP = {
  "Smart Suite": "A",
  "Flexible Suite": "B", 
  "Signature Suite": "C"
} as const;

export function getSuiteCategoryCode(suiteName: string): string | undefined {
  return SUITE_CATEGORY_MAP[suiteName as keyof typeof SUITE_CATEGORY_MAP];
}
