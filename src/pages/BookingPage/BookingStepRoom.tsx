import BookingDatesGuestsForm from "@/components/BookingDatesGuestsForm";
import BookingApartmentList from "@/components/BookingApartmentList";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ApartmentProps } from "@/components/ApartmentCard";
import { getAllowedSuitesAndSelection } from "@/utils/calculateRoomSelection";
import React, { useEffect, useState, useRef } from "react";
import BookingRoomSelector, { RoomSelection } from "@/components/BookingRoomSelector";

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
  startDate,
  endDate,
  adults,
  children,
  setStartDate,
  setEndDate,
  setAdults,
  setChildren,
  apartments,
  selectedApartment,
  setSelectedApartment,
  isLoading,
  error,
  onContinue,
}: BookingStepRoomProps) => {
  const intAdults = parseInt(adults, 10) || 1;

  // Enable up to 12 adults
  const maxAdults = 12;

  // Use state for multi-room selection
  const [selection, setSelection] = useState<RoomSelection>({});
  const [valid, setValid] = useState(false);
  const continueRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Reset selection if adults count changes
    setSelection({});
  }, [adults, apartments]);

  // Filter apartments based on adults (apply Smart/Flex/Signature logic)
  const { filtered } = getAllowedSuitesAndSelection(intAdults, apartments);

  // Sync old single selectedApartment API for parent, needed for now:
  useEffect(() => {
    // Pick the first selected room as "selectedApartment" for compatibility if needed
    if (Object.keys(selection).length && filtered.length) {
      const firstId = Object.keys(selection).find(
        (id) => selection[id] > 0 && filtered.some(a => a.id === id)
      );
      if (firstId) {
        setSelectedApartment(filtered.find(a => a.id === firstId)!);
      }
    }
  }, [selection, filtered, setSelectedApartment]);

  // Scroll to continue button when valid selection made
  useEffect(() => {
    if (valid && continueRef.current) {
      setTimeout(() => {
        continueRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  }, [valid]);

  return (
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
          maxAdults={maxAdults}
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
          <BookingRoomSelector
            apartments={filtered}
            selection={selection}
            setSelection={setSelection}
            totalAdults={intAdults}
            maxAdults={maxAdults}
            onChangeValid={setValid}
            childrenCount={parseInt(children, 10) || 0}
          />
        )}
        <div className="flex justify-end mt-8" ref={continueRef}>
          <Button
            className="btn-primary"
            disabled={!valid}
            onClick={onContinue}
          >
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingStepRoom;
