import SuiteCard from "@/components/SuiteCard";
import { SuiteProps } from "@/types/Suite";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SuitesListProps {
  suites: SuiteProps[];
  filteredSuites: SuiteProps[];
  loading: boolean;
  resetFilters: () => void;
}

export default function SuitesList({
  suites,
  filteredSuites,
  loading,
  resetFilters,
}: SuitesListProps) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h3 className="text-xl font-semibold mb-2">{t.suites.filters.showing}</h3>
      </div>
    );
  }

  if (filteredSuites.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h3 className="text-xl font-semibold mb-2">{t.suites.filters.noMatch}</h3>
        <p className="text-muted-foreground mb-6">{t.suites.filters.adjustFilters}</p>
        <Button variant="outline" onClick={resetFilters}>
          {t.suites.filters.resetFilters}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredSuites.map((suite, index) => (
        <div key={suite.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
          <SuiteCard suite={suite} />
        </div>
      ))}
    </div>
  );
}
