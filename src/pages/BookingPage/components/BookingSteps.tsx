
import BookingStepRoom from "../components/BookingStepRoom";
import BookingStepGuestForm from "../BookingStepGuestForm";
import BookingStepReview from "../BookingStepReview";
import { SuiteProps } from "@/utils/calculateRoomSelection";

interface BookingStepsProps {
  currentStep: number;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
  setStartDate: (d: Date | undefined) => void;
  setEndDate: (d: Date | undefined) => void;
  setAdults: (a: string) => void;
  setChildren: (c: string) => void;
  suites: SuiteProps[];
  selectedSuite: SuiteProps | null;
  setSelectedSuite: (a: SuiteProps) => void;
  isLoading: boolean;
  error: unknown;
  setCurrentStep: (step: number) => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isBookingConfirmed: boolean;
  setIsBookingConfirmed: (b: boolean) => void;
  onBookNow: () => void;
  onReset: () => void;
}

export default function BookingSteps({
  currentStep,
  startDate,
  endDate,
  adults,
  children,
  setStartDate,
  setEndDate,
  setAdults,
  setChildren,
  suites,
  selectedSuite,
  setSelectedSuite,
  isLoading,
  error,
  setCurrentStep,
  formData,
  handleInputChange,
  handleSelectChange,
  isBookingConfirmed,
  setIsBookingConfirmed,
  onBookNow,
  onReset
}: BookingStepsProps) {
  if (currentStep === 1) {
    return (
      <BookingStepRoom
        startDate={startDate}
        endDate={endDate}
        adults={adults}
        children={children}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setAdults={setAdults}
        setChildren={setChildren}
        suites={suites}
        selectedSuite={selectedSuite}
        setSelectedSuite={setSelectedSuite}
        isLoading={isLoading}
        error={error}
        onContinue={() => setCurrentStep(2)}
      />
    );
  }

  if (currentStep === 2) {
    return (
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
    );
  }

  if (currentStep === 3) {
    return (
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
        onBookNow={onBookNow}
        onReset={onReset}
      />
    );
  }

  return null;
}
