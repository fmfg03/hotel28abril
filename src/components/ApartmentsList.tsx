
import ApartmentCard, { ApartmentProps } from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ApartmentsListProps {
  apartments: ApartmentProps[];
  filteredApartments: ApartmentProps[];
  loading: boolean;
  resetFilters: () => void;
}

export default function ApartmentsList({
  apartments,
  filteredApartments,
  loading,
  resetFilters,
}: ApartmentsListProps) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h3 className="text-xl font-semibold mb-2">{t.apartments.filters.showing}</h3>
      </div>
    );
  }

  if (filteredApartments.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h3 className="text-xl font-semibold mb-2">{t.apartments.filters.noMatch}</h3>
        <p className="text-muted-foreground mb-6">{t.apartments.filters.adjustFilters}</p>
        <Button variant="outline" onClick={resetFilters}>
          {t.apartments.filters.resetFilters}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredApartments.map((apartment, index) => (
        <div key={apartment.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
          <ApartmentCard apartment={apartment} />
        </div>
      ))}
    </div>
  );
}
