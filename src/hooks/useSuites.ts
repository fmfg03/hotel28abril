
import { SuiteProps } from "@/types/Suite";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Suites fetching hook for booking
export function useSuites() {
  return useQuery({
    queryKey: ["suites"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("hotel28.suites")
          .select("*")
          .order("price", { ascending: true });
          
        if (error) {
          console.error("Error fetching suites:", error);
          throw new Error(error.message);
        }
        
        return (data || []).map(suite => ({
          id: suite.id?.toString() || "",
          name: suite.name || "",
          description: suite.description || "",
          price: suite.price || 0,
          capacity: suite.capacity || 0,
          size: suite.size || 0,
          image: suite.image || "",
          location: suite.location || "",
          features: suite.features || []
        })) as SuiteProps[];
      } catch (err) {
        console.error("Error in useSuites:", err);
        throw err;
      }
    },
  });
}
