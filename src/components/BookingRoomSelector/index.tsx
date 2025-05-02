
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
  // Apartments sorted: Smart, Flex, then Signature
  const sorted = apartments.slice().sort((a, b) => {
    const getSortPriority = (apt: SuiteProps) => {
      const name = apt.name.toLowerCase();
      if (name.includes("smart")) return 0;
      if (name.includes("flex")) return 1;
      if (name.includes("signature") || name.includes("sigantura")) return 2;
      return 3;
    };
    
    const priorityA = getSortPriority(a);
    const priorityB = getSortPriority(b);
    
    // If priorities are the same, sort by price
    return priorityA !== priorityB 
      ? priorityA - priorityB 
      : a.price - b.price;
  });

  // Helper: check if a suite is Smart type
  const isSmart = (apt: SuiteProps) => {
    const name = apt.name.toLowerCase();
    return name.includes("smart");
  };

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
        
        // Only allow Smart Suite if totalAdults <= 2, and max 2 adults per suite
        if (isSmart(apt) && totalAdults > 2) return false;
        if (isSmart(apt) && qty > 0 && totalAdults > 2) return false;
        
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
          const isSmartSuite = isSmart(suite);
          const qty = selection[suite.id] || 0;
          
          // Smart suite rules
          let disabled = false;
          let subtext = `${suite.capacity} adults max per suite`;
          
          if (isSmartSuite && totalAdults > 2) {
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
