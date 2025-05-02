
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SuitesFiltersProps {
  capacityFilter: string;
  setCapacityFilter: (v: string) => void;
  locationFilter: string;
  setLocationFilter: (v: string) => void;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
  resetFilters: () => void;
  locations: string[];
}

export default function SuitesFilters({
  capacityFilter,
  setCapacityFilter,
  locationFilter,
  setLocationFilter,
  priceRange,
  setPriceRange,
  resetFilters,
  locations,
}: SuitesFiltersProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      <div>
        <label className="block text-sm font-medium mb-2">
          {t.suites.filters.guests}
        </label>
        <Select value={capacityFilter} onValueChange={setCapacityFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t.suites.filters.guests} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.suites.filters.anyGuests}</SelectItem>
            <SelectItem value="1">{t.suites.filters.onePlus}</SelectItem>
            <SelectItem value="2">{t.suites.filters.twoPlus}</SelectItem>
            <SelectItem value="3">{t.suites.filters.threePlus}</SelectItem>
            <SelectItem value="4">{t.suites.filters.fourPlus}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          {t.suites.filters.location}
        </label>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t.suites.filters.location} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.suites.filters.allLocations}</SelectItem>
            {locations.filter(loc => loc !== "all").map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          {t.suites.filters.priceRange}: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <Slider
          defaultValue={[0, 350]}
          min={0}
          max={350}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-4"
        />
      </div>
      <div className="md:col-span-3 flex justify-between items-center mt-6 animate-fade-in [animation-delay:200ms]">
        <div />
        <Button variant="outline" onClick={resetFilters}>
          {t.suites.filters.resetFilters}
        </Button>
      </div>
    </div>
  );
}
