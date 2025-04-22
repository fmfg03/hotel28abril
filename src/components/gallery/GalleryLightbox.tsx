
import React from "react";
import { X } from "lucide-react";

interface ImageType {
  id: number;
  src: string;
  alt: string;
  category: string;
}
interface GalleryLightboxProps {
  selectedImage: number | null;
  images: ImageType[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  selectedImage,
  images,
  onClose,
  onPrev,
  onNext,
}) => {
  const image = images.find((img) => img.id === selectedImage);
  if (!image) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
      <button
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-4 rounded-full hover:bg-white/10 transition-colors"
        onClick={onPrev}
      >
        <span className="sr-only">Previous</span>
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="max-w-5xl max-h-[80vh] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[80vh] object-contain"
        />
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-4 rounded-full hover:bg-white/10 transition-colors"
        onClick={onNext}
      >
        <span className="sr-only">Next</span>
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default GalleryLightbox;
