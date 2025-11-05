export async function uploadLogo(supabase, conData, file) {
  const fileName = String(conData[0].id);
  const { data, error } = await supabase.storage
    .from("convention-images")
    .upload("logos/" + fileName, file);
  if (error) {
    console.log(error);
    // Handle error
  } else {
    return data;
    // Handle success
  }
}
