import { createClient } from '@supabase/supabase-js';

// URL y clave pública de tu proyecto Supabase desde las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Crear el cliente de Supabase con persistencia de sesión habilitada
export const supabase = createClient(
  supabaseUrl as string,
  supabaseKey as string,
  {
    auth: {
      persistSession: true, // Permite que la sesión se guarde automáticamente
      storage: localStorage, // Cambia a sessionStorage si prefieres sesiones temporales
    },
  }
);

// Escuchar cambios en el estado de autenticación (opcional)
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Cambio en el estado de autenticación:", event);
  if (session) {
    console.log("Sesión activa:", session);
    // Aquí puedes guardar la sesión en tu estado global si es necesario
  } else {
    console.log("No hay sesión activa o el usuario cerró sesión.");
    // Aquí puedes realizar acciones como redirigir al login
  }
});
