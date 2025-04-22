
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <section className="relative h-screen overflow-hidden bg-[#0f1217]">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/public/lovable-uploads/herohotel28.webp')`,
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Content */}
      <div
        className="relative h-full flex flex-col justify-center items-center text-center px-4"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="max-w-4xl animate-fade-in flex flex-col items-center">
          <span className="inline-block text-white/90 text-sm uppercase tracking-widest mb-4 font-medium">
            DOWNTOWN CANCÚN HOTEL
          </span>
          <div className="w-32 h-0.5 bg-primary mb-6 mt-1"></div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Experience Hotel 28<br />Cancún
          </h1>
          
          <p className="text-lg text-white/90 mb-12 max-w-3xl mx-auto">
            Discover our exclusive two-bedroom suites in downtown Cancún, offering unparalleled
            comfort, exceptional cleanliness, and the perfect location for exploring the city.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="heroSolid" className="min-w-[200px] rounded-md bg-[#0d78f1] hover:bg-[#0d6de0]">
              <Link to="/booking">Book Your Stay</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px] rounded-md border-white/20 bg-transparent text-white hover:bg-white/10">
              <Link to="/apartments">Explore Our Suites</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <svg 
          className="w-full text-background dark:text-background"
          viewBox="0 0 1440 170" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,128L60,117.3C120,107,240,85,360,90.7C480,96,600,128,720,133.3C840,139,960,117,1080,101.3C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
