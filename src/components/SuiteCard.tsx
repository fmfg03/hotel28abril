
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSuiteImages } from "@/hooks/useSuiteImages";
import { getSuiteSlug } from "@/utils/suiteSlugUtils";
import SuiteImageGallery from "./SuiteImageGallery";

interface SuiteCardProps {
  suite: SuiteProps;
}

export default function SuiteCard({ suite }: SuiteCardProps) {
  const { t, language } = useLanguage();
  const { data: images = [] } = useSuiteImages(suite.id);

  // Translation logic
  const translatedName =
    language !== "en" && t.suiteDescriptions && t.suiteDescriptions[suite.id]?.name
      ? t.suiteDescriptions[suite.id].name
      : suite.name;

  const translatedDescription =
    language !== "en" && t.suiteDescriptions && t.suiteDescriptions[suite.id]?.description
      ? t.suiteDescriptions[suite.id].description
      : suite.description;

  const suiteSlug = getSuiteSlug(suite.name);

  return (
    <div className="group bg-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-border">
      <div className="relative h-64 overflow-hidden">
        <SuiteImageGallery
          images={images.length > 0 ? images : [
            {
              id: "main-img",
              suite_id: suite.id,
              image_url: suite.image,
              alt_text: translatedName || "image",
              order: 0
            }
          ]}
          fallbackImage={{
            url: suite.image,
            alt: translatedName || "image"
          }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {translatedName}
          </h3>
          <div className="text-right">
            <div className="text-lg font-bold">${suite.price}</div>
            <div className="text-sm text-muted-foreground">/ {t.booking?.summary?.night || 'night'}</div>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {translatedDescription}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted">
            {suite.capacity} {t.suites.filters.guests}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted">
            {suite.size} m²
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted">
            {suite.location}
          </span>
          {suite.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted"
            >
              {feature}
            </span>
          ))}
          {suite.features.length > 2 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted">
              +{suite.features.length - 2} {t.suites.filters.more}
            </span>
          )}
        </div>
        
        <Button asChild className="w-full btn-primary">
          <Link to={`/suites/${suiteSlug}`}>
            {t.suites.filters.viewDetails}
          </Link>
        </Button>
      </div>
    </div>
  );
}
