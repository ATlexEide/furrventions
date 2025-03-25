import "./ConventionList.css";
import { useEffect, useState } from "react";
import { useSupabase } from "../SupabaseHook.jsx";
import ConventionCard from "./ConventionCard";

export default function ConventionList() {
  const supabase = useSupabase();

  const [cons, setCons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  async function fetchConventions() {
    console.log("YIPP IN FUNC");
    const { data, error } = await supabase.from("conventions").select();
    if (error) console.log(error);
    console.log(data);
    setCons(data);
    setLoading(false);
    setRefresh(false);
  }
  useEffect(() => {
    setLoading(true);
    fetchConventions();
  }, [refresh]);

  const hasCons = Boolean(cons.length);
  return (
    <>
      {loading && <h2>Loading . . .</h2>}
      {!loading && !hasCons && <h2>No registered conventions</h2>}
      {!loading && hasCons && (
        <>
          <button
            onClick={() => {
              setRefresh(true);
            }}
          >
            Refresh
          </button>
          <ul id="convention-list">
            {cons.map((con, i) => (
              <ConventionCard con={con} key={i} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
