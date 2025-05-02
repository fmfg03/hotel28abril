
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useSuites } from "@/hooks/useSuites";

interface SuitesFiltersProps {
  capacityFilter: string;
  setCapacityFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
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
  const { data: suites = [] } = useSuites();
  const [maxPrice, setMaxPrice] = useState(350);

  // Calculate the max price dynamically from suites data
  useEffect(() => {
    if (suites.length > 0) {
      const highestPrice = Math.max(...suites.map(suite => suite.price));
      // Round up to the nearest 50 for a nice UI range
      setMaxPrice(Math.ceil(highestPrice / 50) * 50);
      
      // Reset price range if the current max is lower than the highest price
      if (priceRange[1] < highestPrice) {
        setPriceRange([0, highestPrice]);
      }
    }
  }, [suites, setPriceRange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
      <div>
        <label className="block font-medium mb-1">{t.suites.filters.location}</label>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.suites.filters.allLocations}</SelectItem>
            {locations
              .filter(l => l !== "all")
              .map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block font-medium mb-1">{t.suites.filters.guests}</label>
        <Select value={capacityFilter} onValueChange={setCapacityFilter}>
          <SelectTrigger>
            <SelectValue />
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

      <div className="lg:col-span-2">
        <div className="flex justify-between mb-1">
          <span className="font-medium">{t.suites.filters.priceRange}</span>
          <span>
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <div className="px-1">
          <Slider
            defaultValue={[0, 350]}
            value={priceRange}
            max={maxPrice}
            step={10}
            onValueChange={setPriceRange}
          />
        </div>
      </div>
    </div>
  );
}
