
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, RefreshCw } from "lucide-react";

const CleanupTool: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [orphanedFiles, setOrphanedFiles] = useState<string[]>([]);

  const scanForOrphanedFiles = async () => {
    setIsScanning(true);
    try {
      // Get all files from storage
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from('hotel28gallery')
        .list();

      if (storageError) {
        throw storageError;
      }

      if (!storageFiles || storageFiles.length === 0) {
        toast.info("No files found in storage");
        setOrphanedFiles([]);
        return;
      }

      // Get all image URLs from database
      const { data: dbImages, error: dbError } = await supabase
        .from('gallery_images')
        .select('image_url');

      if (dbError) {
        throw dbError;
      }

      // Extract filenames from database URLs
      const dbFilenames = new Set();
      if (dbImages) {
        dbImages.forEach(img => {
          const urlParts = img.image_url.split('/');
          const filename = urlParts[urlParts.length - 1];
          dbFilenames.add(filename);
        });
      }

      // Find orphaned files (exist in storage but not in database)
      const orphaned = storageFiles
        .filter(file => !dbFilenames.has(file.name))
        .map(file => file.name);

      setOrphanedFiles(orphaned);
      
      if (orphaned.length === 0) {
        toast.success("No orphaned files found - all storage files are properly registered!");
      } else {
        toast.info(`Found ${orphaned.length} orphaned files`);
      }
    } catch (error) {
      console.error('Error scanning for orphaned files:', error);
      toast.error("Failed to scan for orphaned files");
    } finally {
      setIsScanning(false);
    }
  };

  const cleanupOrphanedFiles = async () => {
    if (orphanedFiles.length === 0) {
      toast.info("No orphaned files to clean up");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${orphanedFiles.length} orphaned files? This action cannot be undone.`)) {
      return;
    }

    setIsCleaning(true);
    try {
      const { error } = await supabase.storage
        .from('hotel28gallery')
        .remove(orphanedFiles);

      if (error) {
        throw error;
      }

      toast.success(`Successfully deleted ${orphanedFiles.length} orphaned files`);
      setOrphanedFiles([]);
    } catch (error) {
      console.error('Error cleaning up orphaned files:', error);
      toast.error("Failed to clean up orphaned files");
    } finally {
      setIsCleaning(false);
    }
  };

  return (
    <div className="space-y-4 p-6 border rounded-lg bg-orange-50 border-orange-200">
      <h3 className="text-lg font-semibold">Storage Cleanup Tool</h3>
      <p className="text-sm text-muted-foreground">
        Scan for and remove images that exist in storage but aren't registered in the gallery database.
      </p>
      
      <div className="flex gap-2">
        <Button 
          onClick={scanForOrphanedFiles} 
          disabled={isScanning || isCleaning}
          variant="outline"
          className="flex-1"
        >
          {isScanning ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Scan for Orphaned Files
            </>
          )}
        </Button>

        {orphanedFiles.length > 0 && (
          <Button 
            onClick={cleanupOrphanedFiles} 
            disabled={isScanning || isCleaning}
            variant="destructive"
            className="flex-1"
          >
            {isCleaning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete {orphanedFiles.length} Orphaned Files
              </>
            )}
          </Button>
        )}
      </div>

      {orphanedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Orphaned Files Found:</h4>
          <div className="max-h-32 overflow-y-auto bg-white p-2 rounded border">
            {orphanedFiles.map((filename, index) => (
              <div key={index} className="text-xs text-gray-600 py-1">
                {filename}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CleanupTool;
