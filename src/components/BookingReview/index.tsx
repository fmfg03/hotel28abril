
import React from "react";
import { Button } from "@/components/ui/button";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import BookingConfirmation from "./BookingConfirmation";
import BookingDetailsCard from "./BookingDetailsCard";
import BookingPriceSummary from "./BookingPriceSummary";
import { Loader2 } from "lucide-react";

interface BookingReviewProps {
  selectedSuite: SuiteProps | null;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
  formData: any;
  isBookingConfirmed: boolean;
  onBack: () => void;
  onBookNow: () => void;
  isProcessing?: boolean;
  bookingReference?: string;
}

export default function BookingReview({
  selectedSuite,
  startDate,
  endDate,
  adults,
  children,
  formData,
  isBookingConfirmed,
  onBack,
  onBookNow,
  isProcessing = false,
  bookingReference
}: BookingReviewProps) {
  if (isBookingConfirmed) {
    return <BookingConfirmation email={formData.email} reference={bookingReference || `MRS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Review Booking Details</h2>
      
      <BookingDetailsCard
        selectedSuite={selectedSuite}
        startDate={startDate}
        endDate={endDate}
        adults={adults}
        children={children}
        formData={formData}
      />
      
      <BookingPriceSummary
        selectedSuite={selectedSuite}
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
        <Button variant="outline" onClick={onBack} disabled={isProcessing}>Back</Button>
        <button
          className="btn-primary px-6 py-3 rounded-lg text-white font-bold bg-primary hover:bg-primary/90 transition-colors relative"
          onClick={onBookNow}
          disabled={!selectedSuite || !startDate || !endDate || isProcessing}
          type="button"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin inline" />
              Processing...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </div>
  );
}
