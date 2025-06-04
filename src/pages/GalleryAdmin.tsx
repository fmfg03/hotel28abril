
import React from "react";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import GalleryImageUpload from "@/components/gallery/GalleryImageUpload";
import MigrationTool from "@/components/gallery/admin/MigrationTool";
import ReindexTool from "@/components/gallery/admin/ReindexTool";
import ImageList from "@/components/gallery/admin/ImageList";

export default function GalleryAdmin() {
  const { images, isLoading, error } = useGalleryImages();

  const handleImageUploaded = () => {
    // Refresh the page to show new images
    window.location.reload();
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Gallery Administration</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <MigrationTool />
        <ReindexTool />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <GalleryImageUpload onImageUploaded={handleImageUploaded} />
        </div>
        
        <div>
          <ImageList images={images} />
        </div>
      </div>
    </div>
  );
}
