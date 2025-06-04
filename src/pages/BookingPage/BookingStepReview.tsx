
import BookingReview from "@/components/BookingReview";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import React, { useEffect, useState } from "react";
import { useBookings } from "@/hooks/useBookings";
import { toast } from "sonner";

interface BookingStepReviewProps {
  selectedSuite: SuiteProps | null;
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
  selectedSuite,
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
  const { saveBooking } = useBookings();
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingReference, setBookingReference] = useState<string>("");

  useEffect(() => {
    if (isBookingConfirmed) {
      const timer = setTimeout(() => {
        onReset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isBookingConfirmed, onReset]);

  const handleBookNow = async () => {
    if (!selectedSuite || !startDate || !endDate) {
      toast.error("Missing required booking information");
      return;
    }

    setIsProcessing(true);

    try {
      // Save to our database and send confirmation email
      const bookingId = await saveBooking(
        formData,
        selectedSuite,
        startDate,
        endDate,
        adults,
        children
      );

      if (!bookingId) {
        toast.error("Failed to save booking. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Generate a booking reference
      const reference = `MRS-${bookingId.substring(0, 4).toUpperCase()}`;
      setBookingReference(reference);
      
      // Show success message
      toast.success("Booking confirmed! Confirmation email sent.");
      
      // Mark as confirmed - no CloudBeds redirection
      setIsBookingConfirmed(true);
    } catch (error) {
      console.error("Error during booking process:", error);
      toast.error("An error occurred during the booking process. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="animate-fade-in [animation-delay:300ms]">
      <BookingReview
        selectedSuite={selectedSuite}
        startDate={startDate}
        endDate={endDate}
        adults={adults}
        children={children}
        formData={formData}
        isBookingConfirmed={isBookingConfirmed}
        onBack={onBack}
        onBookNow={handleBookNow}
        isProcessing={isProcessing}
        bookingReference={bookingReference}
      />
    </div>
  );
};

export default BookingStepReview;
