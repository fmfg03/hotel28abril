
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, RefreshCw, AlertTriangle } from "lucide-react";

const CleanupTool: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isCheckingImages, setIsCheckingImages] = useState(false);
  const [orphanedFiles, setOrphanedFiles] = useState<string[]>([]);
  const [brokenImages, setBrokenImages] = useState<string[]>([]);

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

  const checkImageAccessibility = async () => {
    setIsCheckingImages(true);
    setBrokenImages([]);
    
    try {
      const { data: dbImages, error: dbError } = await supabase
        .from('gallery_images')
        .select('image_url, id');

      if (dbError) {
        throw dbError;
      }

      if (!dbImages || dbImages.length === 0) {
        toast.info("No images found in database");
        return;
      }

      const broken: string[] = [];
      
      // Test each image URL
      for (const image of dbImages) {
        try {
          const response = await fetch(image.image_url, { method: 'HEAD' });
          if (!response.ok) {
            broken.push(image.image_url);
          }
        } catch (error) {
          broken.push(image.image_url);
        }
      }

      setBrokenImages(broken);
      
      if (broken.length === 0) {
        toast.success(`All ${dbImages.length} images are accessible!`);
      } else {
        toast.error(`Found ${broken.length} broken image URLs out of ${dbImages.length} total`);
      }
    } catch (error) {
      console.error('Error checking image accessibility:', error);
      toast.error("Failed to check image accessibility");
    } finally {
      setIsCheckingImages(false);
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
      <h3 className="text-lg font-semibold">Storage Cleanup & Diagnostics</h3>
      <p className="text-sm text-muted-foreground">
        Scan for orphaned files and check image accessibility issues.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button 
          onClick={scanForOrphanedFiles} 
          disabled={isScanning || isCleaning || isCheckingImages}
          variant="outline"
          className="w-full"
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

        <Button 
          onClick={checkImageAccessibility} 
          disabled={isScanning || isCleaning || isCheckingImages}
          variant="outline"
          className="w-full"
        >
          {isCheckingImages ? (
            <>
              <AlertTriangle className="h-4 w-4 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Check Image Access
            </>
          )}
        </Button>
      </div>

      {orphanedFiles.length > 0 && (
        <Button 
          onClick={cleanupOrphanedFiles} 
          disabled={isScanning || isCleaning || isCheckingImages}
          variant="destructive"
          className="w-full"
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

      {brokenImages.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2 text-red-600">Broken Image URLs Found:</h4>
          <div className="max-h-32 overflow-y-auto bg-white p-2 rounded border">
            {brokenImages.map((url, index) => (
              <div key={index} className="text-xs text-red-600 py-1 break-all">
                {url}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CleanupTool;
