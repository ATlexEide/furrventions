export function fetchLogo(supabase, id) {
  const { data } = supabase.storage
    .from("convention-images/logos")
    .getPublicUrl(String(id));

  return data.publicUrl;
}
