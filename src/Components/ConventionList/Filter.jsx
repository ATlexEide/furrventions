import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

import "../../styles/Filter.css";

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
  const filterTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#6F7E8C",
            "& label.Mui-focused": {
              color: "white"
            },
            "& .MuiFormLabel-root": {
              color: "#a2a2a2" // or black
            },
            "& .MuiFormLabel.Mui-focused": {
              color: "#fff" // or black
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)"
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)"
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)"
            }
          }
        }
      }
    }
  });

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
          <ThemeProvider theme={filterTheme}>
            <section id="filter-searchbars">
              <div className="input-container">
                <TextField
                  id="convention-name"
                  size="small"
                  fullWidth
                  type="text"
                  label={
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      Event name
                    </span>
                  }
                  variant="outlined"
                  onChange={(e) => {
                    setFilter({ ...filter, name: e.target.value });
                  }}
                />
              </div>
              <div className="input-container">
                <TextField
                  id="convention-location"
                  size="small"
                  fullWidth
                  type="text"
                  label={
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      Event Location
                    </span>
                  }
                  variant="outlined"
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      location: e.target.value
                    });
                  }}
                />
              </div>
            </section>
          </ThemeProvider>
        </div>

        <div className="tag-container">
          <div id="construction-sign"></div>
          <h3>Tags | Coming soon</h3>
          <hr />
          <section id="standard-tags">
            {tags.map(
              (tag, i) =>
                !tag.tagType && (
                  <div key={i} className="input">
                    <label htmlFor={tag.tagName}>{tag.tagDisplay}</label>
                    <div>
                      <input
                        disabled
                        id={tag.tagName}
                        type="checkbox"
                        onChange={(e) => {
                          setActiveTags({
                            ...activeTags,
                            [tag.tagName]: e.target.checked
                          });
                        }}
                        checked={activeTags?.[tag.tagName] ? true : false}
                      />
                    </div>
                  </div>
                )
            )}
          </section>
          <h3>Location | Coming soon</h3>
          <hr />
          <section id="location-tags">
            {tags.map(
              (tag, i) =>
                tag.tagType === "location" && (
                  <div key={i} className="input">
                    <label htmlFor={tag.tagName}>{tag.tagDisplay}</label>
                    <div>
                      <input
                        disabled
                        id={tag.tagName}
                        type="checkbox"
                        onChange={(e) => {
                          setActiveTags({
                            ...activeTags,
                            [tag.tagName]: e.target.checked
                          });
                        }}
                        checked={activeTags?.[tag.tagName] ? true : false}
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
            setActiveTags({});
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
