export async function uploadLogo(supabase, conData, file) {
  console.log(file);
  const name = conData[0].id;
  const { data, error } = await supabase.storage
    .from("convention-logos")
    .upload("logos/" + name, file);
  if (error) {
    console.log(error);
    // Handle error
  } else {
    console.log("success?", data);
    return data;
    // Handle success
  }
}
