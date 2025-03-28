import "./ConventionList.css";
import { useEffect, useState } from "react";
import { useSupabase } from "../SupabaseHook.jsx";
import { NoConsAlert } from "./Alerts.jsx";
import Loading from "./Loading.jsx";
import ConventionList from "./ConventionList.jsx";

export default function ViewCons() {
  const supabase = useSupabase();
  const [cons, setCons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  async function fetchConventions() {
    const { data, error } = await supabase.from("conventions").select();
    if (error) console.log(error);
    console.log("Fetched cons: ", data);
    setCons(data);
    setLoading(false);
    setRefresh(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchConventions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const hasCons = Boolean(cons.length);

  return (
    <section id="convention-list-cont">
      {loading && <Loading />}
      {!loading && !hasCons && <NoConsAlert />}
      {!loading && hasCons && (
        <ConventionList setRefresh={setRefresh} cons={cons} refresh={refresh} />
      )}
    </section>
  );
}
