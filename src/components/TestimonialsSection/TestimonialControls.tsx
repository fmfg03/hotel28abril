
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialControlsProps {
  activeIndex: number;
  totalTestimonials: number;
  isAnimating: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export default function TestimonialControls({
  activeIndex,
  totalTestimonials,
  isAnimating,
  onPrev,
  onNext,
  onSelect
}: TestimonialControlsProps) {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrev}
        className="p-2 rounded-full bg-card hover:bg-muted border border-border transition-colors"
        disabled={isAnimating}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous testimonial</span>
      </button>
      
      <div className="flex space-x-2">
        {Array.from({ length: totalTestimonials }, (_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === index 
                ? "bg-primary w-6" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
      
      <button
        onClick={onNext}
        className="p-2 rounded-full bg-card hover:bg-muted border border-border transition-colors"
        disabled={isAnimating}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next testimonial</span>
      </button>
    </div>
  );
}
