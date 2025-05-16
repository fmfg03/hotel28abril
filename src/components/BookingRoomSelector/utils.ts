
import { SuiteProps } from "@/utils/calculateRoomSelection";

/**
 * Determines if a suite is suitable for smaller groups (capacity <= 2)
 */
export const isSmallSuite = (suite: SuiteProps): boolean => suite.capacity <= 2;

/**
 * Sort suites by capacity, then by price
 */
export const sortSuites = (apartments: SuiteProps[]): SuiteProps[] => {
  return [...apartments].sort((a, b) => {
    // First sort by capacity
    if (a.capacity !== b.capacity) {
      return a.capacity - b.capacity;
    }
    // If same capacity, sort by price
    return a.price - b.price;
  });
};

/**
 * Calculate total capacity from selected rooms
 */
export const calculateTotalCapacity = (
  sorted: SuiteProps[], 
  selection: { [key: string]: number }
): number => {
  return sorted.reduce(
    (sum, apt) => sum + (selection[apt.id] || 0) * apt.capacity,
    0
  );
};
