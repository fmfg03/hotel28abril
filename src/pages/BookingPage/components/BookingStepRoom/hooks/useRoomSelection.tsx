
import { useState, useRef, useEffect } from "react";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import { getAllowedSuitesAndSelection } from "@/utils/calculateRoomSelection";
import { RoomSelection } from "@/components/BookingRoomSelector";

export function useRoomSelection(
  adults: string,
  suites: SuiteProps[],
  setSelectedSuite: (a: SuiteProps) => void,
  children: string
) {
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
  }, [adults, suites]);
  
  // Filter suites based on adults (apply Smart/Flex/Signature logic)
  const { filtered } = getAllowedSuitesAndSelection(intAdults, suites);
  
  // Sync old single selectedSuite API for parent, needed for now:
  useEffect(() => {
    // Pick the first selected room as "selectedSuite" for compatibility if needed
    if (Object.keys(selection).length && filtered.length) {
      const firstId = Object.keys(selection).find(
        (id) => selection[id] > 0 && filtered.some(a => a.id === id)
      );
      if (firstId) {
        setSelectedSuite(filtered.find(a => a.id === firstId)!);
      }
    }
  }, [selection, filtered, setSelectedSuite]);
  
  // Scroll to continue button when valid selection made
  useEffect(() => {
    if (valid && continueRef.current) {
      setTimeout(() => {
        continueRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  }, [valid]);

  return {
    intAdults,
    maxAdults,
    selection,
    setSelection,
    valid,
    setValid,
    filtered,
    continueRef
  };
}
