
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export type SuiteImage = {
  id: string;
  suite_id: string;
  image_url: string;
  alt_text: string | null;
  order: number | null;
  suite_category: string | null;
};

export function useSuiteImages(suiteId: string | undefined, suiteCategory?: string) {
  return useQuery({
    queryKey: ["suiteImages", suiteId, suiteCategory],
    queryFn: async () => {
      if (!suiteId) return [];

      try {
        let query = supabase
          .from("suite_images")
          .select("*")
          .eq("suite_id", suiteId);

        // If suiteCategory is provided, filter by it OR include shared images (category D)
        if (suiteCategory) {
          query = query.in("suite_category", [suiteCategory, "D"]);
        }

        const { data, error } = await query.order("order_index", { ascending: true });
          
        if (error) {
          console.error("Error fetching suite images:", error);
          throw new Error(error.message);
        }
        
        return (data || []).map(img => ({
          id: img.id,
          suite_id: img.suite_id,
          image_url: img.image_url,
          alt_text: img.alt_text,
          order: img.order_index,
          suite_category: img.suite_category
        })) as SuiteImage[];
      } catch (err) {
        console.error("Error in useSuiteImages:", err);
        throw err;
      }
    },
    enabled: !!suiteId, // Only run the query if suiteId is provided
  });
}
