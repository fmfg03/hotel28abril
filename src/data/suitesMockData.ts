
// This file is kept as a fallback but no longer used.
// Data is now fetched directly from Supabase.

import { SuiteProps } from "@/types/Suite";

export const mockSuites: SuiteProps[] = [];

export const mockSuiteImages: {
  id: string;
  suite_id: string;
  image_url: string;
  alt_text: string | null;
  order: number | null;
}[] = [];
