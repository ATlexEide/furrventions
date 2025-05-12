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
  const [activeTags, setActiveTags] = useState({});
  const [hasFilter, setHasFilter] = useState(false);
  const [filteredCons, setFilteredCons] = useState([]);
  const [showMap, setShowMap] = useState(false);
  console.log(cons);

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
    setConsObj(_consObject);
  }

  async function filterCons() {
    let filtered = cons.slice();
    const hasActiveTags = Object.values(activeTags).includes(true);
    setHasFilter(true);

    if (hasActiveTags) {
      console.log("ACTIVE TAGS");
      let tagArray = Object.keys(activeTags);

      filtered.filter((con) =>
        JSON.parse(con.tags).includes(tagArray.map((tag) => tag))
      );

      console.log(JSON.parse(cons[0].tags));
      console.log("TAGS", tagArray);
    }

    if (filter.name)
      filtered = filtered.filter((con) =>
        con.name.toLowerCase().includes(filter.name.toLowerCase())
      );

    if (filter.location) {
      const regex = new RegExp(`.*${filter.location.toLowerCase()}.*`);
      filtered = filtered.filter((con) =>
        regex.test(con.location.toLowerCase())
      );
    }

    if (filtered && filter.spots_total)
      filtered = cons.filter((con) => con.spots_total <= filter.spots_total);

    return setFilteredCons(filtered);
  }

  useEffect(() => {
    if (!filter && !Object.values(activeTags).includes(true)) return;
    if (
      !filter?.name &&
      !filter?.location &&
      !filter?.spots_total &&
      !Object.values(activeTags).includes(true)
    ) {
      setHasFilter(false);
      setFilter(null);
      setFilteredCons([]);
      setActiveTags({});
      return;
    }
    filterCons();
  }, [filter, activeTags]);

  if (hasFilter && !filteredCons) return <Loading />;

  return (
    <>
      <Filter
        setActiveTags={setActiveTags}
        activeTags={activeTags}
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
