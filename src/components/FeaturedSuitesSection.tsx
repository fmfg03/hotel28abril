
import SuiteCard from "@/components/SuiteCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuites } from "@/hooks/useSuites";

export default function FeaturedSuitesSection() {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  
  // Use the hook to get suites data
  const { data: suites = [], isLoading } = useSuites();
  
  // Only display the first 3 suites
  const featuredSuites = suites.slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            {t.featuredSuites.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {t.featuredSuites.title}
          </h2>
          <p className="text-muted-foreground">
            {t.featuredSuites.description}
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="animate-pulse">
                <Skeleton className="h-64 w-full rounded-t-xl" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSuites.map((suite, index) => (
              <div key={suite.id} className="animate-fade-in" style={{
                animationDelay: `${(index + 1) * 100}ms`
              }}>
                <SuiteCard suite={suite} />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button asChild className="btn-primary">
            <Link to="/suites">
              {t.featuredSuites.viewAll} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
