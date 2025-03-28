import {
  APILoader,
  PlacePicker
} from "@googlemaps/extended-component-library/react";
import { useEffect } from "react";

export default function FilterList({
  setRefresh,
  sliderValue,
  setSliderValue,
  setSliderUpdated,
  setNameSearchInput,
  nameSearchInput,
  setLocation,
  filterCons
}) {
  useEffect(() => {
    filterCons();
  }, [sliderValue, location, nameSearchInput]);
  return (
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
            {/* BUG: FIX RESETTING SEARCH FIELD */}
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
  );
}
