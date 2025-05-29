
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSuiteImages } from "@/hooks/useSuiteImages";
import { getSuiteCategoryCode } from "@/utils/suiteCategories";
import SuiteImageGallery from "./SuiteImageGallery";

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
  const { t, language } = useLanguage();

  // Translate names and descriptions if available
  const getTranslatedName = (suite: SuiteProps) => {
    return language !== 'en' && t.suiteDescriptions && t.suiteDescriptions[suite.id]?.name 
      ? t.suiteDescriptions[suite.id].name 
      : suite.name;
  };
  
  const getTranslatedDescription = (suite: SuiteProps) => {
    return language !== 'en' && t.suiteDescriptions && t.suiteDescriptions[suite.id]?.description
      ? t.suiteDescriptions[suite.id].description
      : suite.description;
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Select Your Accommodation</h2>
      <div className="space-y-6">
        {suites.map((suite) => {
          const categoryCode = getSuiteCategoryCode(suite.name);
          const { data: images = [] } = useSuiteImages(suite.id, categoryCode);
          
          return (
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
                <SuiteImageGallery
                  images={images.length > 0 ? images : [
                    {
                      id: "main-img",
                      suite_id: suite.id,
                      image_url: suite.image,
                      alt_text: getTranslatedName(suite),
                      order: 0,
                      suite_category: categoryCode || "D"
                    }
                  ]}
                  fallbackImage={{
                    url: suite.image,
                    alt: getTranslatedName(suite)
                  }}
                  className="h-full"
                  showNavigation={images.length > 1}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{getTranslatedName(suite)}</h3>
                  <p className="text-muted-foreground mb-4">{getTranslatedDescription(suite)}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="text-sm bg-muted px-3 py-1 rounded-full">
                      {suite.capacity} {t.suites.filters.guests}
                    </div>
                    <div className="text-sm bg-muted px-3 py-1 rounded-full">
                      {suite.size} m²
                    </div>
                    <div className="text-sm bg-muted px-3 py-1 rounded-full">
                      {suite.location}
                    </div>
                    {suite.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="text-sm bg-muted px-3 py-1 rounded-full">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xl font-bold">From ${suite.price}</span>
                    <span className="text-muted-foreground text-sm"> / {t.booking?.summary?.night || 'night'}</span>
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
          );
        })}
      </div>
    </>
  );
}
