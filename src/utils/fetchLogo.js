export function fetchLogo(supabase, name) {
  console.log("retrieving ", name, " logo");
  const { data } = supabase.storage
    .from("convention-logos/logos")
    .getPublicUrl(`${name}`);
  console.log(data.publicUrl);

  return data.publicUrl;
}
