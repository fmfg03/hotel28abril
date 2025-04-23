
import React from "react";

interface BookingSummaryPanelProps {
  totalAdults: number;
  totalCapacity: number;
  childrenCount: number;
  adultsRemaining: number;
}

export default function BookingSummaryPanel({
  totalAdults,
  totalCapacity,
  childrenCount,
  adultsRemaining
}: BookingSummaryPanelProps) {
  return (
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
  );
}
