
import { SuiteProps } from "@/types/Suite";
import { useLanguage } from "@/contexts/LanguageContext";
import SuiteDetails from "./SuiteDetails";
import SuiteFeatures from "./SuiteFeatures";
import SuitePrice from "./SuitePrice";

interface SuiteInfoProps {
  suite: SuiteProps;
  translatedName: string;
  translatedDescription: string;
}

export default function SuiteInfo({ suite, translatedName, translatedDescription }: SuiteInfoProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{translatedName}</h1>
        <p className="text-muted-foreground text-lg">{translatedDescription}</p>
      </div>
      
      <SuiteDetails suite={suite} />
      <SuiteFeatures features={suite.features} />
      
      <SuitePrice 
        price={suite.price} 
        nightLabel={t.booking.summary.night} 
        bookNowLabel={t.suites.bookNow} 
      />
    </div>
  );
}
