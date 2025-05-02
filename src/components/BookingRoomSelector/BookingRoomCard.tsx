
import React from "react";
import { Button } from "@/components/ui/button";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import { Minus, Plus } from "lucide-react";

interface BookingRoomCardProps {
  suite: SuiteProps;
  quantity: number;
  onAdjust: (apt: SuiteProps, delta: number) => void;
  disabled: boolean;
  subtext: string;
}

export default function BookingRoomCard({
  suite,
  quantity,
  onAdjust,
  disabled,
  subtext
}: BookingRoomCardProps) {
  const getSuiteType = (apt: SuiteProps) => {
    const name = apt.name.toLowerCase();
    if (name.includes("smart")) return "Smart Suite";
    if (name.includes("signature") || name.includes("sigantura")) return "Signature Suite";
    if (name.includes("flex")) return "Flex Suite";
    return apt.name;
  };

  const suiteType = getSuiteType(suite);
  
  return (
    <div
      className={
        "border rounded-xl transition-all flex items-center px-4 py-2 gap-6 " +
        (disabled ? "opacity-50 pointer-events-none" : "")
      }
    >
      <div className="flex-1 min-w-0">
        <div className="font-semibold">{suiteType}</div>
        <div className="text-muted-foreground text-sm">
          {suite.description}
        </div>
        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          <span className="bg-muted px-3 py-1 rounded-full">
            {suite.capacity} Guests
          </span>
          <span className="bg-muted px-3 py-1 rounded-full">
            {suite.size} m²
          </span>
          <span className="bg-muted px-3 py-1 rounded-full">
            {suite.location}
          </span>
          <span className="bg-muted px-3 py-1 rounded-full">
            From ${suite.price} / night
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
          disabled={disabled || quantity === 0}
          onClick={() => onAdjust(suite, -1)}
        >
          <Minus />
        </Button>
        <span className="w-6 text-center">{quantity}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={disabled}
          onClick={() => onAdjust(suite, 1)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
