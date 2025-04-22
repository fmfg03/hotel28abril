
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { ApartmentProps } from "@/components/ApartmentCard";
import { Bath, Coffee, Wifi, Bed, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ApartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [apartment, setApartment] = useState<ApartmentProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchApartment() {
      setLoading(true);
      const { data, error } = await supabase
        .from("apartments")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        setApartment({
          ...data,
          id: data.id.toString(),
        });
      }

      setLoading(false);
    }
    if (id) fetchApartment();
  }, [id]);

  // Translation logic
  const translatedName =
    language !== "en" && apartment && t.apartmentDescriptions[apartment.id]?.name
      ? t.apartmentDescriptions[apartment.id].name
      : apartment?.name;

  const translatedDescription =
    language !== "en" && apartment && t.apartmentDescriptions[apartment.id]?.description
      ? t.apartmentDescriptions[apartment.id].description
      : apartment?.description;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">{t.apartments.loading}</div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <div className="text-2xl font-bold mb-2">{t.apartments.notFound}</div>
          <Button asChild variant="outline">
            <Link to="/apartments">
              <ArrowLeft className="mr-2 inline" />
              {t.apartments.goBack}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 bg-gradient-to-tr from-sea-light to-white dark:from-sea-dark dark:to-background">
        <div className="container py-14">
          <Button asChild variant="outline" className="mb-8">
            <Link to="/apartments">
              <ArrowLeft className="mr-2" />
              {t.apartments.goBack}
            </Link>
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={apartment.image}
                alt={translatedName}
                className="w-full rounded-lg shadow-lg object-cover max-h-[450px] mb-4"
                style={{ background: "#e5e7eb" }}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{translatedName}</h1>
                <p className="text-muted-foreground text-lg">{translatedDescription}</p>
              </div>
              <div className="flex gap-8 items-center mt-2 mb-4">
                <div className="flex items-center gap-2 text-base">
                  <Bed className="h-5 w-5" />
                  <span>
                    {apartment.capacity} {t.apartments.filters.guests}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <Bath className="h-5 w-5" />
                  <span>{t.apartments.bathroom}</span>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <span>{apartment.size} m²</span>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <span>{apartment.location}</span>
                </div>
              </div>
              {/* Features list */}
              <ul className="flex flex-wrap gap-3 mt-2">
                {apartment.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center rounded-full border border-muted px-3 py-1 text-sm bg-white/75 dark:bg-background/60 backdrop-blur"
                  >
                    {feature === "Bathroom" && <Bath className="h-4 w-4 mr-1" />}
                    {feature === "Kitchen" && <Coffee className="h-4 w-4 mr-1" />}
                    {feature === "Wi-Fi" && <Wifi className="h-4 w-4 mr-1" />}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {/* Price */}
              <div className="flex gap-2 items-end mt-4">
                <span className="text-2xl font-bold">${apartment.price}</span>
                <span className="text-muted-foreground text-base">/ {t.booking.summary.night}</span>
              </div>
              {/* Book Now Button */}
              <Button asChild size="lg" className="btn-primary mt-4 w-full md:w-fit">
                <Link to="/booking">{t.apartments.bookNow}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
