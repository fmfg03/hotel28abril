
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuitesFilters from "@/components/SuitesFilters";
import SuitesList from "@/components/SuitesList";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { SuiteProps } from "@/types/Suite";

export default function Suites() {
  const { t } = useLanguage();
  const [suites, setSuites] = useState<SuiteProps[]>([]);
  const [filteredSuites, setFilteredSuites] = useState<SuiteProps[]>([]);
  const [capacityFilter, setCapacityFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 350]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchSuites() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("hotel28.suites")
          .select("*")
          .order("price", { ascending: true });
          
        if (!error && data) {
          setSuites(data.map(suite => ({
            id: suite.id?.toString() || "",
            name: suite.name || "",
            description: suite.description || "", 
            price: suite.price || 0,
            capacity: suite.capacity || 0,
            size: suite.size || 0,
            image: suite.image || "",
            location: suite.location || "",
            features: suite.features || []
          })));
        }
      } catch (err) {
        console.error("Error fetching suites:", err);
      }
      setLoading(false);
    }
    fetchSuites();
  }, []);

  useEffect(() => {
    let result = suites;
    if (capacityFilter !== "all") {
      const capacity = parseInt(capacityFilter);
      result = result.filter(apt => apt.capacity >= capacity);
    }
    if (locationFilter !== "all") {
      result = result.filter(apt => apt.location === locationFilter);
    }
    result = result.filter(apt => apt.price >= priceRange[0] && apt.price <= priceRange[1]);
    setFilteredSuites(result);
  }, [suites, capacityFilter, locationFilter, priceRange]);

  const locations = ["all", ...Array.from(new Set(suites.map(apt => apt.location)))];

  const resetFilters = () => {
    setCapacityFilter("all");
    setLocationFilter("all");
    setPriceRange([0, 350]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.suites.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {t.suites.subtitle}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute top-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        <section className="py-8 border-b">
          <div className="container">
            <SuitesFilters
              capacityFilter={capacityFilter}
              setCapacityFilter={setCapacityFilter}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              resetFilters={resetFilters}
              locations={locations}
            />
            <div className="flex justify-between items-center mt-6 animate-fade-in [animation-delay:200ms]">
              <p className="text-muted-foreground">
                {t.suites.filters.showing} {filteredSuites.length} {t.suites.filters.of} {suites.length} {t.suites.filters.accommodations}
              </p>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <SuitesList
              suites={suites}
              filteredSuites={filteredSuites}
              loading={loading}
              resetFilters={resetFilters}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
