
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApartmentCard, { ApartmentProps } from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

export default function Apartments() {
  const { t } = useLanguage();
  const [apartments, setApartments] = useState<ApartmentProps[]>([]);
  const [filteredApartments, setFilteredApartments] = useState<ApartmentProps[]>([]);
  const [capacityFilter, setCapacityFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([100, 350]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Fetch apartments from Supabase on mount
  useEffect(() => {
    async function fetchApartments() {
      setLoading(true);
      const { data, error } = await supabase
        .from("apartments")
        .select("*")
        .order("price", { ascending: true });
      if (!error && data) {
        // Client expects string id, but Supabase returns uuid as id.
        setApartments(data.map(apt => ({
          ...apt,
          id: apt.id.toString(),
        })));
      }
      setLoading(false);
    }
    fetchApartments();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = apartments;
    if (capacityFilter !== "all") {
      const capacity = parseInt(capacityFilter);
      result = result.filter(apt => apt.capacity >= capacity);
    }
    if (locationFilter !== "all") {
      result = result.filter(apt => apt.location === locationFilter);
    }
    result = result.filter(apt => apt.price >= priceRange[0] && apt.price <= priceRange[1]);
    setFilteredApartments(result);
  }, [apartments, capacityFilter, locationFilter, priceRange]);

  // Get unique locations for filter
  const locations = ["all", ...Array.from(new Set(apartments.map(apt => apt.location)))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.apartments.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {t.apartments.subtitle}
              </p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute top-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {/* Capacity Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.apartments.filters.guests}
                </label>
                <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.apartments.filters.guests} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.apartments.filters.anyGuests}</SelectItem>
                    <SelectItem value="1">{t.apartments.filters.onePlus}</SelectItem>
                    <SelectItem value="2">{t.apartments.filters.twoPlus}</SelectItem>
                    <SelectItem value="3">{t.apartments.filters.threePlus}</SelectItem>
                    <SelectItem value="4">{t.apartments.filters.fourPlus}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.apartments.filters.location}
                </label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.apartments.filters.location} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.apartments.filters.allLocations}</SelectItem>
                    {locations.filter(loc => loc !== "all").map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.apartments.filters.priceRange}: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  defaultValue={[100, 350]}
                  min={100}
                  max={350}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 animate-fade-in [animation-delay:200ms]">
              <p className="text-muted-foreground">
                {t.apartments.filters.showing} {filteredApartments.length} {t.apartments.filters.of} {apartments.length} {t.apartments.filters.accommodations}
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setCapacityFilter("all");
                  setLocationFilter("all");
                  setPriceRange([100, 350]);
                }}
              >
                {t.apartments.filters.resetFilters}
              </Button>
            </div>
          </div>
        </section>
        {/* Apartments Grid */}
        <section className="section">
          <div className="container">
            {loading ? (
              <div className="text-center py-12 animate-fade-in">
                <h3 className="text-xl font-semibold mb-2">{t.apartments.filters.loading}</h3>
              </div>
            ) : filteredApartments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredApartments.map((apartment, index) => (
                  <div key={apartment.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                    <ApartmentCard apartment={apartment} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <h3 className="text-xl font-semibold mb-2">{t.apartments.filters.noMatch}</h3>
                <p className="text-muted-foreground mb-6">{t.apartments.filters.adjustFilters}</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCapacityFilter("all");
                    setLocationFilter("all");
                    setPriceRange([100, 350]);
                  }}
                >
                  {t.apartments.filters.resetFilters}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
