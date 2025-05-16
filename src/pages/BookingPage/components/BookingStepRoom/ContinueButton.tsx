
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ContinueButtonProps {
  valid: boolean;
  onContinue: () => void;
}

const ContinueButton = forwardRef<HTMLDivElement, ContinueButtonProps>(
  ({ valid, onContinue }, ref) => {
    return (
      <div className="flex justify-end mt-8" ref={ref}>
        <Button
          className="btn-primary"
          disabled={!valid}
          onClick={onContinue}
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }
);

ContinueButton.displayName = "ContinueButton";

export default ContinueButton;
