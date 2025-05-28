
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { migrateExistingImages } from "@/utils/galleryMigration";

export default function MigrationTool() {
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigrateImages = async () => {
    setIsMigrating(true);
    try {
      await migrateExistingImages();
      toast.success("Images migrated successfully!");
      window.location.reload();
    } catch (error) {
      console.error('Migration error:', error);
      toast.error("Failed to migrate images");
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Migration Tool</h3>
      <p className="text-sm text-gray-600 mb-4">
        If you have uploaded images to the hotel28gallery bucket but they don't appear in the gallery, 
        use this tool to migrate them to the gallery database.
      </p>
      <Button 
        onClick={handleMigrateImages} 
        disabled={isMigrating}
        className="flex items-center gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isMigrating ? 'animate-spin' : ''}`} />
        {isMigrating ? "Migrating..." : "Migrate Existing Images"}
      </Button>
    </div>
  );
}
