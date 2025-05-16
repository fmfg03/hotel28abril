
import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { useLocation } from "react-router-dom";
import { SuiteProps } from "@/utils/calculateRoomSelection";

export default function useBookingState() {
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
  
  // Get location to parse URL parameters
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    
    // Set dates from URL parameters if present
    const startParam = params.get('startDate');
    const endParam = params.get('endDate');
    const adultsParam = params.get('adults');
    const childrenParam = params.get('children');
    
    if (startParam) {
      try {
        setStartDate(new Date(startParam));
      } catch (e) {
        console.error("Invalid start date:", e);
      }
    }
    
    if (endParam) {
      try {
        setEndDate(new Date(endParam));
      } catch (e) {
        console.error("Invalid end date:", e);
      }
    }
    
    if (adultsParam) {
      setAdults(adultsParam);
    }
    
    if (childrenParam) {
      setChildren(childrenParam);
    }
  }, [location.search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
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

  return {
    startDate, 
    setStartDate,
    endDate, 
    setEndDate,
    adults, 
    setAdults,
    children, 
    setChildren,
    selectedSuite, 
    setSelectedSuite,
    currentStep, 
    setCurrentStep,
    formData,
    isBookingConfirmed, 
    setIsBookingConfirmed,
    handleInputChange,
    handleSelectChange,
    resetBooking
  };
}
