import { useSupabase } from "../SupabaseHook.jsx";
import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import ConventionCard from "./ConventionCard.jsx";
import Filter from "./Filter.jsx";
import "./ViewCons.css";

export default function ViewCons() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({});
  const [cons, setCons] = useState([]);
  const [filteredCons, setFilteredCons] = useState([]);

  async function fetchCons() {
    const { data, err } = await supabase.from("conventions").select();
    if (err) throw new Error(err);
    setCons(await data);
    setLoading(false);
  }

  function filterCons() {
    console.log("filter", filter);
    let filtered = cons.slice();
    if (filter.name)
      filtered = filtered.filter((con) =>
        con.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    if (filter.location)
      filtered = filtered.filter((con) => con.location === filter.location);
    if (filter.spots_total)
      filtered = filtered.filter(
        (con) => con.spots_total === filter.spots_total
      );

    return filtered;
  }

  useEffect(() => {
    fetchCons();
  }, []);
  useEffect(() => {
    setFilteredCons(filterCons());
  }, [filter]);
  console.log(cons);
  console.log("filterd", filteredCons);
  if (loading) return <Loading />;
  if (cons)
    return (
      <>
        <Filter filter={filter} setFilter={setFilter} filterCons={filterCons} />
        <section id="convention-list-cont">
          {filteredCons.length
            ? filteredCons.map((con, i) => <ConventionCard con={con} key={i} />)
            : cons.map((con, i) => <ConventionCard con={con} key={i} />)}
        </section>
      </>
    );
  return <h1>test</h1>;
}
