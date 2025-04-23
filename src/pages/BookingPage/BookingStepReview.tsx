
import BookingReview from "@/components/BookingReview";
import { ApartmentProps } from "@/components/ApartmentCard";
import React, { useEffect } from "react";

interface BookingStepReviewProps {
  selectedApartment: ApartmentProps | null;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
  formData: any;
  isBookingConfirmed: boolean;
  setIsBookingConfirmed: (b: boolean) => void;
  onBack: () => void;
  onBookNow: () => void;
  onReset: () => void;
}

const BookingStepReview = ({
  selectedApartment,
  startDate,
  endDate,
  adults,
  children,
  formData,
  isBookingConfirmed,
  setIsBookingConfirmed,
  onBack,
  onBookNow,
  onReset
}: BookingStepReviewProps) => {
  useEffect(() => {
    if (isBookingConfirmed) {
      const timer = setTimeout(() => {
        onReset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isBookingConfirmed, onReset]);

  return (
    <div className="animate-fade-in [animation-delay:300ms]">
      <BookingReview
        selectedApartment={selectedApartment}
        startDate={startDate}
        endDate={endDate}
        adults={adults}
        children={children}
        formData={formData}
        isBookingConfirmed={isBookingConfirmed}
        onBack={onBack}
        onBookNow={() => {
          setIsBookingConfirmed(true);
          onBookNow();
        }}
      />
    </div>
  );
};

export default BookingStepReview;
