
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactHeader() {
  const { t } = useLanguage();
  return (
    <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.contact.title}
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            {t.contact.subtitle}
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
