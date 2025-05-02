
import SuiteCard from "@/components/SuiteCard";
import { SuiteProps } from "@/types/Suite";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedSuitesSection() {
  const { t } = useLanguage();
  const [suites, setSuites] = useState<SuiteProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedSuites() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("hotel28.suites")
          .select("*")
          .order("price", { ascending: true })
          .limit(3);
        
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
    fetchFeaturedSuites();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            {t.featuredSuites.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {t.featuredSuites.title}
          </h2>
          <p className="text-muted-foreground">
            {t.featuredSuites.description}
          </p>
        </div>
        {loading ? (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">{t.suites.filters.showing}</h3>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suites.map((suite, index) => (
            <div key={suite.id} className="animate-fade-in" style={{
              animationDelay: `${(index + 1) * 100}ms`
            }}>
              <SuiteCard suite={suite} />
            </div>
          ))}
        </div>
        )}
        <div className="text-center mt-12">
          <Button asChild className="btn-primary">
            <Link to="/suites">
              {t.featuredSuites.viewAll} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
