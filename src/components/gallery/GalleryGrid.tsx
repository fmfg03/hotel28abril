
import React from "react";
import { GalleryImage } from "@/hooks/useGalleryImages";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (id: string) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  const getImageUrl = (url: string) => {
    console.log('Original URL:', url);
    
    // If the URL starts with /lovable-uploads/, we need to use the full domain
    if (url.startsWith('/lovable-uploads/')) {
      const fullUrl = `${window.location.origin}${url}`;
      console.log('Converted URL:', fullUrl);
      return fullUrl;
    }
    
    // If it's already a full URL, use it as is
    if (url.startsWith('http')) {
      console.log('Using full URL:', url);
      return url;
    }
    
    // Fallback: assume it needs the domain
    const fallbackUrl = `${window.location.origin}${url.startsWith('/') ? url : '/' + url}`;
    console.log('Fallback URL:', fallbackUrl);
    return fallbackUrl;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => {
        const imageUrl = getImageUrl(image.image_url);
        
        return (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group animate-fade-in bg-gray-200"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => onImageClick(image.id)}
          >
            <img
              src={imageUrl}
              alt={image.alt_text || ""}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onLoad={() => {
                console.log('Image loaded successfully:', imageUrl);
              }}
              onError={(e) => {
                console.error('Failed to load image:', imageUrl);
                console.error('Original URL from database:', image.image_url);
                // Don't hide the image, let it show the broken image icon so we can debug
                e.currentTarget.style.border = '2px solid red';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm">{image.alt_text || ""}</p>
            </div>
            {/* Debug info overlay */}
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs p-1 rounded opacity-50">
              ID: {image.id.substring(0, 8)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryGrid;
