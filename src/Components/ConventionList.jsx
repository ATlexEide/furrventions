// fetch(
//   `https://maps.googleapis.com/maps/api/geocode/json?key=${
//     import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//   }&place_id=${con.location}`
// )
//   .then((res) => res.json())
//   .then((res) =>
//     setCordsArray([...cordsArray, res.results[0].geometry.location])
//   );

import {
  APILoader,
  PlacePicker
} from "@googlemaps/extended-component-library/react";
import "./ConventionList.css";
import { useEffect, useState } from "react";
import { useSupabase } from "../SupabaseHook.jsx";
import ConventionCard from "./ConventionCard";
// import Map from "./Map.jsx";

import {
  APIProvider,
  CollisionBehavior,
  Map,
  Marker
} from "@vis.gl/react-google-maps";

export default function ConventionList() {
  const supabase = useSupabase();
  const [cons, setCons] = useState([]);

  const [filteredCons, setFilteredCons] = useState([]);

  const [nameSearchInput, setNameSearchInput] = useState("");
  const [sliderValue, setSliderValue] = useState(500);
  const [sliderUpdated, setSliderUpdated] = useState(false);
  const [mapOverviewEnabled, setMapOverviewEnabled] = useState(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  async function placeMarker(con, i) {
    console.log("MARKER CON LOCATION", con.location);
    const loc = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&place_id=${con.location}`
    )
      .then((res) => res.json())
      .then((res) => res.results[0].geometry.location);
    return <Marker key={i} position={loc} />;
  }

  async function fetchConventions() {
    const { data, error } = await supabase.from("conventions").select();
    if (error) console.log(error);
    console.log("Fetched cons: ", data);

    setCons(data);
    setLoading(false);
    setRefresh(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchConventions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  useEffect(() => {
    setFilteredCons(
      cons
        .filter((con) => con.name.toLowerCase().includes(nameSearchInput))
        .filter((con) => con.location.toLowerCase().includes(location, 0))
        .filter((con) => con.spots_total <= sliderValue)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearchInput, location, sliderValue]);

  const hasCons = Boolean(cons.length);
  const hasFilteredCons = Boolean(filteredCons.length);
  const filtersEnabled =
    Boolean(nameSearchInput.length) ||
    Boolean(location.length) ||
    sliderUpdated;

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
                <label htmlFor="convention-name">Convention location: </label>
                <div>
                  {/* TODO: MOVE INTO SEPERATE COMPONENT */}
                  <APILoader
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    solutionChannel="GMP_GCC_placepicker_v1"
                  />
                  <div className="container">
                    <PlacePicker
                      country={[]}
                      placeholder={"Enter a place to see its address"}
                      onPlaceChange={(e) => setLocation(e.target.value.id)}
                    />
                  </div>
                </div>
              </div>

              <div className="filter-option-input">
                <label htmlFor="total-spots-input">Max spots/attendees: </label>
                <div id="spots-filter">
                  <input
                    id="total-spots-slider"
                    value={sliderValue}
                    min={1}
                    max={1000}
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
          <button
            onClick={() => {
              setMapOverviewEnabled(!mapOverviewEnabled);
            }}
          ></button>
          {mapOverviewEnabled && !refresh && (
            <APIProvider
              solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            >
              <Map
                defaultZoom={8}
                defaultCenter={{ lat: 59.9138688, lng: 10.7522454 }}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
              >
                {cons.map((con, i) => placeMarker(con, i))}
              </Map>
            </APIProvider>
          )}
          <ul id="convention-list">
            {hasFilteredCons &&
              !mapOverviewEnabled &&
              filteredCons.map((con, i) => (
                <ConventionCard con={con} key={i} />
              ))}

            {!hasFilteredCons &&
              !filtersEnabled &&
              !mapOverviewEnabled &&
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
