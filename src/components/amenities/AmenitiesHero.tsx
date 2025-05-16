
import { useLanguage } from "@/contexts/LanguageContext";

type AmenitiesHeroProps = {
  title: string;
  subtitle: string;
};

export default function AmenitiesHero({ title, subtitle }: AmenitiesHeroProps) {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background">
      <div className="container relative z-10 pt-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            Hotel 28 Cancun
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {subtitle}
          </p>
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
