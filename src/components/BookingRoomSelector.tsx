
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import { Minus, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface RoomSelection {
  [apartmentId: string]: number;
}

interface BookingRoomSelectorProps {
  apartments: SuiteProps[];
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
  const { t, language } = useLanguage();

  // Sort by capacity (ascending) then price (ascending)
  const sorted = [...apartments].sort((a, b) => {
    if (a.capacity !== b.capacity) {
      return a.capacity - b.capacity;
    }
    return a.price - b.price;
  });

  // Helper: suite type based on capacity
  const getSuiteType = (apt: SuiteProps) => {
    if (apt.capacity <= 2) return "Small Suite";
    if (apt.capacity <= 4) return "Medium Suite";
    return "Large Suite";
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
        
        const isSmall = apt.capacity <= 2;
        // Only allow small suites for groups of 1-2 adults
        if (isSmall && totalAdults > 2 && qty > 0) return false;
        
        // Otherwise, always valid if qty >= 0
        return true;
      });
    onChangeValid(valid);
  }, [selection, totalAdults, apartments, onChangeValid]);

  // Max number of rooms user can select is limited by adults and suite capacities.
  const handleAdjust = (apt: SuiteProps, delta: number) => {
    // Create a new object directly instead of using a function
    const newSelection: RoomSelection = { ...selection };
    newSelection[apt.id] = Math.max(0, (selection[apt.id] || 0) + delta);
    setSelection(newSelection);
  };

  // Remaining adults after selected rooms
  const adultsRemaining = Math.max(0, totalAdults - totalCapacity);

  // Translate names and descriptions if available
  const getTranslatedName = (suite: SuiteProps) => {
    return language !== 'en' && t.suiteDescriptions && t.suiteDescriptions[suite.id]?.name 
      ? t.suiteDescriptions[suite.id].name 
      : suite.name;
  };
  
  const getTranslatedDescription = (suite: SuiteProps) => {
    return language !== 'en' && t.suiteDescriptions && t.suiteDescriptions[suite.id]?.description
      ? t.suiteDescriptions[suite.id].description
      : suite.description;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Suite Types & Quantities</h2>
      <div className="space-y-6">
        {sorted.map((apartment) => {
          const suiteType = getSuiteType(apartment);
          const qty = selection[apartment.id] || 0;
          const isSmallSuite = apartment.capacity <= 2;
          
          // Small suite rules
          let disabled = false;
          let subtext = `${apartment.capacity} adults max per suite`;
          if (isSmallSuite && totalAdults > 2) {
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
                <div className="font-semibold">{getTranslatedName(apartment)}</div>
                <div className="text-muted-foreground text-sm">
                  {getTranslatedDescription(apartment)}
                </div>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  <span className="bg-muted px-3 py-1 rounded-full">
                    {apartment.capacity} {t.suites?.filters?.guests || "Guests"}
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full">
                    {apartment.size} m²
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full">
                    {apartment.location}
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full">
                    From ${apartment.price} / {t.booking?.summary?.night || "night"}
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
      <div className="mt-4 p-4 border rounded-lg bg-muted/50">
        <div className="flex flex-col gap-2">
          <div className={`flex justify-between ${totalAdults > totalCapacity ? "text-red-500 font-semibold" : ""}`}>
            <span>Adults to accommodate:</span>
            <span>{totalAdults}</span>
          </div>
          <div className={`flex justify-between ${totalAdults > totalCapacity ? "text-red-500 font-semibold" : "text-green-600"}`}>
            <span>Currently accommodated:</span>
            <span>
              {totalCapacity}{" "}
              {totalCapacity < totalAdults ? "(Need more rooms)" : "✓"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Children:</span>
            <span>{childrenCount}</span>
          </div>
          {adultsRemaining > 0 && (
            <div className="mt-2 text-sm text-red-500">
              Please select more suites to accommodate all guests.
            </div>
          )}
          {totalCapacity >= totalAdults && (
            <div className="mt-2 text-sm text-green-600">
              All guests are accommodated. You can proceed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
