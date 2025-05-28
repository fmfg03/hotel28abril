
import React from "react";
import { X } from "lucide-react";
import { GalleryImage } from "@/hooks/useGalleryImages";

interface GalleryLightboxProps {
  selectedImage: string | null;
  images: GalleryImage[];
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

  const getImageUrl = (url: string) => {
    console.log('Lightbox - Original URL:', url);
    
    // If the URL starts with /lovable-uploads/, we need to use the full domain
    if (url.startsWith('/lovable-uploads/')) {
      const fullUrl = `${window.location.origin}${url}`;
      console.log('Lightbox - Converted URL:', fullUrl);
      return fullUrl;
    }
    
    // If it's already a full URL, use it as is
    if (url.startsWith('http')) {
      console.log('Lightbox - Using full URL:', url);
      return url;
    }
    
    // Fallback: assume it needs the domain
    const fallbackUrl = `${window.location.origin}${url.startsWith('/') ? url : '/' + url}`;
    console.log('Lightbox - Fallback URL:', fallbackUrl);
    return fallbackUrl;
  };
  
  const imageUrl = getImageUrl(image.image_url);
  
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
          src={imageUrl}
          alt={image.alt_text || ""}
          className="max-w-full max-h-[80vh] object-contain"
          onLoad={() => {
            console.log('Lightbox image loaded successfully:', imageUrl);
          }}
          onError={(e) => {
            console.error('Failed to load image in lightbox:', imageUrl);
            console.error('Original URL from database:', image.image_url);
          }}
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
      
      {/* Debug info */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm p-2 rounded">
        <div>Image ID: {image.id}</div>
        <div>Original URL: {image.image_url}</div>
        <div>Processed URL: {imageUrl}</div>
      </div>
    </div>
  );
};

export default GalleryLightbox;
