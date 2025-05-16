
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type GalleryImage = {
  id: string;
  image_type: string;
  image_url: string;
  alt_text: string | null;
  order_index: number | null;
};

export function useGalleryImages() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('order_index', { ascending: true, nullsFirst: true });

        if (error) {
          throw new Error(error.message);
        }

        setImages(data || []);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch gallery images");
      } finally {
        setIsLoading(false);
      }
    }

    fetchGalleryImages();
  }, []);

  return { images, isLoading, error };
}
