export async function uploadLogo(supabase, name, file) {
  console.log(file);
  const { data, error } = await supabase.storage
    .from("convention-logos")
    .upload("logos/" + name, file);
  if (error) {
    console.log(error);
    // Handle error
  } else {
    console.log("success?", data);
    // Handle success
  }
}
