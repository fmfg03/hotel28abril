
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ImageListItemProps {
  image: any;
  onEdit: (image: any) => void;
  onDelete: (imageId: string, imageUrl: string) => void;
}

export default function ImageListItem({ image, onEdit, onDelete }: ImageListItemProps) {
  return (
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
      <div className="flex-1">
        <p className="font-medium">{image.image_type}</p>
        <p className="text-sm text-gray-600">{image.alt_text || "No description"}</p>
        <p className="text-xs text-gray-400 truncate">{image.image_url}</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(image)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(image.id, image.image_url)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
