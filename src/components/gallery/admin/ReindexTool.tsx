
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

const ReindexTool: React.FC = () => {
  const [isReindexing, setIsReindexing] = useState(false);

  const handleReindex = async () => {
    setIsReindexing(true);
    
    try {
      // Get all gallery images ordered by created_at (oldest first)
      const { data: images, error: fetchError } = await supabase
        .from('gallery_images')
        .select('id, created_at')
        .order('created_at', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      if (!images || images.length === 0) {
        toast.info("No images found to reindex");
        return;
      }

      // Update each image with a new sequential order_index
      const updatePromises = images.map((image, index) => 
        supabase
          .from('gallery_images')
          .update({ order_index: index + 1 })
          .eq('id', image.id)
      );

      const results = await Promise.all(updatePromises);
      
      // Check if any updates failed
      const failedUpdates = results.filter(result => result.error);
      if (failedUpdates.length > 0) {
        console.error('Some updates failed:', failedUpdates);
        toast.error(`Failed to update ${failedUpdates.length} images`);
        return;
      }

      toast.success(`Successfully reindexed ${images.length} images`);
      
      // Refresh the page to show updated order
      window.location.reload();
    } catch (error) {
      console.error('Error reindexing images:', error);
      toast.error("Failed to reindex images");
    } finally {
      setIsReindexing(false);
    }
  };

  return (
    <div className="space-y-4 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold">Reindex Gallery Images</h3>
      <p className="text-sm text-muted-foreground">
        This will reorder all gallery images sequentially based on their creation date (oldest first).
      </p>
      
      <Button 
        onClick={handleReindex} 
        disabled={isReindexing}
        className="w-full"
        variant="outline"
      >
        {isReindexing ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Reindexing...
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reindex Images
          </>
        )}
      </Button>
    </div>
  );
};

export default ReindexTool;
