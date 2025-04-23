import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import GalleryFilterBar from "@/components/gallery/GalleryFilterBar";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    alt: "Beachfront view",
    category: "exterior"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    alt: "Luxury suite interior",
    category: "rooms"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1584132905271-512c958d674a?w=800&h=600&fit=crop",
    alt: "Swimming pool",
    category: "amenities"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop",
    alt: "Premium apartment",
    category: "rooms"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop",
    alt: "Beach sunset",
    category: "exterior"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
    alt: "Dining area",
    category: "amenities"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
    alt: "Bathroom",
    category: "rooms"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
    alt: "Beach pathway",
    category: "exterior"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
    alt: "Restaurant",
    category: "amenities"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=600&fit=crop",
    alt: "Bedroom",
    category: "rooms"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    alt: "Beach umbrellas",
    category: "exterior"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    alt: "Spa",
    category: "amenities"
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterGallery = (category: string) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === category));
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

  const filterOptions = ["all", "exterior", "rooms", "amenities"];

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
            <GalleryFilterBar
              filterOptions={filterOptions}
              activeFilter={activeFilter}
              onFilter={filterGallery}
              t={t}
            />

            <GalleryGrid images={filteredImages} onImageClick={setSelectedImage} />
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
