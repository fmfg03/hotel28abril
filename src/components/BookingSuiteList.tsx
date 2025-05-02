
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuiteProps } from "@/components/SuiteCard";

interface BookingSuiteListProps {
  suites: SuiteProps[];
  selectedSuite: SuiteProps | null;
  setSelectedSuite: (a: SuiteProps) => void;
}

export default function BookingSuiteList({
  suites,
  selectedSuite,
  setSelectedSuite,
}: BookingSuiteListProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Select Your Accommodation</h2>
      <div className="space-y-6">
        {suites.map((suite) => (
          <div
            key={suite.id}
            className={cn(
              "border rounded-xl overflow-hidden transition-all flex flex-col md:flex-row",
              selectedSuite?.id === suite.id
                ? "border-primary shadow-md"
                : "border-border hover:border-primary/50"
            )}
          >
            <div className="md:w-1/3 h-48 md:h-auto relative">
              <img
                src={suite.image}
                alt={suite.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{suite.name}</h3>
                <p className="text-muted-foreground mb-4">{suite.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="text-sm bg-muted px-3 py-1 rounded-full">
                    {suite.capacity} Guests
                  </div>
                  <div className="text-sm bg-muted px-3 py-1 rounded-full">
                    {suite.size} m²
                  </div>
                  <div className="text-sm bg-muted px-3 py-1 rounded-full">
                    {suite.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-xl font-bold">From ${suite.price}</span>
                  <span className="text-muted-foreground text-sm"> / night</span>
                </div>
                <Button
                  variant={selectedSuite?.id === suite.id ? "default" : "outline"}
                  className={selectedSuite?.id === suite.id ? "btn-primary" : ""}
                  onClick={() => setSelectedSuite(suite)}
                >
                  {selectedSuite?.id === suite.id ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    "Select"
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
