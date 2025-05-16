
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Waves, 
  Spa, 
  Yoga, 
  Utensils, 
  Coffee, 
  Clock, 
  Plane, 
  Car, 
  MapPin, 
  Music, 
  Bed, 
  BookOpen, 
  Bell, 
  Wheelchair
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Amenities() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Helper function to get the appropriate icon for each amenity
  const getIcon = (categoryName: string, index: number) => {
    const icons = {
      wellness: [<Waves key={0} />, <Spa key={1} />, <Yoga key={2} />],
      dining: [<Utensils key={0} />, <Coffee key={1} />, <Clock key={2} />, <MapPin key={3} />],
      mobility: [<Plane key={0} />, <Car key={1} />, <MapPin key={2} />],
      entertainment: [<Music key={0} />, <Waves key={1} />, <BookOpen key={2} />],
      assistance: [<Bell key={0} />, <Wheelchair key={1} />]
    };
    
    return icons[categoryName as keyof typeof icons]?.[index] || <Coffee />;
  };

  // Define the amenities data structure
  const amenitiesData = {
    title: "Hotel 28 Cancún – Amenities & Services",
    subtitle: "Experience a stay designed for comfort, flexibility, and practicality",
    description: "At Hotel 28, we combine essential comforts with curated experiences to help you get the most out of your time in Cancún.",
    categories: {
      wellness: {
        title: "Wellness & Relaxation",
        description: "Rejuvenate and refresh during your stay",
        items: [
          {
            title: "Outdoor Swimming Pool",
            description: "Refresh your day in our pool — perfect for sunbathing or cooling off."
          },
          {
            title: "Spa & Massage (by appointment)",
            description: "Book in-room massage sessions or let us connect you with trusted spa partners nearby."
          },
          {
            title: "Yoga Classes (upon availability)",
            description: "Ask our team for available yoga or meditation sessions with certified instructors near the hotel."
          }
        ]
      },
      dining: {
        title: "Dining & Bar",
        description: "Savor exceptional culinary experiences",
        items: [
          {
            title: "On-Site Bar",
            description: "Enjoy drinks, cocktails, and snacks at our main bar located by the pool."
          },
          {
            title: "Breakfast Service (upon request)",
            description: "Continental breakfast available in your room or in common areas. Light local options available."
          },
          {
            title: "Limited Room Service",
            description: "Ask about our in-room food and beverage options during the day."
          },
          {
            title: "Local Dining Recommendations",
            description: "We'll guide you to the best local restaurants handpicked by the Hotel 28 team."
          }
        ]
      },
      mobility: {
        title: "Mobility & Convenience",
        description: "Get around Cancún with ease",
        items: [
          {
            title: "Airport Transfers",
            description: "Private and reliable transportation to and from Cancún International Airport (advance booking required)."
          },
          {
            title: "Car Rental (external provider)",
            description: "Let us help you coordinate a rental with trusted local agencies — easy and safe."
          },
          {
            title: "City Tours & Experiences",
            description: "From Mayan ruins to cenotes and islands — we arrange excursions with certified tour operators."
          }
        ]
      },
      entertainment: {
        title: "Entertainment & Activities",
        description: "Enjoy various entertainment options",
        items: [
          {
            title: "Local Events",
            description: "Ask our team about live music, art exhibits, and nightlife options around the city."
          },
          {
            title: "Water Sports (partner agency)",
            description: "Snorkeling, paddleboarding, scuba diving or private tours — we'll set you up with the right provider."
          },
          {
            title: "Reading & Lounge Area",
            description: "Quiet space with books, magazines, and Wi-Fi to unwind or get some work done."
          }
        ]
      },
      assistance: {
        title: "Personalized Assistance",
        description: "We're here to help make your stay perfect",
        items: [
          {
            title: "24/7 Front Desk Support",
            description: "We're here to assist you anytime, before and during your stay."
          },
          {
            title: "Concierge (digital & in-person)",
            description: "Need recommendations or bookings? Our team is ready to help you with anything you need."
          }
        ]
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background">
          <div className="container relative z-10 pt-20">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Hotel 28 Cancun
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                {amenitiesData.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {amenitiesData.subtitle}
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Description Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                {amenitiesData.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Categories Sections */}
        {Object.keys(amenitiesData.categories).map((category, categoryIndex) => {
          const categoryData = amenitiesData.categories[category as keyof typeof amenitiesData.categories];
          const isEven = categoryIndex % 2 === 0;
          
          return (
            <section key={category} className={`py-16 ${isEven ? 'bg-card' : ''}`}>
              <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                    {category === 'wellness' && <span className="text-primary">🧘‍♂️</span>}
                    {category === 'dining' && <span className="text-primary">🍽️</span>}
                    {category === 'mobility' && <span className="text-primary">🚗</span>}
                    {category === 'entertainment' && <span className="text-primary">🎉</span>}
                    {category === 'assistance' && <span className="text-primary">🛎️</span>}
                    {categoryData.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {categoryData.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryData.items.map((item, index) => (
                    <div 
                      key={index} 
                      className="glass-card p-6 rounded-xl flex flex-col items-center text-center animate-fade-in"
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                        {getIcon(category, index)}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
        
        {/* Gallery Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <span className="text-primary">📷</span> Photo Gallery
              </h2>
              <p className="text-muted-foreground">
                Explore our rooms, suites, and shared spaces through real images of Hotel 28.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
                >
                  <img 
                    src={`https://images.unsplash.com/photo-${1550000000000 + index * 100000}?w=400&h=400&fit=crop`}
                    alt={`Amenity ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button asChild variant="heroSolid" size="lg">
                <Link to="/gallery">View Full Gallery</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
