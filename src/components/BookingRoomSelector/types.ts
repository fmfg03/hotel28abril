
import { SuiteProps } from "@/utils/calculateRoomSelection";

export interface RoomSelection {
  [suiteId: string]: number;
}

export interface BookingRoomSelectorProps {
  apartments: SuiteProps[];
  selection: RoomSelection;
  setSelection: (s: RoomSelection) => void;
  totalAdults: number;
  maxAdults: number;
  onChangeValid: (valid: boolean) => void;
  childrenCount: number;
}
