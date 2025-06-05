
import { useSuites } from "@/hooks/useSuites";
import BookingStepper from "@/components/BookingStepper";
import BookingHero from "./components/BookingHero";
import BookingSteps from "./components/BookingSteps";
import useBookingState from "./hooks/useBookingState";
import { handleBookNow } from "./utils/bookingUtils";

export default function BookingMain() {
  const bookingState = useBookingState();
  const { data: suites, isLoading, error } = useSuites();

  const onBookNow = () => {
    handleBookNow(
      bookingState.selectedSuite,
      bookingState.startDate,
      bookingState.endDate,
      bookingState.adults,
      bookingState.children
    );
  };

  return (
    <section>
      <BookingHero />

      <section className="container py-8">
        <div className="relative animate-fade-in [animation-delay:200ms]">
          <BookingStepper currentStep={bookingState.currentStep} />
        </div>

        <BookingSteps
          {...bookingState}
          suites={suites || []}
          isLoading={isLoading}
          error={error}
          onBookNow={onBookNow}
        />
      </section>
    </section>
  );
}
