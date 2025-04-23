
import BookingDatesGuestsForm from "@/components/BookingDatesGuestsForm";
import BookingApartmentList from "@/components/BookingApartmentList";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ApartmentProps } from "@/components/ApartmentCard";

interface BookingStepRoomProps {
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
  setStartDate: (d: Date | undefined) => void;
  setEndDate: (d: Date | undefined) => void;
  setAdults: (a: string) => void;
  setChildren: (c: string) => void;
  apartments: ApartmentProps[];
  selectedApartment: ApartmentProps | null;
  setSelectedApartment: (a: ApartmentProps) => void;
  isLoading: boolean;
  error: unknown;
  onContinue: () => void;
}

const BookingStepRoom = ({
  startDate, endDate, adults, children,
  setStartDate, setEndDate, setAdults, setChildren,
  apartments, selectedApartment, setSelectedApartment,
  isLoading, error, onContinue
}: BookingStepRoomProps) => (
  <div className="animate-fade-in [animation-delay:300ms]">
    <div className="max-w-4xl mx-auto">
      <BookingDatesGuestsForm
        startDate={startDate}
        endDate={endDate}
        adults={adults}
        children={children}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setAdults={setAdults}
        setChildren={setChildren}
      />
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading apartments...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Error loading apartments. Please try again later.</p>
        </div>
      ) : (
        <BookingApartmentList
          apartments={apartments}
          selectedApartment={selectedApartment}
          setSelectedApartment={setSelectedApartment}
        />
      )}
      <div className="flex justify-end mt-8">
        <Button
          className="btn-primary"
          disabled={!selectedApartment}
          onClick={onContinue}
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default BookingStepRoom;
