import React from "react";
import { differenceInDays } from "date-fns";
import { SuiteProps } from "@/utils/calculateRoomSelection";

interface BookingPriceSummaryProps {
  selectedSuite: SuiteProps | null;
  startDate?: Date;
  endDate?: Date;
}

export default function BookingPriceSummary({
  selectedSuite,
  startDate,
  endDate
}: BookingPriceSummaryProps) {
  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const suitePrice = selectedSuite ? selectedSuite.price * nightsCount : 0;
  const totalPrice = suitePrice + 50 + 30; // Suite price + cleaning fee + service fee

  return (
    <div className="glass-card p-6 mb-8">
      <h3 className="text-lg font-medium mb-4">Price Summary</h3>
      <div className="space-y-2">
        {selectedSuite && (
          <>
            <div className="flex justify-between items-center">
              <span>
                ${selectedSuite.price} x {nightsCount} {nightsCount === 1 ? "night" : "nights"}
              </span>
              <span className="font-medium">${selectedSuite.price * nightsCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cleaning fee</span>
              <span className="font-medium">$50</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Service fee</span>
              <span className="font-medium">$30</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t mt-4">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-xl">${totalPrice}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
