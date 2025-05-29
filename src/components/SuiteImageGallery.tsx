
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type SuiteImage = {
  id: string;
  suite_id: string;
  image_url: string;
  alt_text: string | null;
  order: number | null;
  suite_category?: string | null;
};

interface SuiteImageGalleryProps {
  images: SuiteImage[];
  fallbackImage?: { url: string; alt: string };
  className?: string;
  showNavigation?: boolean;
}

export default function SuiteImageGallery({
  images,
  fallbackImage,
  className,
  showNavigation = true,
}: SuiteImageGalleryProps) {
  const [loaded, setLoaded] = useState<{ [key: string]: boolean }>({});

  if (!images || images.length === 0) {
    if (fallbackImage) {
      return (
        <img
          src={fallbackImage.url}
          alt={fallbackImage.alt}
          className={cn("w-full object-cover", className)}
          style={{ background: "#e5e7eb" }}
        />
      );
    }
    return null;
  }

  // If only one image, show it directly without carousel
  if (images.length === 1) {
    return (
      <img
        src={images[0].image_url}
        alt={images[0].alt_text || "Suite image"}
        className={cn("w-full object-cover", className)}
        style={{ background: "#e5e7eb" }}
        onLoad={() => setLoaded((prev) => ({ ...prev, [images[0].id]: true }))}
      />
    );
  }

  return (
    <Carousel className={cn("relative w-full", className)}>
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={img.id} className="p-0">
            <div className="w-full h-full overflow-hidden relative">
              <img
                src={img.image_url}
                alt={img.alt_text || "Suite image"}
                className={cn(
                  "object-cover w-full h-full transition-opacity duration-500",
                  loaded[img.id] ? "opacity-100" : "opacity-0"
                )}
                style={{ background: "#e5e7eb" }}
                onLoad={() => setLoaded((prev) => ({ ...prev, [img.id]: true }))}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {showNavigation && images.length > 1 && (
        <>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </>
      )}
    </Carousel>
  );
}
