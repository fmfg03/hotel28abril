
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SuitePriceProps {
  price: number;
  nightLabel: string;
  bookNowLabel: string;
}

export default function SuitePrice({ price, nightLabel, bookNowLabel }: SuitePriceProps) {
  return (
    <>
      <div className="flex gap-2 items-end mt-4">
        <span className="text-2xl font-bold">${price}</span>
        <span className="text-muted-foreground text-base">/ {nightLabel}</span>
      </div>
      
      <Button asChild size="lg" className="btn-primary mt-4 w-full md:w-fit">
        <Link to="/booking">{bookNowLabel}</Link>
      </Button>
    </>
  );
}
