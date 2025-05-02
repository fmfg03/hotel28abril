import { useEffect, useState } from "react";
import { addDays, differenceInDays, format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import BookingStepper from "@/components/BookingStepper";
import { useSuites } from "@/hooks/useSuites";
import BookingStepRoom from "./BookingStepRoom";
import BookingStepGuestForm from "./BookingStepGuestForm";
import BookingStepReview from "./BookingStepReview";

export default function BookingMain() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 7));
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedSuite, setSelectedSuite] = useState<SuiteProps | null>(null);
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

  const { data: suites, isLoading, error } = useSuites();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookNow = () => {
    const propertyCode = "Od3X7u";
    const baseUrl = `https://hotels.cloudbeds.com/reservation/${propertyCode}`;
    const params = new URLSearchParams();

    if (startDate) params.append("start_date", format(startDate, "yyyy-MM-dd"));
    if (endDate) params.append("end_date", format(endDate, "yyyy-MM-dd"));
    if (selectedSuite) params.append("room_id", selectedSuite.id);
    if (adults) params.append("adults", adults);
    if (children) params.append("children", children);

    params.append("lang", "en");
    const url = `${baseUrl}?${params.toString()}`;
    window.open(url, "_blank", "noopener");
  };

  // Booking reset after confirmation.
  const resetBooking = () => {
    setCurrentStep(1);
    setSelectedSuite(null);
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
  };

  return (
    <section>
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
          <BookingStepRoom
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setAdults={setAdults}
            setChildren={setChildren}
            suites={suites || []}
            selectedSuite={selectedSuite}
            setSelectedSuite={setSelectedSuite}
            isLoading={isLoading}
            error={error}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <BookingStepGuestForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            selectedSuite={selectedSuite}
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <BookingStepReview
            selectedSuite={selectedSuite}
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
            formData={formData}
            isBookingConfirmed={isBookingConfirmed}
            setIsBookingConfirmed={setIsBookingConfirmed}
            onBack={() => setCurrentStep(2)}
            onBookNow={handleBookNow}
            onReset={resetBooking}
          />
        )}
      </section>
    </section>
  );
}
