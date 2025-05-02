
import { SuiteProps } from "@/types/Suite";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { mockSuites } from "@/data/suitesMockData";

// Suites fetching hook for booking
export function useSuites() {
  return useQuery({
    queryKey: ["suites"],
    queryFn: async () => {
      try {
        // Due to issues with the Supabase schema configuration,
        // we're temporarily using mock data until the database schema is fixed
        console.log("Using mock data for suites");
        return mockSuites;
        
        // Original code commented out until database schema is fixed
        // const { data, error } = await supabase
        //   .from("hotel28.suites")
        //   .select("*")
        //   .order("price", { ascending: true });
          
        // if (error) {
        //   console.error("Error fetching suites:", error);
        //   throw new Error(error.message);
        // }
        
        // // Ensure data is properly typed
        // return (data || []).map(suite => {
        //   // Explicitly convert DB fields to the Suite model
        //   return {
        //     id: suite?.id?.toString() || "",
        //     name: suite?.name || "",
        //     description: suite?.description || "",
        //     price: suite?.price || 0,
        //     capacity: suite?.capacity || 0,
        //     size: suite?.size || 0,
        //     image: suite?.image || "",
        //     location: suite?.location || "",
        //     features: Array.isArray(suite?.features) ? suite.features : []
        //   } as SuiteProps;
        // });
      } catch (err) {
        console.error("Error in useSuites:", err);
        throw err;
      }
    },
  });
}
