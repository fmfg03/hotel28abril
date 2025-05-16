
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GalleryImage } from "./useGalleryImages";

export function useAmenityImages(limit: number = 8) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAmenityImages() {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('image_type', 'Amenities')
          .order('order_index', { ascending: true, nullsLast: true })
          .limit(limit);

        if (error) {
          throw new Error(error.message);
        }

        setImages(data || []);
      } catch (err) {
        console.error("Error fetching amenity images:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch amenity images");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAmenityImages();
  }, [limit]);

  return { images, isLoading, error };
}
