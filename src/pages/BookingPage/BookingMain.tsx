
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSuites } from "@/hooks/useSuites";
import BookingStepper from "@/components/BookingStepper";
import BookingStepRoom from "./components/BookingStepRoom";
import BookingStepGuestForm from "./BookingStepGuestForm";
import BookingStepReview from "./BookingStepReview";
import BookingHero from "./components/BookingHero";
import useBookingState from "./hooks/useBookingState";
import { handleBookNow } from "./utils/bookingUtils";

export default function BookingMain() {
  const {
    startDate, 
    setStartDate,
    endDate, 
    setEndDate,
    adults, 
    setAdults,
    children, 
    setChildren,
    selectedSuite, 
    setSelectedSuite,
    currentStep, 
    setCurrentStep,
    formData,
    isBookingConfirmed, 
    setIsBookingConfirmed,
    handleInputChange,
    handleSelectChange,
    resetBooking
  } = useBookingState();

  const { data: suites, isLoading, error } = useSuites();

  return (
    <section>
      <BookingHero />

      <section className="container py-8">
        <div className="relative animate-fade-in [animation-delay:200ms]">
          <BookingStepper currentStep={currentStep} />
        </div>

        {currentStep === 1 && (
          <BookingStepRoom
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setAdults={setAdults}
            setChildren={setChildren}
            suites={suites || []}
            selectedSuite={selectedSuite}
            setSelectedSuite={setSelectedSuite}
            isLoading={isLoading}
            error={error}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <BookingStepGuestForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            selectedSuite={selectedSuite}
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <BookingStepReview
            selectedSuite={selectedSuite}
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
            formData={formData}
            isBookingConfirmed={isBookingConfirmed}
            setIsBookingConfirmed={setIsBookingConfirmed}
            onBack={() => setCurrentStep(2)}
            onBookNow={() => handleBookNow(selectedSuite, startDate, endDate, adults, children)}
            onReset={resetBooking}
          />
        )}
      </section>
    </section>
  );
}
