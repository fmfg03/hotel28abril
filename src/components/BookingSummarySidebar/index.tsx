
import React from "react";
import { differenceInDays } from "date-fns";
import { ApartmentProps } from "@/components/ApartmentCard";
import StayDetails from "./StayDetails";
import PriceBreakdown from "./PriceBreakdown";

interface BookingSummarySidebarProps {
  selectedApartment: ApartmentProps | null;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
}

export default function BookingSummarySidebar({
  selectedApartment,
  startDate,
  endDate,
  adults,
  children
}: BookingSummarySidebarProps) {
  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const apartmentPrice = selectedApartment ? selectedApartment.price * nightsCount : 0;
  const totalPrice = apartmentPrice + 50 + 30; // Apartment price + cleaning fee + service fee

  return (
    <div className="glass-card p-6 sticky top-24">
      {selectedApartment && (
        <>
          <div className="pb-4 border-b">
            <h3 className="font-medium mb-1">{selectedApartment.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedApartment.location}</p>
          </div>

          <StayDetails 
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
          />

          <PriceBreakdown
            selectedApartment={selectedApartment}
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
