
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GalleryImage } from "@/hooks/useGalleryImages";

type AmenitiesGalleryProps = {
  images: GalleryImage[];
  isLoading: boolean;
  error: string | null;
};

export default function AmenitiesGallery({ images, isLoading, error }: AmenitiesGalleryProps) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Photo Gallery
          </h2>
          <p className="text-muted-foreground">
            Explore our rooms, suites, and shared spaces through real images of Hotel 28.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {isLoading ? (
            // Show skeletons while loading
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Skeleton className="w-full h-full" />
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center text-destructive">
              <p>Error loading gallery images. Please try again later.</p>
            </div>
          ) : images.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">
              <p>No amenity images available at the moment.</p>
            </div>
          ) : (
            images.map((image, index) => (
              <div 
                key={image.id} 
                className="aspect-square rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
              >
                <img 
                  src={image.image_url}
                  alt={image.alt_text || `Amenity ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          )}
        </div>
        
        <div className="flex justify-center">
          <Button asChild variant="heroSolid" size="lg">
            <Link to="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
