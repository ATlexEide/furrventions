import { supabase } from "./SupabaseUtils.js";

export function fetchLogo(id) {
  const { data } = supabase.storage
    .from("convention-images/logos")
    .getPublicUrl(String(id));

  return data.publicUrl;
}
