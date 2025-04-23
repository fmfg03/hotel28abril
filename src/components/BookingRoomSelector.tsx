import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ApartmentProps } from "@/components/ApartmentCard";
import { Minus, Plus } from "lucide-react";

export interface RoomSelection {
  [apartmentId: string]: number;
}

interface BookingRoomSelectorProps {
  apartments: ApartmentProps[];
  selection: RoomSelection;
  setSelection: (s: RoomSelection) => void;
  totalAdults: number;
  maxAdults: number;
  onChangeValid: (valid: boolean) => void;
  childrenCount: number;
}

export default function BookingRoomSelector({
  apartments,
  selection,
  setSelection,
  totalAdults,
  maxAdults = 12,
  onChangeValid,
  childrenCount,
}: BookingRoomSelectorProps) {
  // Apartments sorted: Smart, Signature, Flex
  const sorted = apartments.slice().sort((a, b) => a.price - b.price);

  // Helper: suite type
  const getSuiteType = (apt: ApartmentProps) => {
    const name = apt.name.toLowerCase();
    if (name.includes("smart")) return "Smart Suite";
    if (name.includes("signature") || name.includes("sigantura")) return "Signature Suite";
    if (name.includes("flex")) return "Flex Suite";
    return apt.name;
  };

  // Count total adults accommodated by selection
  const totalCapacity = sorted.reduce(
    (sum, apt) => sum + (selection[apt.id] || 0) * apt.capacity,
    0
  );

  useEffect(() => {
    // Valid if totalCapacity >= totalAdults, and all rules satisfied
    const valid =
      totalCapacity >= totalAdults &&
      Object.entries(selection).every(([id, qty]) => {
        const apt = apartments.find(a => a.id === id);
        if (!apt || qty < 0) return false;
        const isSmart = getSuiteType(apt) === "Smart Suite";
        // Only allow Smart Suite if totalAdults <= 2, and max 2 adults per suite
        if (isSmart && totalAdults > 2) return false;
        if (isSmart && qty > 0 && totalAdults > 2) return false;
        // Otherwise, always valid if qty >= 0
        return true;
      });
    onChangeValid(valid);
  }, [selection, totalAdults, apartments, onChangeValid]);

  // Max number of rooms user can select is limited by adults and suite capacities.
  const handleAdjust = (apt: ApartmentProps, delta: number) => {
    setSelection(prev => {
      const current = prev[apt.id] || 0;
      let next = { ...prev };
      next[apt.id] = Math.max(0, current + delta);
      return next;
    });
  };

  // Remaining adults after selected rooms
  const adultsRemaining = Math.max(0, totalAdults - totalCapacity);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Suite Types & Quantities</h2>
      <div className="space-y-6">
        {sorted.map((apartment) => {
          const suiteType = getSuiteType(apartment);
          const qty = selection[apartment.id] || 0;
          const isSmart = suiteType === "Smart Suite";
          // Smart suite rules
          let disabled = false;
          let subtext = `${apartment.capacity} adults max per suite`;
          if (isSmart && totalAdults > 2) {
            disabled = true;
            subtext = "Not available for more than 2 adults";
          }
          return (
            <div
              key={apartment.id}
              className={
                "border rounded-xl transition-all flex items-center px-4 py-2 gap-6 " +
                (disabled ? "opacity-50 pointer-events-none" : "")
              }
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{suiteType}</div>
                <div className="text-muted-foreground text-sm">
                  {apartment.description}
                </div>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  <span className="bg-muted px-3 py-1 rounded-full">
                    {apartment.capacity} Guests
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full">
                    {apartment.size} m²
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full">
                    {apartment.location}
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full">
                    ${apartment.price} / night
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {subtext}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={disabled || qty === 0}
                  onClick={() => handleAdjust(apartment, -1)}
                >
                  <Minus />
                </Button>
                <span className="w-6 text-center">{qty}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={disabled}
                  onClick={() => handleAdjust(apartment, 1)}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <div>
          Adults to accommodate: <b>{totalAdults}</b>
        </div>
        <div>
          Currently accommodated:{" "}
          <b>
            {totalCapacity}{" "}
            {totalCapacity < totalAdults ? "(Add more rooms)" : ""}
          </b>
        </div>
        <div>
          Children: <b>{childrenCount}</b>
        </div>
      </div>
    </div>
  );
}
