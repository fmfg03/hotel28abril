import React, { useEffect } from "react";
import { SuiteProps } from "@/types/Suite";
import BookingRoomCard from "./BookingRoomCard";
import BookingSummaryPanel from "./BookingSummaryPanel";

export interface RoomSelection {
  [suiteId: string]: number;
}

interface BookingRoomSelectorProps {
  apartments: SuiteProps[];
  selection: RoomSelection;
  setSelection: (s: RoomSelection) => void;
  totalAdults: number;
  maxAdults: number;
  onChangeValid: (valid: boolean) => void;
  childrenCount: number;
}

export default function BookingRoomSelector({
  apartments,
  selection,
  setSelection,
  totalAdults,
  maxAdults = 12,
  onChangeValid,
  childrenCount,
}: BookingRoomSelectorProps) {
  // Sort suites by capacity, then by price
  const sorted = [...apartments].sort((a, b) => {
    // First sort by capacity
    if (a.capacity !== b.capacity) {
      return a.capacity - b.capacity;
    }
    // If same capacity, sort by price
    return a.price - b.price;
  });

  // Helper function to determine if a suite is suitable for smaller groups
  const isSmallSuite = (suite: SuiteProps) => suite.capacity <= 2;

  // Count total adults accommodated by selection
  const totalCapacity = sorted.reduce(
    (sum, apt) => sum + (selection[apt.id] || 0) * apt.capacity,
    0
  );

  useEffect(() => {
    // Valid if totalCapacity >= totalAdults, and all rules satisfied
    const valid =
      totalCapacity >= totalAdults &&
      Object.entries(selection).every(([id, qty]) => {
        const apt = apartments.find(a => a.id === id);
        if (!apt || qty < 0) return false;
        
        // Small suites with capacity <= 2 aren't suitable for larger groups
        const smallSuite = isSmallSuite(apt);
        if (smallSuite && totalAdults > 2 && qty > 0) return false;
        
        // Otherwise, always valid if qty >= 0
        return true;
      });
    onChangeValid(valid);
  }, [selection, totalAdults, apartments, onChangeValid]);

  // Max number of rooms user can select is limited by adults and suite capacities.
  const handleAdjust = (apt: SuiteProps, delta: number) => {
    // Create a new object directly instead of using a function
    const newSelection: RoomSelection = { ...selection };
    newSelection[apt.id] = Math.max(0, (selection[apt.id] || 0) + delta);
    setSelection(newSelection);
  };

  // Remaining adults after selected rooms
  const adultsRemaining = Math.max(0, totalAdults - totalCapacity);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Suite Types & Quantities</h2>
      <div className="space-y-6">
        {sorted.map((suite) => {
          const isSmall = isSmallSuite(suite);
          const qty = selection[suite.id] || 0;
          
          // Suite rules
          let disabled = false;
          let subtext = `${suite.capacity} adults max per suite`;
          
          if (isSmall && totalAdults > 2) {
            disabled = true;
            subtext = "Not available for more than 2 adults";
          }
          
          return (
            <BookingRoomCard
              key={suite.id}
              suite={suite}
              quantity={qty}
              onAdjust={handleAdjust}
              disabled={disabled}
              subtext={subtext}
            />
          );
        })}
      </div>
      
      <BookingSummaryPanel
        totalAdults={totalAdults}
        totalCapacity={totalCapacity}
        childrenCount={childrenCount}
        adultsRemaining={adultsRemaining}
      />
    </div>
  );
}
