
import { Bed, Bath } from "lucide-react";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import { useLanguage } from "@/contexts/LanguageContext";

interface SuiteDetailsProps {
  suite: SuiteProps;
}

export default function SuiteDetails({ suite }: SuiteDetailsProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex gap-8 items-center mt-2 mb-4">
      <div className="flex items-center gap-2 text-base">
        <Bed className="h-5 w-5" />
        <span>
          {suite.capacity} {t.suites.filters.guests}
        </span>
      </div>
      <div className="flex items-center gap-2 text-base">
        <Bath className="h-5 w-5" />
        <span>{t.suites.bathroom}</span>
      </div>
      <div className="flex items-center gap-2 text-base">
        <span>{suite.size} m²</span>
      </div>
      <div className="flex items-center gap-2 text-base">
        <span>{suite.location}</span>
      </div>
    </div>
  );
}
