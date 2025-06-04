
import { Waves, Coffee, Plane, Umbrella, Bell, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AmenitiesSection() {
  const { t } = useLanguage();

  // Feature items - updated to use the home amenities structure
  const features = [
    {
      icon: <Waves className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.pool.title,
      description: t.home.amenities.features.pool.description
    },
    {
      icon: <Coffee className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.bar.title,
      description: t.home.amenities.features.bar.description
    },
    {
      icon: <Plane className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.transfers.title,
      description: t.home.amenities.features.transfers.description
    },
    {
      icon: <Umbrella className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.beachclub.title,
      description: t.home.amenities.features.beachclub.description
    },
    {
      icon: <Bell className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.concierge.title,
      description: t.home.amenities.features.concierge.description
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.tours.title,
      description: t.home.amenities.features.tours.description
    }
  ];

  return (
    <section className="section bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            {t.home.amenities.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {t.home.amenities.title}
          </h2>
          <p className="text-muted-foreground">
            {t.home.amenities.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-6 rounded-xl animate-fade-in flex flex-col items-center text-center" style={{
              animationDelay: `${(index + 1) * 100}ms`
            }}>
              <div className="mb-4 p-3 rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
