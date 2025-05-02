import { SuiteProps } from "@/types/Suite";

type SuiteRule = {
  typeMatch: (suite: SuiteProps) => boolean;
  minAdults: number;
  maxAdults: number;
};

/**
 * Returns filtered suites and the minimum rooms needed to accommodate adults.
 */
export function getAllowedSuitesAndSelection(adults: number, suites: SuiteProps[]) {
  // Use name and capacity to determine suite types
  const rules: SuiteRule[] = [
    {
      // Smaller suites (capacity <= 2)
      typeMatch: (suite) => suite.capacity <= 2,
      minAdults: 1,
      maxAdults: 2,
    },
    {
      // Medium suites (capacity 3-4)
      typeMatch: (suite) => suite.capacity > 2 && suite.capacity <= 4,
      minAdults: 1, 
      maxAdults: 4,
    },
    {
      // Large suites (capacity > 4)
      typeMatch: (suite) => suite.capacity > 4,
      minAdults: 1,
      maxAdults: 12,
    },
  ];

  // Determine allowed types based on capacity
  const allowed = suites.filter(suite => {
    for (let rule of rules) {
      if (rule.typeMatch(suite)) {
        return adults >= rule.minAdults && adults <= rule.maxAdults;
      }
    }
    return true; // If no rules match, allow the suite by default
  });

  // Select appropriate accommodation based on adults count
  let preselected: SuiteProps[] = [];
  
  if (adults <= 2) {
    // For 1-2 adults, find the smallest capacity suite
    const smallest = [...allowed].sort((a, b) => a.capacity - b.capacity)[0];
    if (smallest) preselected = [smallest];
  } else {
    // For 3+ adults, try to fit all in one suite if possible
    const bigEnough = allowed.find(a => a.capacity >= adults);
    if (bigEnough) {
      preselected = [bigEnough];
    } else {
      // Otherwise, select minimal number of suites to fit everyone
      // Sort by capacity descending for greedy algorithm
      const sorted = [...allowed].sort((a, b) => b.capacity - a.capacity);
      let total = 0;
      
      for (const suite of sorted) {
        if (total >= adults) break;
        preselected.push(suite);
        total += suite.capacity;
      }
    }
  }

  return { filtered: allowed, preselected };
}
