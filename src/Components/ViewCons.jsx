import { useEffect, useState } from "react";
import ConventionCard from "./ConventionCard.jsx";
import Filter from "./Filter.jsx";
import "./ViewCons.css";
import { useConsArray } from "../utils/useCons.js";
import Loading from "./Loading.jsx";

export default function ViewCons() {
  const [cons, loading] = useConsArray();
  const [filter, setFilter] = useState(null);
  const [hasFilter, setHasFilter] = useState(false);
  const [filteredCons, setFilteredCons] = useState([]);

  // async function formatFilteredLocation() {
  //   console.log("YAY");
  //   await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?key=${
  //       import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  //     }&place_id=${filter.location}`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => console.log(res))
  //     .then((res) =>
  //       setFilter({
  //         ...filter,
  //         location_formatted: res.results[0].formatted_address
  //       })
  //     );
  // }

  async function filterCons() {
    console.log(cons[1].name.toLowerCase());
    console.log(filter.name.toLowerCase());
    let filtered = cons.slice();
    setHasFilter(true);
    if (filter.name)
      filtered = filtered.filter((con) =>
        con.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    // FIXME: location search not working
    if (filter.location) {
      const regex = new RegExp(`.*${filter.location.toLowerCase()}.*`);
      console.log(regex);
      filtered = filtered.filter((con) =>
        regex.test(con.location_formatted.toLowerCase())
      );
    }
    // FIXME END
    if (filter.spots_total)
      filtered = filtered.filter(
        (con) => con.spots_total === filter.spots_total
      );
    return await setFilteredCons(filtered);
  }

  console.log(cons);

  useEffect(() => {
    if (!filter) return;
    if (!filter.name && !filter.location && !filter.spots_total) {
      setHasFilter(false);
      setFilter(null);
      setFilteredCons([]);
      return;
    }
    filterCons();
  }, [filter]);

  console.log("filtered", filteredCons);
  console.log("filter", filter);
  if (!cons) return <Loading />;
  if (hasFilter)
    return (
      <>
        <Filter
          setHasFilter={setHasFilter}
          filter={filter}
          setFilter={setFilter}
          filterCons={filterCons}
        />
        {Boolean(filteredCons.length) &&
          filteredCons.map((con, i) => <ConventionCard con={con} key={i} />)}
        {!filteredCons.length && hasFilter && <h3>No results</h3>}
      </>
    );
  return (
    <>
      <Filter
        setHasFilter={setHasFilter}
        filter={filter}
        setFilter={setFilter}
        filterCons={filterCons}
      />
      <section id="convention-list-cont">
        {filteredCons.length
          ? filteredCons.map((con, i) => <ConventionCard con={con} key={i} />)
          : cons.map((con, i) => <ConventionCard con={con} key={i} />)}
      </section>
    </>
  );
}
