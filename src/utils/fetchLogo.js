export function fetchLogo(supabase, id) {
  console.log("retrieving ", id, " logo");
  const { data } = supabase.storage
    .from("convention-images/logos")
    .getPublicUrl(String(id));
  console.log(data.publicUrl);
  console.log(data);

  return data.publicUrl;
}
