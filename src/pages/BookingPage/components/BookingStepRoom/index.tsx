
import { SuiteProps } from "@/utils/calculateRoomSelection";
import BookingDatesGuestsForm from "@/components/BookingDatesGuestsForm";
import BookingRoomSelector, { RoomSelection } from "@/components/BookingRoomSelector";
import ContinueButton from "./ContinueButton";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { useRoomSelection } from "./hooks/useRoomSelection";

interface BookingStepRoomProps {
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
  suites,
  selectedSuite,
  setSelectedSuite,
  isLoading,
  error,
  onContinue,
}: BookingStepRoomProps) => {
  const {
    intAdults,
    maxAdults,
    selection,
    setSelection,
    valid,
    filtered,
    continueRef
  } = useRoomSelection(adults, suites, setSelectedSuite, children);

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
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          <BookingRoomSelector
            apartments={filtered}
            selection={selection}
            setSelection={setSelection}
            totalAdults={intAdults}
            maxAdults={maxAdults}
            onChangeValid={valid => {}}
            childrenCount={parseInt(children, 10) || 0}
          />
        )}
        
        <ContinueButton 
          ref={continueRef} 
          valid={valid} 
          onContinue={onContinue} 
        />
      </div>
    </div>
  );
};

export default BookingStepRoom;
