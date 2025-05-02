
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SuiteDetailHeaderProps {
  goBackText: string;
}

export default function SuiteDetailHeader({ goBackText }: SuiteDetailHeaderProps) {
  return (
    <Button asChild variant="outline" className="mb-8">
      <Link to="/suites">
        <ArrowLeft className="mr-2" />
        {goBackText}
      </Link>
    </Button>
  );
}
