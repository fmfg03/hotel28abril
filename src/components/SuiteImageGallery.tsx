
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
};

interface SuiteImageGalleryProps {
  images: SuiteImage[];
  fallbackImage?: { url: string; alt: string };
}

export default function SuiteImageGallery({
  images,
  fallbackImage,
}: SuiteImageGalleryProps) {
  const [loaded, setLoaded] = useState<{ [key: string]: boolean }>({});

  if (!images || images.length === 0) {
    if (fallbackImage) {
      return (
        <img
          src={fallbackImage.url}
          alt={fallbackImage.alt}
          className="w-full rounded-lg shadow-lg object-cover max-h-[450px] mb-4"
          style={{ background: "#e5e7eb" }}
        />
      );
    }
    return null;
  }

  return (
    <Carousel className="relative">
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={img.id} className="p-0">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-lg relative">
              <img
                src={img.image_url}
                alt={img.alt_text || "Suite image"}
                className={cn(
                  "object-cover w-full h-full transition-opacity duration-500",
                  loaded[img.id] ? "opacity-100" : "opacity-0"
                )}
                style={{
                  background: "#e5e7eb",
                  maxHeight: 450,
                }}
                onLoad={() => setLoaded((prev) => ({ ...prev, [img.id]: true }))}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
