
import React, { useState } from "react";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import GalleryImageUpload from "@/components/gallery/GalleryImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Edit, Save, X } from "lucide-react";

export default function GalleryAdmin() {
  const { images, isLoading, error } = useGalleryImages();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    imageType: "",
    altText: ""
  });

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

  const handleEditStart = (image: any) => {
    setEditingId(image.id);
    setEditForm({
      imageType: image.image_type,
      altText: image.alt_text || ""
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({ imageType: "", altText: "" });
  };

  const handleEditSave = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({
          image_type: editForm.imageType,
          alt_text: editForm.altText || null
        })
        .eq('id', imageId);

      if (error) {
        throw error;
      }

      toast.success("Image updated successfully!");
      setEditingId(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating image:', error);
      toast.error("Failed to update image");
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
              <div key={image.id} className="p-3 border rounded">
                {editingId === image.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <img 
                        src={image.image_url} 
                        alt={image.alt_text || ""} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 space-y-2">
                        <div>
                          <Label htmlFor="edit-image-type">Image Type</Label>
                          <Select value={editForm.imageType} onValueChange={(value) => setEditForm({...editForm, imageType: value})}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select image type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Exterior">Exterior</SelectItem>
                              <SelectItem value="Rooms">Rooms</SelectItem>
                              <SelectItem value="Amenities">Amenities</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-alt-text">Alt Text</Label>
                          <Input
                            id="edit-alt-text"
                            value={editForm.altText}
                            onChange={(e) => setEditForm({...editForm, altText: e.target.value})}
                            placeholder="Describe the image"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditSave(image.id)}
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditCancel}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <img 
                      src={image.image_url} 
                      alt={image.alt_text || ""} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{image.image_type}</p>
                      <p className="text-sm text-gray-600">{image.alt_text || "No description"}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditStart(image)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id, image.image_url)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
