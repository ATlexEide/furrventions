import { useEffect, useState } from "react";
import MapWithPlaceholder from "../Utilities/Map.jsx";
import ConventionCard from "./ConventionCard.jsx";
import Filter from "./Filter.jsx";
// import { useConsArray } from "../utils/useCons.jsx";
import Loading from "../Utilities/Loading.jsx";
import "../../styles/ViewCons.css";

export default function ViewCons({ supabase }) {
  const [consObj, setConsObj] = useState({});
  const [loading, setLoading] = useState(true);
  const [cons, setCons] = useState(
    localStorage.getItem("conventions")
      ? JSON.parse(localStorage.getItem("conventions"))
      : []
  );
  const [filter, setFilter] = useState(null);
  const [hasFilter, setHasFilter] = useState(false);
  const [filteredCons, setFilteredCons] = useState([]);
  const [showMap, setShowMap] = useState(false);

  async function fetch() {
    const { data, err } = await supabase.from("conventions").select();
    if (err) throw new Error(err);
    // localStorage.setItem("conventions", JSON.stringify(data));
    setCons(data);
    setLoading(false);
  }

  useEffect(() => {
    if (!cons.length) fetch();
    createConventionObject();
    setLoading(false);
  }, [cons]);

  function createConventionObject() {
    if (!cons) return;
    let _consObject = {};
    cons.map((con) => {
      _consObject[con.id] = con;
    });
    console.clear();
    console.log("consOBJ", _consObject);
    setConsObj(_consObject);
  }

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
        regex.test(con.location.toLowerCase())
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

  if (hasFilter && !filteredCons) return <Loading />;

  return (
    <>
      <Filter
        setHasFilter={setHasFilter}
        filter={filter}
        setFilter={setFilter}
        filterCons={filterCons}
        setShowMap={setShowMap}
        showMap={showMap}
      />
      {hasFilter && (
        <section id="convention-list-cont">
          {!filteredCons.length && <p>No results</p>}
          {!showMap && (
            <ul id="convention-list">
              {Boolean(filteredCons.length) &&
                filteredCons.map((con, i) => (
                  <li className="convention" key={i}>
                    <ConventionCard con={con} />
                  </li>
                ))}
            </ul>
          )}
        </section>
      )}
      {!hasFilter && (
        <section id="convention-list-cont">
          {!showMap && (
            <ul id="convention-list">
              {(loading || !cons.length) && <Loading />}
              {cons.map((con, i) => (
                <li className="convention" key={i}>
                  <ConventionCard consObj={consObj} con={con} />
                </li>
              ))}
            </ul>
          )}
          {showMap && (
            <MapWithPlaceholder
              cons={cons}
              // conName={con.name}
              // cords={[con.lat, con.long]}
            />
          )}
        </section>
      )}
    </>
  );
}
