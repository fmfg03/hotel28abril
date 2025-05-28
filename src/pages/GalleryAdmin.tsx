
import React from "react";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import GalleryImageUpload from "@/components/gallery/GalleryImageUpload";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function GalleryAdmin() {
  const { images, isLoading, error } = useGalleryImages();

  const handleImageUploaded = () => {
    // Refresh the page to show new images
    window.location.reload();
  };

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      // Delete from database
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageId);

      if (error) {
        throw error;
      }

      // Also try to delete from storage (extract filename from URL)
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      await supabase.storage
        .from('gallery-images')
        .remove([fileName]);

      toast.success("Image deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error("Failed to delete image");
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Gallery Administration</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <GalleryImageUpload onImageUploaded={handleImageUploaded} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Images ({images.length})</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {images.map((image) => (
              <div key={image.id} className="flex items-center gap-4 p-3 border rounded">
                <img 
                  src={image.image_url} 
                  alt={image.alt_text || ""} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{image.image_type}</p>
                  <p className="text-sm text-gray-600">{image.alt_text || "No description"}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteImage(image.id, image.image_url)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
