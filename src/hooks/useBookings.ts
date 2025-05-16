
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays } from "date-fns";
import { SuiteProps } from "@/utils/calculateRoomSelection";

export interface BookingData {
  id?: string;
  suite_id: string;
  suite_name: string;
  suite_price: number;
  check_in_date: Date;
  check_out_date: Date;
  nights: number;
  adults: number;
  children: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  payment_method: string;
  suite_total: number;
  cleaning_fee: number;
  service_fee: number;
  total_price: number;
  special_requests?: string;
  booking_reference?: string;
}

export interface PaymentDetailsData {
  booking_id: string;
  card_name?: string;
  card_last_four?: string;
  card_number?: string;
  card_expiry?: string;
  card_cvc?: string;
}

export const useBookings = () => {
  // Function to save booking data
  const saveBooking = async (
    formData: any,
    selectedSuite: SuiteProps,
    startDate: Date,
    endDate: Date,
    adults: string,
    children: string
  ): Promise<string | null> => {
    try {
      // Calculate nights and pricing
      const nightsCount = differenceInDays(endDate, startDate);
      const suiteTotal = selectedSuite.price * nightsCount;
      const cleaningFee = 50; // Fixed cleaning fee
      const serviceFee = 30; // Fixed service fee
      const totalPrice = suiteTotal + cleaningFee + serviceFee;

      // Format the booking data
      const bookingData: BookingData = {
        suite_id: selectedSuite.id,
        suite_name: selectedSuite.name,
        suite_price: selectedSuite.price,
        check_in_date: startDate,
        check_out_date: endDate,
        nights: nightsCount,
        adults: parseInt(adults),
        children: parseInt(children),
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || "",
        city: formData.city || "",
        country: formData.country || "",
        payment_method: formData.paymentMethod,
        suite_total: suiteTotal,
        cleaning_fee: cleaningFee,
        service_fee: serviceFee,
        total_price: totalPrice,
        special_requests: formData.specialRequests || "",
      };

      // Save booking to Supabase - use type assertion since DB types are not updated yet
      const { data: bookingResult, error: bookingError } = await supabase
        .from('bookings' as any)
        .insert(bookingData as any)
        .select("id")
        .single();

      if (bookingError) {
        console.error("Error saving booking:", bookingError);
        return null;
      }

      // Type assertion to handle the table not being in the TypeScript types yet
      // This helps us safely extract the ID
      const bookingId = bookingResult ? (bookingResult as any).id : null;
      
      if (!bookingId) {
        console.error("No booking ID returned");
        return null;
      }

      // If using credit card, save payment details
      if (formData.paymentMethod === "credit-card" && formData.cardNumber) {
        // Extract last four digits for reference
        const cardLastFour = formData.cardNumber.slice(-4);
        
        const paymentData: PaymentDetailsData = {
          booking_id: bookingId,
          card_name: formData.cardName,
          card_last_four: cardLastFour,
          card_number: formData.cardNumber,
          card_expiry: formData.cardExpiry,
          card_cvc: formData.cardCvc
        };

        // Save payment details - use type assertion since DB types are not updated yet
        const { error: paymentError } = await supabase
          .from('payment_details' as any)
          .insert({
            booking_id: paymentData.booking_id,
            card_name: paymentData.card_name,
            card_last_four: paymentData.card_last_four,
            // Store these fields directly - in a production environment,
            // you would use proper encryption via server-side functions
            card_number_encrypted: paymentData.card_number, 
            card_expiry_encrypted: paymentData.card_expiry,
            card_cvc_encrypted: paymentData.card_cvc
          } as any);

        if (paymentError) {
          console.error("Error saving payment details:", paymentError);
          // Don't return null here, as the booking was still created
        }
      }

      return bookingId;
    } catch (error) {
      console.error("Error in saveBooking:", error);
      return null;
    }
  };

  return { saveBooking };
};
