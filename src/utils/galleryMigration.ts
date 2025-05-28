
import { supabase } from "@/integrations/supabase/client";

export async function migrateExistingImages() {
  try {
    // List all files in the hotel28gallery bucket
    const { data: files, error: listError } = await supabase.storage
      .from('hotel28gallery')
      .list('');

    if (listError) {
      console.error('Error listing files:', listError);
      return;
    }

    if (!files || files.length === 0) {
      console.log('No files found in bucket');
      return;
    }

    // Check which images are already in the database
    const { data: existingImages, error: dbError } = await supabase
      .from('gallery_images')
      .select('image_url');

    if (dbError) {
      console.error('Error fetching existing images:', dbError);
      return;
    }

    const existingUrls = new Set(existingImages?.map(img => img.image_url) || []);

    // For each file, create a gallery_images entry if it doesn't exist
    for (const file of files) {
      if (file.name === '.emptyFolderPlaceholder') continue;

      const { data } = supabase.storage
        .from('hotel28gallery')
        .getPublicUrl(file.name);

      const publicUrl = data.publicUrl;

      // Skip if this URL already exists in the database
      if (existingUrls.has(publicUrl)) {
        console.log(`Image already exists in database: ${file.name}`);
        continue;
      }

      // Determine image type based on filename or default to 'Rooms'
      let imageType = 'Rooms';
      const fileName = file.name.toLowerCase();
      if (fileName.includes('exterior') || fileName.includes('outside')) {
        imageType = 'Exterior';
      } else if (fileName.includes('amenity') || fileName.includes('pool') || fileName.includes('gym')) {
        imageType = 'Amenities';
      }

      // Insert into gallery_images table
      const { error: insertError } = await supabase
        .from('gallery_images')
        .insert({
          image_url: publicUrl,
          image_type: imageType,
          alt_text: `Hotel 28 ${imageType.toLowerCase()} image`,
        });

      if (insertError) {
        console.error(`Error inserting image ${file.name}:`, insertError);
      } else {
        console.log(`Successfully added image: ${file.name}`);
      }
    }

    console.log('Migration completed!');
  } catch (error) {
    console.error('Migration error:', error);
  }
}
