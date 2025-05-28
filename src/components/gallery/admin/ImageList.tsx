
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ImageListItem from "./ImageListItem";
import ImageEditForm from "./ImageEditForm";

interface ImageListProps {
  images: any[];
}

interface EditFormData {
  imageType: string;
  altText: string;
}

export default function ImageList({ images }: ImageListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditFormData>({
    imageType: "",
    altText: ""
  });

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
        .from('hotel28gallery')
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Current Images ({images.length})</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {images.map((image) => (
          <div key={image.id} className="p-3 border rounded">
            {editingId === image.id ? (
              <ImageEditForm
                image={image}
                editForm={editForm}
                onFormChange={setEditForm}
                onSave={handleEditSave}
                onCancel={handleEditCancel}
              />
            ) : (
              <ImageListItem
                image={image}
                onEdit={handleEditStart}
                onDelete={handleDeleteImage}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
