
import { Waves, LifeBuoy, Utensils, Wifi, Coffee, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AmenitiesSection() {
  const { t } = useLanguage();

  // Feature items
  const features = [
    {
      icon: <Waves className="h-8 w-8 text-primary" />,
      title: t.amenities.features.beachfront.title,
      description: t.amenities.features.beachfront.description
    },
    {
      icon: <LifeBuoy className="h-8 w-8 text-primary" />,
      title: t.amenities.features.pools.title,
      description: t.amenities.features.pools.description
    },
    {
      icon: <Utensils className="h-8 w-8 text-primary" />,
      title: t.amenities.features.restaurant.title,
      description: t.amenities.features.restaurant.description
    },
    {
      icon: <Wifi className="h-8 w-8 text-primary" />,
      title: t.amenities.features.wifi.title,
      description: t.amenities.features.wifi.description
    },
    {
      icon: <Coffee className="h-8 w-8 text-primary" />,
      title: t.amenities.features.bar.title,
      description: t.amenities.features.bar.description
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: t.amenities.features.location.title,
      description: t.amenities.features.location.description
    }
  ];

  return (
    <section className="section bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            {t.amenities.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {t.amenities.title}
          </h2>
          <p className="text-muted-foreground">
            {t.amenities.description}
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
