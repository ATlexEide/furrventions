export async function uploadLogo(supabase, conData, file) {
  console.log(file);
  const fileName = String(conData[0].id);
  const { data, error } = await supabase.storage
    .from("convention-images")
    .upload("logos/" + fileName, file);
  if (error) {
    console.log(error);
    // Handle error
  } else {
    console.log("success?", data);
    return data;
    // Handle success
  }
}
