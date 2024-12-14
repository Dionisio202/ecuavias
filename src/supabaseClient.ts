import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  typeof process !== 'undefined' && process.env.VITE_SUPABASE_URL
    ? process.env.VITE_SUPABASE_URL
    : import.meta.env.VITE_SUPABASE_URL;

const supabaseKey =
  typeof process !== 'undefined' && process.env.VITE_SUPABASE_KEY
    ? process.env.VITE_SUPABASE_KEY
    : import.meta.env.VITE_SUPABASE_KEY;

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storage: localStorage,
  },
});

