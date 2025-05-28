
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X } from "lucide-react";

interface EditFormData {
  imageType: string;
  altText: string;
}

interface ImageEditFormProps {
  image: any;
  editForm: EditFormData;
  onFormChange: (form: EditFormData) => void;
  onSave: (imageId: string) => void;
  onCancel: () => void;
}

export default function ImageEditForm({ 
  image, 
  editForm, 
  onFormChange, 
  onSave, 
  onCancel 
}: ImageEditFormProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <img 
          src={image.image_url} 
          alt={image.alt_text || ""} 
          className="w-16 h-16 object-cover rounded"
          onError={(e) => {
            console.error('Failed to load image:', image.image_url);
            e.currentTarget.style.border = '2px solid red';
          }}
        />
        <div className="flex-1 space-y-2">
          <div>
            <Label htmlFor="edit-image-type">Image Type</Label>
            <Select 
              value={editForm.imageType} 
              onValueChange={(value) => onFormChange({...editForm, imageType: value})}
            >
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
              onChange={(e) => onFormChange({...editForm, altText: e.target.value})}
              placeholder="Describe the image"
              className="mt-1"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => onSave(image.id)}
        >
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
