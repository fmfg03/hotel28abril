
import { Star } from "lucide-react";
import { Testimonial } from "./types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  language: string;
}

export default function TestimonialCard({ testimonial, isActive, language }: TestimonialCardProps) {
  const content = language === 'es' && testimonial.content_es ? testimonial.content_es : testimonial.content;

  return (
    <div className={`
      absolute inset-0 glass-card p-8 md:p-10 transition-all duration-500
      ${isActive ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-full z-0"}
    `}>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="flex flex-col items-center md:items-start">
          <div className="rounded-full overflow-hidden w-20 h-20 mb-4 border-2 border-primary">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} 
              />
            ))}
          </div>
          <h4 className="text-lg font-semibold text-center md:text-left">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground text-center md:text-left">{testimonial.location}</p>
        </div>
        
        <div className="flex-1 flex items-center">
          <blockquote className="italic text-muted-foreground">
            "{content}"
          </blockquote>
        </div>
      </div>
    </div>
  );
}
