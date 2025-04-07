import { createClient } from "@supabase/supabase-js";

export default function useSupabase() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  return supabase;
}
