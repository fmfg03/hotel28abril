
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import GalleryFilterBar from "@/components/gallery/GalleryFilterBar";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGalleryImages, GalleryImage } from "@/hooks/useGalleryImages";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Gallery() {
  const { t } = useLanguage();
  const { images, isLoading, error } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (images.length) {
      filterGallery(activeFilter);
    }
  }, [images, activeFilter]);

  const filterGallery = (category: string) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.image_type === category));
    }
  };

  const navigateGallery = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex].id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        navigateGallery("prev");
      } else if (e.key === "ArrowRight") {
        navigateGallery("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  // Extract unique image types for filter options
  const filterOptions = ["all", ...new Set(images.map(img => img.image_type))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.gallery.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {t.gallery.subtitle}
              </p>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>

        {/* Gallery Filters */}
        <section className="py-8">
          <div className="container">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}. Displaying sample images instead.
                </AlertDescription>
              </Alert>
            )}

            {isLoading ? (
              <div className="space-y-4">
                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full" />
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array(12).fill(0).map((_, i) => (
                    <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <GalleryFilterBar
                  filterOptions={filterOptions}
                  activeFilter={activeFilter}
                  onFilter={filterGallery}
                  t={t}
                />

                <GalleryGrid 
                  images={filteredImages} 
                  onImageClick={(id) => setSelectedImage(id)} 
                />
              </>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage !== null && (
          <GalleryLightbox
            selectedImage={selectedImage}
            images={filteredImages}
            onClose={() => setSelectedImage(null)}
            onPrev={() => navigateGallery("prev")}
            onNext={() => navigateGallery("next")}
          />
        )}

        {/* CTA Buttons at the bottom */}
        <div className="container py-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="btn-primary w-full sm:w-auto">
            <Link to="/apartments">
              {t.welcome.exploreRooms}
            </Link>
          </Button>
          <Button asChild size="lg" className="btn-primary w-full sm:w-auto">
            <Link to="/booking">
              {t.home.cta.bookNow}
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
