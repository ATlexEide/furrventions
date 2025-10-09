export async function fetchAndSetAllCons(supabase, setCons, setLoading) {
  const { data, err } = await supabase.from("conventions").select();
  if (err) throw new Error(err);
  // localStorage.setItem("conventions", JSON.stringify(data));
  console.log(data);
  setCons(data);
  setLoading(false);
}
