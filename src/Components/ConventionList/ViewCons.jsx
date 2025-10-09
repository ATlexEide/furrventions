import { useEffect, useState } from "react";
import MapWithPlaceholder from "../Utilities/Map.jsx";
import ConventionCard from "./ConventionCard.jsx";
import Filter from "./Filter.jsx";
// import { useConsArray } from "../utils/useCons.jsx";
import { fetchAndSetAllCons } from "../../utils/SupabaseUtils.js";
import { filterCons } from "../../utils/conventionFilter.js";
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

  const filterArgs = {
    activeTags: activeTags,
    setFilteredCons: setFilteredCons,
    setHasFilter: setHasFilter,
    filter: filter,
    cons: cons
  };

  useEffect(() => {
    if (!cons.length) {
      fetchAndSetAllCons(supabase, setCons, setLoading);
    }
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

  useEffect(() => {
    if (
      !filter?.name &&
      !filter?.location &&
      !filter?.spots_total &&
      !Object.values(activeTags).includes(true)
    ) {
      setHasFilter(false);
      setFilter(null);
      setFilteredCons([]);

      return;
    }
    filterCons(filterArgs);
  }, [filter, activeTags]);

  if (hasFilter && !filteredCons) return <Loading text="Looking for events" />;

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
      {!showMap && hasFilter && (
        <section id="convention-list-cont">
          {!filteredCons.length && <p>No results</p>}

          <ul id="convention-list">
            {Boolean(filteredCons.length) &&
              filteredCons.map((con, i) => (
                <li className="convention" key={i}>
                  <ConventionCard supabase={supabase} con={con} />
                </li>
              ))}
          </ul>
        </section>
      )}

      {!showMap && !hasFilter && (
        <section id="convention-list-cont">
          <ul id="convention-list">
            {(loading || !cons.length) && <Loading text="Looking for events" />}
            {cons.map((con, i) => (
              <li className="convention" key={i}>
                <ConventionCard
                  supabase={supabase}
                  consObj={consObj}
                  con={con}
                />
              </li>
            ))}
          </ul>
          {(cons || filteredCons) && showMap && (
            <MapWithPlaceholder
              conventions={filteredCons.length ? filteredCons : cons}
            />
          )}
        </section>
      )}

      {showMap && (
        <section id="convention-list-cont">
          {(cons || filteredCons) && showMap && (
            <MapWithPlaceholder
              supabase={supabase}
              conventions={filteredCons.length ? filteredCons : cons}
            />
          )}
        </section>
      )}
    </>
  );
}
