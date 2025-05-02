
import { SuiteProps } from "@/components/SuiteCard";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Suites fetching hook for booking
export function useSuites() {
  return useQuery({
    queryKey: ["suites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("suites")
        .select("*")
        .order("price", { ascending: true })
      if (error) {
        console.error("Error fetching suites:", error);
        throw new Error(error.message);
      }
      return data as SuiteProps[];
    },
  });
}
