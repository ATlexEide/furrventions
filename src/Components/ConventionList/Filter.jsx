export default function Filter({
  activeTags,
  setActiveTags,
  setHasFilter,
  filter,
  setFilter,
  filterCons,
  setShowMap,
  showMap
}) {
  const tags = [
    { tagName: "adult", tagDisplay: "18+" },
    { tagName: "virtual", tagDisplay: "Virtual" },
    { tagName: "eu", tagDisplay: "Europe" },
    { tagName: "na", tagDisplay: "North America" },
    { tagName: "sa", tagDisplay: "South America" },
    { tagName: "asia", tagDisplay: "Asia" },
    { tagName: "oceania", tagDisplay: "Oceania" }
  ];
  return (
    <section id="convention-list-filter">
      <h2 id="filter-title">SEARCH</h2>

      <section id="filter-options">
        <div className="filter-option-input">
          <label htmlFor="convention-name">Event name: </label>
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
            <label htmlFor="convention-name">Event location: </label>
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

        <div className="tag-container">
          {tags.map((tag, i) => (
            <div key={i} className="input">
              <label htmlFor={tag.tagName}>{tag.tagDisplay}</label>
              <div>
                <input
                  id={tag.tagName}
                  type="checkbox"
                  onChange={(e) => {
                    setActiveTags({
                      ...activeTags,
                      [tag.tagName]: e.target.checked
                    });
                  }}
                  checked={activeTags?.[tag.tagName]}
                />
              </div>
            </div>
          ))}

          <hr />
        </div>
      </section>

      <section id="filter-buttons">
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
        <button
          onClick={() => {
            setShowMap(!showMap);
          }}
        >
          Toggle map view
        </button>
      </section>
    </section>
  );
}
