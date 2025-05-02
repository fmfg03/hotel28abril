import { format, differenceInDays } from "date-fns";
import { SuiteProps } from "@/utils/calculateRoomSelection";

interface BookingSummarySidebarProps {
  selectedSuite: SuiteProps | null;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
}

export default function BookingSummarySidebar({
  selectedSuite,
  startDate,
  endDate,
  adults,
  children
}: BookingSummarySidebarProps) {
  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  const totalPrice = selectedSuite
    ? selectedSuite.price * nightsCount + 50 + 30
    : 0;

  return (
    <div className="glass-card p-6 sticky top-24">
      {selectedSuite && (
        <>
          <div className="pb-4 border-b">
            <h3 className="font-medium mb-1">{selectedSuite.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedSuite.location}</p>
          </div>

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

          <div className="py-4 border-b space-y-2">
            <div className="flex justify-between items-center">
              <span>
                ${selectedSuite.price} x {nightsCount} {nightsCount === 1 ? "night" : "nights"}
              </span>
              <span className="font-medium">${selectedSuite.price * nightsCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cleaning fee</span>
              <span className="font-medium">$50</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Service fee</span>
              <span className="font-medium">$30</span>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
