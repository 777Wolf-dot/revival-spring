import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project credentials
const SUPABASE_URL = "https://ytmhlbdvimnitxesrnyi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0bWhsYmR2aW1uaXR4ZXNybnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTc0MzgsImV4cCI6MjA3NDEzMzQzOH0.2CoHAxf9fO2H__kZe4BlX8Cef-EgVfxhZLQOhO8J42Q";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
