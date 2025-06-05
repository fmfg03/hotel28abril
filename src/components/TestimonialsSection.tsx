
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { testimonials } from "./TestimonialsSection/data";
import TestimonialCard from "./TestimonialsSection/TestimonialCard";
import TestimonialControls from "./TestimonialsSection/TestimonialControls";

export default function TestimonialsSection() {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const selectTestimonial = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="section bg-muted py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-muted-foreground">
            {t.testimonials.description}
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[300px]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={activeIndex === index}
                language={language}
              />
            ))}
          </div>
          
          <TestimonialControls
            activeIndex={activeIndex}
            totalTestimonials={testimonials.length}
            isAnimating={isAnimating}
            onPrev={prevTestimonial}
            onNext={nextTestimonial}
            onSelect={selectTestimonial}
          />
        </div>
      </div>
    </section>
  );
}
