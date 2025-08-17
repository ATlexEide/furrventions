export function fetchLogo(supabase, id) {
  console.log("retrieving ", id, " logo");
  const { data } = supabase.storage
    .from("convention-logos/logos")
    .getPublicUrl(String(id));
  console.log(data.publicUrl);

  return data.publicUrl;
}
