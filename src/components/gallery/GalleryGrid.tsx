
import React from "react";

interface ImageType {
  id: number;
  src: string;
  alt: string;
  category: string;
}
interface GalleryGridProps {
  images: ImageType[];
  onImageClick: (id: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {images.map((image, index) => (
      <div
        key={image.id}
        className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
        onClick={() => onImageClick(image.id)}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white">{image.alt}</p>
        </div>
      </div>
    ))}
  </div>
);

export default GalleryGrid;
