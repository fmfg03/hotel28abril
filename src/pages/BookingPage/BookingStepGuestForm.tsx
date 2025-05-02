
import BookingGuestForm from "@/components/BookingGuestForm";
import BookingSummarySidebar from "@/components/BookingSummarySidebar";
import { SuiteProps } from "@/types/Suite";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

interface BookingStepGuestFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  selectedSuite: SuiteProps | null;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
  onBack: () => void;
  onContinue: () => void;
}

const BookingStepGuestForm = ({
  formData,
  handleInputChange,
  handleSelectChange,
  selectedSuite,
  startDate,
  endDate,
  adults,
  children,
  onBack,
  onContinue
}: BookingStepGuestFormProps) => (
  <div className="animate-fade-in [animation-delay:300ms]">
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
          <BookingGuestForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        </div>
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          <BookingSummarySidebar
            selectedSuite={selectedSuite}
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
          />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button className="btn-primary" onClick={onContinue}>
          Review & Confirm <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default BookingStepGuestForm;
