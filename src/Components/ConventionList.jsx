import "./ConventionList.css";
import { useEffect, useState } from "react";
import { useSupabase } from "../SupabaseHook.jsx";
import ConventionCard from "./ConventionCard";
import LocationSearch from "./LocationSearch.jsx";

export default function ConventionList() {
  const supabase = useSupabase();

  const [cons, setCons] = useState([]);
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

  const [sliderValue, setSliderValue] = useState(10);

  useEffect(() => {
    setLoading(true);
    fetchConventions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const hasCons = Boolean(cons.length);
  console.log("SLIDER VAL:", sliderValue);
  return (
    <section id="convention-list-cont">
      {loading && <h2>Loading . . .</h2>}
      {!loading && !hasCons && <h2>No registered conventions</h2>}
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
                <input id="convention-name" type="text" />
              </div>

              <div className="filter-option-input">
                <label htmlFor="convention-location">Location: </label>
                <input id="convention-location" type="text" />
              </div>

              <div className="filter-option-input">
                <label htmlFor="total-spots-input">
                  Total spots/attendees:{" "}
                </label>
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
                    onChange={(e) => setSliderValue(e.target.value)}
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
            {cons.map((con, i) => (
              <ConventionCard con={con} key={i} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
