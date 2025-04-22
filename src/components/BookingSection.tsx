
import { ArrowRight } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BookingSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="text-sm text-primary font-medium uppercase tracking-wider">
              {t.home.booking.subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              {t.home.booking.title}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t.home.booking.description}
            </p>
            <ul className="space-y-3 mb-8">
              {t.home.booking.benefits.map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <BookingForm />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
        <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
      </div>
    </section>
  );
}
