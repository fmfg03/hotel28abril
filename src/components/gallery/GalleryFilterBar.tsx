
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
          {category === "all"
            ? t.gallery.filters.all
            : category === "exterior"
            ? t.gallery.filters.exterior
            : category === "rooms"
            ? t.gallery.filters.rooms
            : t.gallery.filters.amenities}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilterBar;
