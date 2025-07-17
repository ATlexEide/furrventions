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
    { tagName: "eu", tagDisplay: "Europe", tagType: "location" },
    { tagName: "na", tagDisplay: "North America", tagType: "location" },
    { tagName: "sa", tagDisplay: "South America", tagType: "location" },
    { tagName: "asia", tagDisplay: "Asia", tagType: "location" },
    { tagName: "oceania", tagDisplay: "Oceania", tagType: "location" }
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
          <h3>Tags</h3>
          <hr />
          <section id="standard-tags">
            {tags.map(
              (tag, i) =>
                !tag.tagType && (
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
                )
            )}
          </section>
          <h3>Location</h3>
          <hr />
          <section id="location-tags">
            {tags.map(
              (tag, i) =>
                tag.tagType === "location" && (
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
                )
            )}
          </section>
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
