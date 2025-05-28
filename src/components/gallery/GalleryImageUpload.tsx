
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useImageUpload } from "@/hooks/useImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GalleryImageUploadProps {
  onImageUploaded?: () => void;
}

const GalleryImageUpload: React.FC<GalleryImageUploadProps> = ({ onImageUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageType, setImageType] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const { uploadImage, uploading } = useImageUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !imageType) {
      toast.error("Please select a file and image type");
      return;
    }

    const imageUrl = await uploadImage(file);
    
    if (imageUrl) {
      // Save to database
      const { error } = await supabase
        .from('gallery_images')
        .insert({
          image_url: imageUrl,
          image_type: imageType,
          alt_text: altText || null,
        });

      if (error) {
        console.error('Error saving image to database:', error);
        toast.error("Failed to save image to database");
      } else {
        toast.success("Image uploaded successfully!");
        setFile(null);
        setImageType("");
        setAltText("");
        if (onImageUploaded) {
          onImageUploaded();
        }
      }
    } else {
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="space-y-4 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold">Upload Gallery Image</h3>
      
      <div>
        <Label htmlFor="image-file">Select Image</Label>
        <Input
          id="image-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="image-type">Image Type</Label>
        <Select value={imageType} onValueChange={setImageType}>
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
        <Label htmlFor="alt-text">Alt Text (Optional)</Label>
        <Input
          id="alt-text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Describe the image"
          className="mt-1"
        />
      </div>

      <Button 
        onClick={handleUpload} 
        disabled={uploading || !file || !imageType}
        className="w-full"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  );
};

export default GalleryImageUpload;
