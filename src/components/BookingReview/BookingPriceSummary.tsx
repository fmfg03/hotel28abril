
import React from "react";
import { SuiteProps } from "@/types/Suite";
import { differenceInDays } from "date-fns";

interface BookingPriceSummaryProps {
  selectedApartment: SuiteProps | null;
  startDate?: Date;
  endDate?: Date;
}

export default function BookingPriceSummary({ 
  selectedApartment,
  startDate,
  endDate
}: BookingPriceSummaryProps) {
  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const apartmentPrice = selectedApartment ? selectedApartment.price * nightsCount : 0;
  const cleaningFee = 50;
  const serviceFee = 30;
  const totalPrice = apartmentPrice + cleaningFee + serviceFee;

  return (
    <div className="glass-card p-6 mb-8">
      <h3 className="text-lg font-medium mb-4">Price Summary</h3>
      <div className="space-y-2">
        {selectedApartment && (
          <>
            <div className="flex justify-between items-center">
              <span>
                ${selectedApartment.price} x {nightsCount} {nightsCount === 1 ? "night" : "nights"}
              </span>
              <span className="font-medium">${apartmentPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cleaning fee</span>
              <span className="font-medium">${cleaningFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Service fee</span>
              <span className="font-medium">${serviceFee}</span>
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
