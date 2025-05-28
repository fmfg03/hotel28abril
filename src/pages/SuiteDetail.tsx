
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import SuiteImageGallery from "@/components/SuiteImageGallery";
import SuiteDetailHeader from "@/components/suite/SuiteDetailHeader";
import SuiteInfo from "@/components/suite/SuiteInfo";
import SuiteLoading from "@/components/suite/SuiteLoading";
import SuiteNotFound from "@/components/suite/SuiteNotFound";
import { useSuites } from "@/hooks/useSuites";
import { useSuiteImages, SuiteImage } from "@/hooks/useSuiteImages";
import { getSuiteNameFromSlug } from "@/utils/suiteSlugUtils";

export default function SuiteDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  
  // Fetch all suites
  const { data: suites, isLoading } = useSuites();
  
  // Get suite name from slug
  const suiteName = slug ? getSuiteNameFromSlug(slug) : "";
  
  // Find the current suite by name
  const suite = suites?.find(s => s.name === suiteName);
  
  // Fetch images for this suite
  const { data: images = [] } = useSuiteImages(suite?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Translation logic
  const translatedName =
    language !== "en" && suite && t.suiteDescriptions[suite.id]?.name
      ? t.suiteDescriptions[suite.id].name
      : suite?.name;

  const translatedDescription =
    language !== "en" && suite && t.suiteDescriptions[suite.id]?.description
      ? t.suiteDescriptions[suite.id].description
      : suite?.description;

  if (isLoading) {
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
                className="rounded-lg shadow-lg max-h-[450px]"
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
