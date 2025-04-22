
import ApartmentCard, { ApartmentProps } from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedApartmentsSection() {
  const { t } = useLanguage();
  const [apartments, setApartments] = useState<ApartmentProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedApartments() {
      setLoading(true);
      const { data, error } = await supabase
        .from("apartments")
        .select("*")
        .order("price", { ascending: true })
        .limit(3);
      if (!error && data) {
        setApartments(data.map(apt => ({
          ...apt,
          id: apt.id.toString(),
        })));
      }
      setLoading(false);
    }
    fetchFeaturedApartments();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            {t.featuredApartments.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {t.featuredApartments.title}
          </h2>
          <p className="text-muted-foreground">
            {t.featuredApartments.description}
          </p>
        </div>
        {loading ? (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">{t.apartments.filters.showing}</h3>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apartment, index) => (
            <div key={apartment.id} className="animate-fade-in" style={{
              animationDelay: `${(index + 1) * 100}ms`
            }}>
              <ApartmentCard apartment={apartment} />
            </div>
          ))}
        </div>
        )}
        <div className="text-center mt-12">
          <Button asChild className="btn-primary">
            <Link to="/apartments">
              {t.featuredApartments.viewAll} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
