
import React from "react";
import { differenceInDays } from "date-fns";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import StayDetails from "./StayDetails";
import PriceBreakdown from "./PriceBreakdown";

interface BookingSummarySidebarProps {
  selectedSuite: SuiteProps | null;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
}

export default function BookingSummarySidebar({
  selectedSuite,
  startDate,
  endDate,
  adults,
  children
}: BookingSummarySidebarProps) {
  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const suitePrice = selectedSuite ? selectedSuite.price * nightsCount : 0;
  const totalPrice = suitePrice + 50 + 30; // Suite price + cleaning fee + service fee

  return (
    <div className="glass-card p-6 sticky top-24">
      {selectedSuite && (
        <>
          <div className="pb-4 border-b">
            <h3 className="font-medium mb-1">{selectedSuite.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedSuite.location}</p>
          </div>

          <StayDetails 
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
          />

          <PriceBreakdown
            selectedApartment={selectedSuite}
            nightsCount={nightsCount}
          />

          <div className="pt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
