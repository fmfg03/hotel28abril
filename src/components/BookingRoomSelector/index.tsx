import React, { useEffect } from "react";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import BookingRoomCard from "./BookingRoomCard";
import BookingSummaryPanel from "./BookingSummaryPanel";
import { BookingRoomSelectorProps, RoomSelection } from "./types";
import { isSmallSuite, sortSuites, calculateTotalCapacity } from "./utils";

export type { RoomSelection } from "./types";

export default function BookingRoomSelector({
  apartments,
  selection,
  setSelection,
  totalAdults,
  maxAdults = 12,
  onChangeValid,
  childrenCount,
}: BookingRoomSelectorProps) {
  // Sort suites using the utility function
  const sorted = sortSuites(apartments);

  // Calculate total capacity using the utility function
  const totalCapacity = calculateTotalCapacity(sorted, selection);

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
