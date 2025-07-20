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
      let tagArray = Object.keys(activeTags).filter((key) => activeTags[key]);

      const tagChecker = (con) => {
        let tagCount = tagArray.length;
        tagArray.forEach((tag) => {
          if (tag && JSON.parse(con.tags).includes(tag)) {
            tagCount--;
          }
        });
        return !tagCount;
      };

      filtered = filtered.filter((con) => tagChecker(con));
      setFilteredCons(filtered);
    }

    if (filter?.name) {
      filtered = filtered.filter((con) =>
        con.name.toLowerCase().includes(filter.name.toLowerCase())
      );
      setFilteredCons(filtered);
    }

    if (filter?.location) {
      const regex = new RegExp(`.*${filter.location.toLowerCase()}.*`);
      filtered = filtered.filter((con) =>
        regex.test(con.location.toLowerCase())
      );
      setFilteredCons(filtered);
    }

    if (filtered && filter?.spots_total)
      filtered = cons.filter((con) => con.spots_total <= filter.spots_total);

    setFilteredCons(filtered);
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
    filterCons();
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
                  <ConventionCard con={con} />
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
                <ConventionCard consObj={consObj} con={con} />
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
              conventions={filteredCons.length ? filteredCons : cons}
            />
          )}
        </section>
      )}
    </>
  );
}
