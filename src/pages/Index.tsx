import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WelcomeSection from "@/components/WelcomeSection";
import BookingSection from "@/components/BookingSection";
import FeaturedSuitesSection from "@/components/FeaturedSuitesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { SuiteProps } from "@/utils/calculateRoomSelection";

// Sample suites data
const featuredSuites: SuiteProps[] = [{
  id: "1",
  name: "Deluxe Sea View Suite",
  description: "Luxurious suite with panoramic sea views, modern amenities, and a private balcony.",
  price: 180,
  capacity: 2,
  size: 45,
  image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
  location: "Beachfront",
  features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Balcony"]
}, {
  id: "2",
  name: "Premium Family Suite",
  description: "Spacious suite ideal for families, with full kitchen and stunning coastal views.",
  price: 250,
  capacity: 4,
  size: 75,
  image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  location: "Second row",
  features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Washing Machine"]
}, {
  id: "3",
  name: "Executive Beach Studio",
  description: "Elegant studio with direct beach access, modern design, and premium finishes.",
  price: 150,
  capacity: 2,
  size: 35,
  image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
  location: "Beachfront",
  features: ["Wi-Fi", "Kitchenette", "Bathroom", "Air Conditioning", "TV"]
}];

export default function Index() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        {/* Welcome Section */}
        <WelcomeSection />
        {/* Booking Form Section */}
        <BookingSection />
        {/* Featured Suites */}
        <FeaturedSuitesSection />
        {/* Testimonials Section */}
        <TestimonialsSection />
        {/* Features/Amenities Section */}
        <AmenitiesSection />
        {/* CTA Section */}
        <section className="relative py-24 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t.home.cta.title}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.home.cta.description}
              </p>
              <Button asChild size="lg" className="btn-primary">
                <Link to="/booking">{t.home.cta.bookNow}</Link>
              </Button>
            </div>
          </div>
          {/* Decorative waves */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
            <svg className="absolute bottom-0 w-full h-24 fill-background" preserveAspectRatio="none" viewBox="0 0 1440 74" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z" className="animate-wave opacity-50" />
              <path d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z" className="animate-wave opacity-100 [animation-delay:-4s]" />
            </svg>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
