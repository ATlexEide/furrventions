import { useState } from "react";
import ConventionCard from "./ConventionCard.jsx";
import Filter from "./Filter.jsx";
import "./ViewCons.css";
import { useConsArray } from "../utils/useCons.js";
import Loading from "./Loading.jsx";

export default function ViewCons() {
  const [cons, loading] = useConsArray();
  const [filter, setFilter] = useState({});
  const [filteredCons, setFilteredCons] = useState([]);

  async function formatFilteredLocation() {
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&place_id=${filter.location}`
    )
      .then((res) => res.json())
      .then((res) =>
        setFilter({
          ...filter,
          location_formatted: res.results[0].formatted_address
        })
      );
  }

  async function filterCons() {
    console.clear();

    let filtered = cons.slice();
    if (filter.name)
      filtered = filtered.filter((con) =>
        con.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    // FIXME: location search not working
    if (filter.location)
      filtered = filtered.filter((con) =>
        con.location_formatted.match(filter.location.toLowerCase())
      );
    // FIXME END
    if (filter.spots_total)
      filtered = filtered.filter(
        (con) => con.spots_total === filter.spots_total
      );
    return await setFilteredCons(filtered);
  }

  console.log(cons);

  console.log("filtered", filteredCons);
  console.log("filter", filter);
  if (!cons) return <Loading />;
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
}
