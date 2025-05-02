
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SuiteProps } from "@/types/Suite";
import { useLanguage } from "@/contexts/LanguageContext";
import SuiteImageGallery from "@/components/SuiteImageGallery";
import { mockSuites, mockSuiteImages } from "@/data/suitesMockData";
import SuiteDetailHeader from "@/components/suite/SuiteDetailHeader";
import SuiteInfo from "@/components/suite/SuiteInfo";
import SuiteLoading from "@/components/suite/SuiteLoading";
import SuiteNotFound from "@/components/suite/SuiteNotFound";

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
    return <SuiteLoading loadingText={t.suites.loading} />;
  }

  if (!suite) {
    return <SuiteNotFound notFoundText={t.suites.notFound} goBackText={t.suites.goBack} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 bg-gradient-to-tr from-sea-light to-white dark:from-sea-dark dark:to-background">
        <div className="container py-14">
          <SuiteDetailHeader goBackText={t.suites.goBack} />
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
            <SuiteInfo
              suite={suite}
              translatedName={translatedName || ""}
              translatedDescription={translatedDescription || ""}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
