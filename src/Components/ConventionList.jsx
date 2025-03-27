import "./ConventionList.css";
import { useEffect, useState } from "react";
import { useSupabase } from "../SupabaseHook.jsx";
import ConventionCard from "./ConventionCard";
import LocationSearch from "./LocationSearch.jsx";

export default function ConventionList() {
  const supabase = useSupabase();

  const [cons, setCons] = useState([]);

  const [filteredCons, setFilteredCons] = useState([]);
  const [nameSearchInput, setNameSearchInput] = useState("");
  const [locationSearchInput, setLocationSearchInput] = useState("");
  const [sliderValue, setSliderValue] = useState(500);
  const [sliderUpdated, setSliderUpdated] = useState(false);

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  async function fetchConventions() {
    const { data, error } = await supabase.from("conventions").select();
    if (error) console.log(error);
    console.log("Fetched cons: ", data);
    setCons(data.sort((a, b) => a.start_time - b.start_time));
    setLoading(false);
    setRefresh(false);
  }

  console.log(cons);
  useEffect(() => {
    setLoading(true);
    fetchConventions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  useEffect(() => {
    console.log(cons[0]);
    setFilteredCons(
      cons
        .filter((con) => con.name.toLowerCase().includes(nameSearchInput))
        .filter((con) =>
          con.location.toLowerCase().includes(locationSearchInput)
        )
        // BUG: FIX FILTERING NOT WORKING CORRECTLY
        .filter((con) => con.spots_total <= sliderValue)
    );
    console.log(nameSearchInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearchInput, locationSearchInput, sliderValue]);

  const hasCons = Boolean(cons.length);
  console.log("SLIDER VAL:", sliderValue);

  const hasFilteredCons = Boolean(filteredCons.length);
  const filtersEnabled =
    Boolean(nameSearchInput.length) ||
    Boolean(locationSearchInput.length) ||
    sliderUpdated;
  console.log("filters", filtersEnabled);

  return (
    <section id="convention-list-cont">
      {loading && (
        <div id="loading">
          <h2>Loading . . .</h2>
        </div>
      )}
      {!loading && !hasCons && (
        <h2 id="no-cons-alert">No registered conventions or meets</h2>
      )}
      {!loading && hasCons && (
        <>
          <section id="convention-list-filter">
            <h2 id="filter-title">SEARCH</h2>

            <section id="filter-options">
              <div className="filter-option-input">
                <label htmlFor="convention-name">Convention location: </label>
                <LocationSearch />
              </div>
              <div className="filter-option-input">
                <label htmlFor="convention-name">Convention name: </label>
                <input
                  id="convention-name"
                  type="text"
                  onChange={(e) => {
                    setNameSearchInput(e.target.value.toLowerCase());
                  }}
                />
              </div>

              <div className="filter-option-input">
                <label htmlFor="convention-location">Location: </label>
                <input
                  id="convention-location"
                  type="text"
                  onChange={(e) => {
                    setLocationSearchInput(e.target.value.toLowerCase());
                  }}
                />
              </div>

              <div className="filter-option-input">
                <label htmlFor="total-spots-input">Max spots/attendees: </label>
                <div id="spots-filter">
                  <input
                    id="total-spots-slider"
                    value={sliderValue}
                    min={1}
                    max={5000}
                    type="range"
                    onChange={(e) => {
                      setSliderValue(e.target.value);
                    }}
                  />
                  <input
                    id="total-spots-input"
                    type="number"
                    value={sliderValue}
                    onChange={(e) => {
                      setSliderUpdated(true);
                      setSliderValue(e.target.value);
                    }}
                  />
                </div>
              </div>
            </section>

            <button
              onClick={() => {
                setRefresh(true);
              }}
            >
              Refresh
            </button>
          </section>
          <ul id="convention-list">
            {hasFilteredCons &&
              filteredCons.map((con, i) => (
                <ConventionCard con={con} key={i} />
              ))}
            {!hasFilteredCons &&
              !filtersEnabled &&
              cons.map((con, i) => <ConventionCard con={con} key={i} />)}
            {!hasFilteredCons && filtersEnabled && (
              <h2>No matching cons or meets</h2>
            )}
          </ul>
        </>
      )}
    </section>
  );
}
