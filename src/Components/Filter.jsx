import {
  APILoader,
  PlacePicker
} from "@googlemaps/extended-component-library/react";

export default function Filter({ filter, setFilter, filterCons }) {
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
              setFilter({ ...filter, name: e.target.value });
            }}
          />
        </div>

        <div className="filter-option-input">
          {/* <label htmlFor="convention-name">Convention location: </label> */}
          <div>
            {/* TODO: MOVE INTO SEPERATE COMPONENT */}
            {/* BUG: FIX RESETTING SEARCH FIELD */}
            {/* <APILoader
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              solutionChannel="GMP_GCC_placepicker_v1"
            />

            <div className="container">
              <PlacePicker
                country={[]}
                placeholder={"Enter a place to see its address"}
                onPlaceChange={(e) =>
                  setFilter({ ...filter, location: e.target.value.id })
                }
              />
            </div> */}
            <label htmlFor="convention-name">Convention location: </label>
            <input
              id="convention-location"
              type="text"
              onChange={(e) => {
                setFilter({
                  ...filter,
                  location: e.target.value
                });
              }}
            />
          </div>
        </div>

        <div className="filter-option-input">
          <label htmlFor="total-spots-input">Max spots/attendees: </label>

          <div id="spots-filter">
            <input
              id="total-spots-slider"
              value={1}
              min={1}
              max={1000}
              type="range"
              onChange={(e) => {
                setFilter({ ...filter, spots_total: e.target.value });
              }}
            />

            <input
              id="total-spots-input"
              type="number"
              value={1}
              onChange={(e) => {
                setFilter({ ...filter, spots_total: e.target.value });
              }}
            />
          </div>
        </div>
      </section>

      <button
        onClick={() => {
          filterCons();
        }}
      >
        Refresh
      </button>
    </section>
  );
}
