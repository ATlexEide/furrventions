import { useSupabase } from "../SupabaseHook.jsx";
import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import ConventionCard from "./ConventionCard.jsx";
import Filter from "./Filter.jsx";
import "./ViewCons.css";

export default function ViewCons() {
  const supabase = useSupabase();
  const [cons, setCons] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchCons() {
    const { data, err } = await supabase.from("conventions").select();
    if (err) throw new Error(err);
    setCons(await data);
    setLoading(false);
  }
  useEffect(() => {
    fetchCons();
  }, []);
  console.log(cons);
  if (loading) return <Loading />;
  if (cons)
    return (
      <>
        <Filter />
        <section id="convention-list-cont">
          {cons.map((con, i) => (
            <ConventionCard con={con} key={i} />
          ))}
        </section>
      </>
    );
  return <h1>test</h1>;
}
