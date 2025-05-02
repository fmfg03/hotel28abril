import React from "react";
import { SuiteProps } from "@/utils/calculateRoomSelection";

interface PriceBreakdownProps {
  selectedApartment: SuiteProps;
  nightsCount: number;
}

export default function PriceBreakdown({ selectedApartment, nightsCount }: PriceBreakdownProps) {
  return (
    <div className="py-4 border-b space-y-2">
      <div className="flex justify-between items-center">
        <span>
          ${selectedApartment.price} x {nightsCount} {nightsCount === 1 ? "night" : "nights"}
        </span>
        <span className="font-medium">${selectedApartment.price * nightsCount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Cleaning fee</span>
        <span className="font-medium">$50</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Service fee</span>
        <span className="font-medium">$30</span>
      </div>
    </div>
  );
}
