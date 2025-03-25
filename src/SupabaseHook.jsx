import { useState, useEffect } from "react";
import { useSession } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";

export function useSupabase() {
  const { session } = useSession();
  const [supabase] = useState(() => {
    return createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY,
      {
        global: {
          // Get the custom Supabase token from Clerk
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase",
            });

            // Insert the Clerk Supabase token into the headers
            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            // Now call the default fetch
            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  });
  useEffect(() => {
    const updateAuthToken = async () => {
      const clerkToken = await session?.getToken({ template: "supabase" });

      if (clerkToken) {
        // supabase.auth.setAuth(clerkToken);
      }
    };

    if (session) updateAuthToken();
  }, [session]);
  return supabase;
}
