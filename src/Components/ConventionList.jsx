import {
  APIProvider,
  //   CollisionBehavior,
  Map,
  Marker
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { NoMatchAlert } from "./Alerts";
import ConventionCard from "./ConventionCard";
import FilterList from "./FilterList";

export default function ConventionList({ cons, refresh, setRefresh }) {
  const [filteredCons, setFilteredCons] = useState([]);
  const [mapOverviewEnabled, setMapOverviewEnabled] = useState(false);
  const [location, setLocation] = useState("");
  const [nameSearchInput, setNameSearchInput] = useState("");
  const [sliderUpdated, setSliderUpdated] = useState(false);
  const [sliderValue, setSliderValue] = useState(500);

  const hasFilteredCons = Boolean(filteredCons.length);
  const filtersEnabled =
    Boolean(nameSearchInput.length) ||
    Boolean(location.length) ||
    sliderUpdated;

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
  useEffect(() => {
    setFilteredCons(
      cons
        .filter((con) => con.name.toLowerCase().includes(nameSearchInput))
        .filter((con) => con.location.includes(location))
        .filter((con) => con.spots_total <= sliderValue)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearchInput, location, sliderValue]);

  return (
    <ul id="convention-list">
      <FilterList
        setRefresh={setRefresh}
        setSliderValue={setSliderValue}
        setSliderUpdated={setSliderUpdated}
        setNameSearchInput={setNameSearchInput}
        setLocation={setLocation}
        sliderValue={sliderValue}
        location={location}
      />

      <button
        onClick={() => {
          setMapOverviewEnabled(!mapOverviewEnabled);
        }}
      ></button>

      {mapOverviewEnabled && !refresh && (
        <div id="map">
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
        </div>
      )}

      {hasFilteredCons &&
        !mapOverviewEnabled &&
        filteredCons.map((con, i) => <ConventionCard con={con} key={i} />)}

      {!hasFilteredCons &&
        !filtersEnabled &&
        !mapOverviewEnabled &&
        cons.map((con, i) => <ConventionCard con={con} key={i} />)}

      {!hasFilteredCons && filtersEnabled && <NoMatchAlert />}
    </ul>
  );
}
