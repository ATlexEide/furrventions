export default function Filter({
  setHasFilter,
  filter,
  setFilter,
  filterCons
}) {
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
              console.log("yipp");
              setFilter({ ...filter, name: e.target.value });
            }}
          />
        </div>

        <div className="filter-option-input">
          {/* <label htmlFor="convention-name">Convention location: </label> */}
          <div>
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
          <label htmlFor="total-spots-input">Previous year attendees: </label>

          <div id="spots-filter">
            <input
              id="total-spots-slider"
              value={filter && filter.spots_total ? filter.spots_total : 1000}
              min={0}
              max={2000}
              type="range"
              onChange={(e) => {
                setFilter({ ...filter, spots_total: Number(e.target.value) });
              }}
            />

            <input
              id="total-spots-input"
              type="number"
              value={filter && filter.spots_total ? filter.spots_total : 0}
              onChange={(e) => {
                setFilter({ ...filter, spots_total: Number(e.target.value) });
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
      <button
        onClick={() => {
          setFilter({});
          setHasFilter(false);
        }}
      >
        Clear filter
      </button>
    </section>
  );
}
