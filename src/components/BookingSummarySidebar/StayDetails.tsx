
import React from "react";
import { format } from "date-fns";

interface StayDetailsProps {
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
}

export default function StayDetails({ startDate, endDate, adults, children }: StayDetailsProps) {
  return (
    <div className="py-4 border-b space-y-2">
      <div className="flex justify-between items-center">
        <span>Check-in</span>
        <span className="font-medium">
          {startDate ? format(startDate, "EEE, MMM d, yyyy") : "Not selected"}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span>Check-out</span>
        <span className="font-medium">
          {endDate ? format(endDate, "EEE, MMM d, yyyy") : "Not selected"}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span>Guests</span>
        <span className="font-medium">
          {adults} {parseInt(adults) === 1 ? "Adult" : "Adults"}
          {parseInt(children) > 0 && `, ${children} ${parseInt(children) === 1 ? "Child" : "Children"}`}
        </span>
      </div>
    </div>
  );
}
