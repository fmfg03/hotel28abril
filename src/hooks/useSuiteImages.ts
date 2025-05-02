
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export type SuiteImage = {
  id: string;
  suite_id: string;
  image_url: string;
  alt_text: string | null;
  order: number | null;
};

export function useSuiteImages(suiteId: string | undefined) {
  return useQuery({
    queryKey: ["suiteImages", suiteId],
    queryFn: async () => {
      if (!suiteId) return [];

      try {
        const { data, error } = await supabase
          .from("suite_images")
          .select("*")
          .eq("suite_id", suiteId)
          .order("order_index", { ascending: true });
          
        if (error) {
          console.error("Error fetching suite images:", error);
          throw new Error(error.message);
        }
        
        return (data || []).map(img => ({
          id: img.id,
          suite_id: img.suite_id,
          image_url: img.image_url,
          alt_text: img.alt_text,
          order: img.order_index
        })) as SuiteImage[];
      } catch (err) {
        console.error("Error in useSuiteImages:", err);
        throw err;
      }
    },
    enabled: !!suiteId, // Only run the query if suiteId is provided
  });
}
