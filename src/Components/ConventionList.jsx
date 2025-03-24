import { useEffect, useState } from "react";
import { useSupabase } from "../SupabaseHook.jsx";
import ConventionCard from "./ConventionCard";

export default function ConventionList() {
  const supabase = useSupabase();

  const [cons, setCons] = useState();

  async function fetchConventions() {
    console.log("YIPP IN FUNC");
    const { data, error } = await supabase.from("conventions").select();
    if (error) console.log(error);
    console.log(data);
    setCons(data);
  }
  useEffect(() => {
    fetchConventions();
  }, []);

  return (
    <ul id="convention-list">
      {cons && cons.map((con, i) => <ConventionCard con={con} key={i} />)}
    </ul>
  );
}
