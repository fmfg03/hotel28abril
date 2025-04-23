
import { ApartmentProps } from "@/components/ApartmentCard";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Apartments fetching hook for booking
export function useApartments() {
  return useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apartments")
        .select("*")
        .order("price", { ascending: true })
      if (error) {
        console.error("Error fetching apartments:", error);
        throw new Error(error.message);
      }
      return data as ApartmentProps[];
    },
  });
}
