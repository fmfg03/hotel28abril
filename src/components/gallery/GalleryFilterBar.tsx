
import React from "react";
import { cn } from "@/lib/utils";

interface GalleryFilterBarProps {
  filterOptions: string[];
  activeFilter: string;
  onFilter: (category: string) => void;
  t: any;
}

const GalleryFilterBar: React.FC<GalleryFilterBarProps> = ({
  filterOptions,
  activeFilter,
  onFilter,
  t,
}) => {
  const getFilterLabel = (category: string): string => {
    if (category === "all") return t.gallery.filters.all;
    if (category === "exterior") return t.gallery.filters.exterior;
    if (category === "rooms") return t.gallery.filters.rooms;
    if (category === "amenities") return t.gallery.filters.amenities;
    return category; // Return the category itself if no translation exists
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
      {filterOptions.map((category) => (
        <button
          key={category}
          onClick={() => onFilter(category)}
          className={cn(
            "px-6 py-2 rounded-full transition-all",
            activeFilter === category
              ? "bg-primary text-white shadow-lg"
              : "bg-card hover:bg-muted"
          )}
        >
          {getFilterLabel(category)}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilterBar;
