
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAmenityImages } from "@/hooks/useAmenityImages";
import { amenitiesData } from "@/data/amenitiesData";
import { getAmenityIcon } from "@/utils/amenityIcons";
import AmenitiesHero from "@/components/amenities/AmenitiesHero";
import AmenitiesDescription from "@/components/amenities/AmenitiesDescription";
import AmenityCategory from "@/components/amenities/AmenityCategory";
import AmenitiesGallery from "@/components/amenities/AmenitiesGallery";

export default function Amenities() {
  const { images, isLoading, error } = useAmenityImages(8);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <AmenitiesHero 
          title={amenitiesData.title}
          subtitle={amenitiesData.subtitle}
        />
        
        {/* Description Section */}
        <AmenitiesDescription description={amenitiesData.description} />
        
        {/* Categories Sections */}
        {Object.keys(amenitiesData.categories).map((category, categoryIndex) => {
          const categoryData = amenitiesData.categories[category as keyof typeof amenitiesData.categories];
          const isEven = categoryIndex % 2 === 0;
          
          return (
            <AmenityCategory
              key={category}
              categoryName={category}
              categoryData={categoryData}
              getIcon={getAmenityIcon}
              isEven={isEven}
            />
          );
        })}
        
        {/* Gallery Section */}
        <AmenitiesGallery 
          images={images}
          isLoading={isLoading}
          error={error}
        />
      </main>
      
      <Footer />
    </div>
  );
}
