
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WelcomeSection() {
  const { t } = useLanguage();
  
  return (
    <section id="welcome" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in [animation-delay:100ms]">
            <span className="text-sm text-primary font-medium uppercase tracking-wider">
              {t.welcome.subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              {t.welcome.title}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t.welcome.description1}
            </p>
            <p className="text-muted-foreground mb-8">
              {t.welcome.description2}
            </p>
            <Button asChild className="btn-primary">
              <Link to="/about">
                {t.welcome.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="relative animate-fade-in [animation-delay:300ms] object-fill">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="/lovable-uploads/bravofromh_20-p-800.webp" alt="woman reding by Hotel 28 pool" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
              <img alt="cofee table by Hotel 28 sun deck" src="/lovable-uploads/cofeebythepool.webp" className="w-full h-full object-fill" />
            </div>
            <div className="absolute -top-6 -left-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
              <img alt="foot with tatto by Hotel 28 pool" src="/lovable-uploads/feetbythepool.webp" className="w-full h-full object-fill" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
