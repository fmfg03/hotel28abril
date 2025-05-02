
import { SuiteProps } from "@/utils/calculateRoomSelection";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Suites fetching hook for booking
export function useSuites() {
  return useQuery({
    queryKey: ["suites"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("suites")
          .select("*")
          .order("price", { ascending: true });
          
        if (error) {
          console.error("Error fetching suites:", error);
          throw new Error(error.message);
        }
        
        // Ensure data is properly typed
        return (data || []).map(suite => {
          // Explicitly convert DB fields to the Suite model
          return {
            id: suite?.id?.toString() || "",
            name: suite?.name || "",
            description: suite?.description || "",
            price: Number(suite?.price) || 0,
            capacity: suite?.capacity || 0,
            size: suite?.size || 0,
            image: suite?.image || "",
            location: suite?.location || "",
            features: Array.isArray(suite?.features) ? suite.features : []
          } as SuiteProps;
        });
      } catch (err) {
        console.error("Error in useSuites:", err);
        throw err;
      }
    },
  });
}
