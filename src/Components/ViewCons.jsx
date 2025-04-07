import { useEffect, useState } from "react";
import ConventionCard from "./ConventionCard.jsx";
import Filter from "./Filter.jsx";
import { useConsArray } from "../utils/useCons.jsx";
import Loading from "./Loading.jsx";
import "../styles/ViewCons.css";

export default function ViewCons() {
  const [cons] = useConsArray();
  const [filter, setFilter] = useState(null);
  const [hasFilter, setHasFilter] = useState(false);
  const [filteredCons, setFilteredCons] = useState([]);

  async function filterCons() {
    // DEBUGGIN
    // console.log(cons[1].spots_total, typeof cons[1].spots_total);
    // console.log(filter.spots_total, typeof filter.spots_total);
    // DEBUGGIN

    let filtered = cons.slice();
    setHasFilter(true);
    if (filter.name)
      filtered = filtered.filter((con) =>
        con.name.toLowerCase().includes(filter.name.toLowerCase())
      );

    if (filter.location) {
      const regex = new RegExp(`.*${filter.location.toLowerCase()}.*`);
      console.log(regex);
      filtered = filtered.filter((con) =>
        regex.test(con.location_formatted.toLowerCase())
      );
    }

    if (filtered && filter.spots_total)
      filtered = cons.filter((con) => con.spots_total <= filter.spots_total);

    // if (!filtered && filter.spots_total)
    //   filtered = filtered.filter(
    //     (con) => con.spots_total <= filter.spots_total
    //   );
    return setFilteredCons(filtered);
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
        <section id="convention-list-cont">
          <ul id="convention-list">
            {Boolean(filteredCons.length) &&
              filteredCons.map((con, i) => (
                <li className="convention" key={i}>
                  <ConventionCard con={con} />
                </li>
              ))}
          </ul>
        </section>
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
        <ul id="convention-list">
          {cons.map((con, i) => (
            <li className="convention" key={i}>
              <ConventionCard con={con} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
