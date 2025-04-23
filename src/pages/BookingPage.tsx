import { useEffect, useState } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApartmentProps } from "@/components/ApartmentCard";
import BookingStepper from "@/components/BookingStepper";
import BookingDatesGuestsForm from "@/components/BookingDatesGuestsForm";
import BookingApartmentList from "@/components/BookingApartmentList";
import BookingGuestForm from "@/components/BookingGuestForm";
import BookingSummarySidebar from "@/components/BookingSummarySidebar";
import BookingReview from "@/components/BookingReview";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function BookingPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 7));
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedApartment, setSelectedApartment] = useState<ApartmentProps | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    paymentMethod: "credit-card",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    specialRequests: ""
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const fetchApartments = async () => {
    const { data, error } = await supabase
      .from('apartments')
      .select('*')
      .order('price', { ascending: true });
    
    if (error) {
      console.error('Error fetching apartments:', error);
      throw new Error(error.message);
    }
    
    return data as ApartmentProps[];
  };

  const { data: apartments, isLoading, error } = useQuery({
    queryKey: ['apartments'],
    queryFn: fetchApartments,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const totalPrice = selectedApartment ? selectedApartment.price * nightsCount : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", {
      apartment: selectedApartment,
      dates: { startDate, endDate },
      guests: { adults, children },
      customerInfo: formData
    });
    setIsBookingConfirmed(true);
    setTimeout(() => {
      setCurrentStep(1);
      setSelectedApartment(null);
      setStartDate(new Date());
      setEndDate(addDays(new Date(), 7));
      setAdults("2");
      setChildren("0");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
        paymentMethod: "credit-card",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
        specialRequests: ""
      });
      setIsBookingConfirmed(false);
    }, 5000);
  };

  const buildCloudbedsUrl = () => {
    const propertyCode = "Od3X7u";
    const baseUrl = `https://hotels.cloudbeds.com/reservation/${propertyCode}`;
    const params = new URLSearchParams();

    if (startDate) params.append("start_date", format(startDate, "yyyy-MM-dd"));
    if (endDate) params.append("end_date", format(endDate, "yyyy-MM-dd"));
    if (selectedApartment) params.append("room_id", selectedApartment.id);
    if (adults) params.append("adults", adults);
    if (children) params.append("children", children);

    params.append("lang", "en");

    return `${baseUrl}?${params.toString()}`;
  };

  const handleBookNow = () => {
    const url = buildCloudbedsUrl();
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <section className="relative py-16 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Book Your Stay
              </h1>
              <p className="text-muted-foreground text-lg">
                Complete your reservation in a few simple steps.
              </p>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        <section className="container py-8">
          <div className="relative animate-fade-in [animation-delay:200ms]">
            <BookingStepper currentStep={currentStep} />
          </div>
          
          {currentStep === 1 && (
            <div className="animate-fade-in [animation-delay:300ms]">
              <div className="max-w-4xl mx-auto">
                <BookingDatesGuestsForm
                  startDate={startDate}
                  endDate={endDate}
                  adults={adults}
                  children={children}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  setAdults={setAdults}
                  setChildren={setChildren}
                />
                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading apartments...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">Error loading apartments. Please try again later.</p>
                  </div>
                ) : (
                  <BookingApartmentList
                    apartments={apartments || []}
                    selectedApartment={selectedApartment}
                    setSelectedApartment={setSelectedApartment}
                  />
                )}
                <div className="flex justify-end mt-8">
                  <Button
                    className="btn-primary"
                    disabled={!selectedApartment}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="animate-fade-in [animation-delay:300ms]">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
                    <BookingGuestForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleSelectChange={handleSelectChange}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                    <BookingSummarySidebar
                      selectedApartment={selectedApartment}
                      startDate={startDate}
                      endDate={endDate}
                      adults={adults}
                      children={children}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button className="btn-primary" onClick={() => setCurrentStep(3)}>
                    Review & Confirm <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="animate-fade-in [animation-delay:300ms]">
              <BookingReview
                selectedApartment={selectedApartment}
                startDate={startDate}
                endDate={endDate}
                adults={adults}
                children={children}
                formData={formData}
                isBookingConfirmed={isBookingConfirmed}
                onBack={() => setCurrentStep(2)}
                onBookNow={handleBookNow}
              />
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
