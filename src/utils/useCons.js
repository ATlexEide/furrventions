import { useEffect, useState } from "react";
import { useSession } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
function useSupabase() {
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
              template: "supabase"
            });

            // Insert the Clerk Supabase token into the headers
            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            // Now call the default fetch
            return fetch(url, {
              ...options,
              headers
            });
          }
        }
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

function useFetchCons() {
  console.log("Fetching cons");
  const supabase = useSupabase();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    localStorage.getItem("conventions")
      ? JSON.parse(localStorage.getItem("conventions"))
      : null
  );
  async function fetch() {
    const { data, err } = await supabase.from("conventions").select();
    if (err) throw new Error(err);
    localStorage.setItem("conventions", JSON.stringify(data));
    setData(data);
    setLoading(false);
  }
  useEffect(() => {
    if (data) return;
    fetch();
  }, []);
  return [data, loading];
}

export function useConsArray() {
  const [data, loading] = useFetchCons();
  const [consArray, setConsArray] = useState(data);
  useEffect(() => {
    if (!data) return;
    setConsArray(data);
  }, [data]);
  return [consArray, loading];
}

export function useConsObject() {
  const [data, loading] = useFetchCons();
  const [consObject, setConsObject] = useState(null);

  function createConventionObject() {
    if (!data) return;
    let _consObject = {};
    data.map((con) => {
      _consObject[con.id] = con;
    });
    setConsObject(_consObject);
  }

  useEffect(() => {
    createConventionObject();
  }, [data]);

  console.log(consObject);
  return [consObject, loading];
}
