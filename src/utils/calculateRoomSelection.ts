import { SuiteProps } from "@/components/ApartmentCard";

type SuiteRule = {
  typeMatch: (suite: SuiteProps) => boolean;
  minAdults: number;
  maxAdults: number;
};

/**
 * Returns filtered suites and the minimum rooms needed to accommodate adults.
 */
export function getAllowedSuitesAndSelection(adults: number, suites: SuiteProps[]) {
  // Rule definitions (must match suite.name or similar property)
  const rules: SuiteRule[] = [
    {
      typeMatch: (suite) => suite.name.toLowerCase().includes("smart"),
      minAdults: 1,
      maxAdults: 2,
    },
    {
      typeMatch: (suite) => suite.name.toLowerCase().includes("signature") || suite.name.toLowerCase().includes("sigantura"),
      minAdults: 3,
      maxAdults: 12,
    },
    {
      typeMatch: (suite) => suite.name.toLowerCase().includes("flex"),
      minAdults: 3,
      maxAdults: 12,
    },
  ];

  // Determine allowed types
  const allowed = suites.filter(suite => {
    for (let rule of rules) {
      if (rule.typeMatch(suite)) {
        return adults >= rule.minAdults && adults <= rule.maxAdults;
      }
    }
    return false;
  });

  // If adults <=2, auto-select one Smart suite if available
  let preselected: SuiteProps[] = [];
  if (adults <= 2) {
    const smart = allowed.find(a => a.name.toLowerCase().includes("smart"));
    if (smart) preselected = [smart];
  } else if (adults >= 3) {
    // For 3-12 adults: Signature or Flex. Try to fit all in one if enough capacity.
    const bigEnough = allowed.find(a => a.capacity >= adults);
    if (bigEnough) {
      preselected = [bigEnough];
    } else {
      // Otherwise, select the minimal number of allowed rooms to fit everyone
      // Greedy algorithm: sort by capacity descending
      const sorted = allowed.slice().sort((a, b) => b.capacity - a.capacity);
      let total = 0;
      for (const apt of sorted) {
        if (total >= adults) break;
        preselected.push(apt);
        total += apt.capacity;
      }
    }
  }

  return { filtered: allowed, preselected };
}
