
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SuiteNotFoundProps {
  notFoundText: string;
  goBackText: string;
}

export default function SuiteNotFound({ notFoundText, goBackText }: SuiteNotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <div className="text-2xl font-bold mb-2">{notFoundText}</div>
        <Button asChild variant="outline">
          <Link to="/suites">
            <ArrowLeft className="mr-2 inline" />
            {goBackText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
