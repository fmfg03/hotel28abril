
import React from "react";
import { GalleryImage } from "@/hooks/useGalleryImages";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (id: string) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group animate-fade-in bg-gray-200"
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={() => onImageClick(image.id)}
        >
          <img
            src={image.image_url}
            alt={image.alt_text || ""}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onLoad={() => {
              console.log('Image loaded successfully:', image.image_url);
            }}
            onError={(e) => {
              console.error('Failed to load image:', image.image_url);
              e.currentTarget.style.border = '2px solid red';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-sm">{image.alt_text || ""}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
