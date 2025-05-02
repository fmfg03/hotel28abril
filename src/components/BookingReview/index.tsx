
import React from "react";
import { Button } from "@/components/ui/button";
import { SuiteProps } from "@/types/Suite";
import BookingConfirmation from "./BookingConfirmation";
import BookingDetailsCard from "./BookingDetailsCard";
import BookingPriceSummary from "./BookingPriceSummary";
import { CreditCard } from "lucide-react";

interface BookingReviewProps {
  selectedApartment: SuiteProps | null;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
  formData: any;
  isBookingConfirmed: boolean;
  onBack: () => void;
  onBookNow: () => void;
}

export default function BookingReview({
  selectedApartment,
  startDate,
  endDate,
  adults,
  children,
  formData,
  isBookingConfirmed,
  onBack,
  onBookNow
}: BookingReviewProps) {
  const bookingReference = `MRS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  if (isBookingConfirmed) {
    return <BookingConfirmation email={formData.email} reference={bookingReference} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Review Booking Details</h2>
      
      <BookingDetailsCard
        selectedApartment={selectedApartment}
        startDate={startDate}
        endDate={endDate}
        adults={adults}
        children={children}
        formData={formData}
      />
      
      <BookingPriceSummary
        selectedApartment={selectedApartment}
        startDate={startDate}
        endDate={endDate}
      />
      
      <div className="mb-8">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 mr-3"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Privacy Policy</a>. I understand that my booking is subject to the property's cancellation policy.
          </label>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <button
          className="btn-primary px-6 py-3 rounded-lg text-white font-bold bg-primary hover:bg-primary/90 transition-colors"
          onClick={onBookNow}
          disabled={!selectedApartment || !startDate || !endDate}
          type="button"
        >
          Book Now on Cloudbeds
        </button>
      </div>
    </div>
  );
}
