import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SuiteProps } from "@/types/Suite";
import { Bath, Coffee, Wifi, Bed, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import SuiteImageGallery from "@/components/SuiteImageGallery";
import { mockSuites, mockSuiteImages } from "@/data/suitesMockData";

type SuiteImage = {
  id: string;
  suite_id: string;
  image_url: string;
  alt_text: string | null;
  order: number | null;
};

export default function SuiteDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [suite, setSuite] = useState<SuiteProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<SuiteImage[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchSuite() {
      setLoading(true);
      try {
        // Use mock data instead of Supabase query
        const foundSuite = mockSuites.find(s => s.id === id);
        
        if (foundSuite) {
          setSuite(foundSuite);
        }
      } catch (err) {
        console.error("Error fetching suite:", err);
      }
      setLoading(false);
    }
    if (id) fetchSuite();
  }, [id]);

  useEffect(() => {
    // Fetch suite images gallery from mock data
    function fetchImages() {
      if (!id) return;
      try {
        // Use mock image data
        const suiteImages = mockSuiteImages.filter(img => img.suite_id === id);
        setImages(suiteImages);
      } catch (err) {
        console.error("Error fetching suite images:", err);
      }
    }
    fetchImages();
  }, [id]);

  // Translation logic
  const translatedName =
    language !== "en" && suite && t.suiteDescriptions[suite.id]?.name
      ? t.suiteDescriptions[suite.id].name
      : suite?.name;

  const translatedDescription =
    language !== "en" && suite && t.suiteDescriptions[suite.id]?.description
      ? t.suiteDescriptions[suite.id].description
      : suite?.description;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">{t.suites.loading}</div>
      </div>
    );
  }

  if (!suite) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <div className="text-2xl font-bold mb-2">{t.suites.notFound}</div>
          <Button asChild variant="outline">
            <Link to="/suites">
              <ArrowLeft className="mr-2 inline" />
              {t.suites.goBack}
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
            <Link to="/suites">
              <ArrowLeft className="mr-2" />
              {t.suites.goBack}
            </Link>
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
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
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{translatedName}</h1>
                <p className="text-muted-foreground text-lg">{translatedDescription}</p>
              </div>
              <div className="flex gap-8 items-center mt-2 mb-4">
                <div className="flex items-center gap-2 text-base">
                  <Bed className="h-5 w-5" />
                  <span>
                    {suite.capacity} {t.suites.filters.guests}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <Bath className="h-5 w-5" />
                  <span>{t.suites.bathroom}</span>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <span>{suite.size} m²</span>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <span>{suite.location}</span>
                </div>
              </div>
              {/* Features list */}
              <ul className="flex flex-wrap gap-3 mt-2">
                {suite.features.map((feature, index) => (
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
                <span className="text-2xl font-bold">${suite.price}</span>
                <span className="text-muted-foreground text-base">/ {t.booking.summary.night}</span>
              </div>
              {/* Book Now Button */}
              <Button asChild size="lg" className="btn-primary mt-4 w-full md:w-fit">
                <Link to="/booking">{t.suites.bookNow}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
