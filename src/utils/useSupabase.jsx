import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export function useSupabase() {
  const [supabase] = useState(() => {
    return createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );
  });
  useEffect(() => {
    const updateAuthToken = async () => {
      const clerkToken = await session?.getToken({ template: "supabase" });

      if (clerkToken) {
        // supabase.auth.setAuth(clerkToken);
      }
    };
  }, []);
  return supabase;
}
