import { useEffect, useState } from "react";

import { useSupabase } from "../SupabaseHook";

export default function ManageConventions() {
  console.log("YIPP");
  const supabase = useSupabase();
  const [cons, setCons] = useState();
  async function fetchConventions() {
    console.log("YIPP");
    const { data, error } = await supabase.from("conventions").select();
    if (error) console.log(error);
    console.log(data);
    return data;
  }
  console.log(cons);
  useEffect(() => {
    setCons(fetchConventions());
  }, []);
  return <></>;
}
