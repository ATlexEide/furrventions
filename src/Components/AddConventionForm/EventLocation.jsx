import { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import SearchIcon from "@mui/icons-material/Search";

import VirtualizedList from "../Utilities/VirtualizedList";

export default function EventLocation({
  setIsNotValid,
  eventInfo,
  setEventInfo
}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (eventInfo.location) setIsNotValid(false);
  });

  async function fetchLocation() {
    fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`)
      .then((res) => res.json())
      .then((res) => setResult(res));
  }

  return (
    <>
      <div className="input-container-row">
        <TextField
          fullWidth
          id="location"
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <LocationPinIcon /> Event Location *
            </span>
          }
          variant="outlined"
          value={query ? query : eventInfo.location}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("rawrrr");
            fetchLocation();
          }}
        >
          <SearchIcon />
        </button>
      </div>
      {result && (
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "black",
            maxHeight: 100
          }}
        >
          <VirtualizedList />
        </Box>
      )}
      {/* {result.map((res, i) => (
              <ListItem key={i} component="div" disablePadding>
                <ListItemButton>
                  <ListItemText primary={`Item ${i + 1}`} />
                </ListItemButton>
              </ListItem>
            ))} */}
      {/* {result.map((res, i) => (
              <ListItemButton
                key={i}
                onClick={() => {
                  console.log(res);
                  setEventInfo({
                    ...eventInfo,
                    long: res.lon,
                    lat: res.lat,
                    location: res.display_name
                  });
                  setQuery(null);
                  setResult(null);
                }}
              >
                <ListItemText primary={res.display_name} />
              </ListItemButton>
            ))} */}
      {/* <ul>
            {result.map((res, i) => (
              <li
                key={i}
                onClick={() => {
                  console.log(res);
                  setEventInfo({
                    ...eventInfo,
                    long: res.lon,
                    lat: res.lat,
                    location: res.display_name
                  });
                  setQuery(null);
                  setResult(null);
                }}
              >
                {res.display_name}
              </li>
            ))}
          </ul> */}
    </>
  );
}
