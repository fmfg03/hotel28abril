
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingStepperProps {
  currentStep: number;
  steps?: string[];
}

export default function BookingStepper({ currentStep, steps = ["Choose Room", "Guest Details", "Confirmation"] }: BookingStepperProps) {
  return (
    <div className="flex justify-between items-center mb-8 relative animate-fade-in">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center relative z-10">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors",
              currentStep >= i + 1
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            {currentStep > i + 1 ? (
              <Check className="h-5 w-5" />
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              currentStep >= i + 1
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {step}
          </span>
        </div>
      ))}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted z-0">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
