import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import WebIcon from "@mui/icons-material/Web";
import "cally";

import "../../styles/MyDateRangePicker.css";

export default function EventAdditionalInfo({
  setIsNotValid,
  eventInfo,
  setEventInfo
}) {
  const [value, setValue] = useState("");
  console.log(value, "value");
  // const [dates, setDates] = useState(null);
  useEffect(() => {
    if (eventInfo.start_time && eventInfo.end_time) setIsNotValid(false);
  });
  return (
    <>
      <div className="input-container">
        <TextField
          id="website"
          type="text"
          value={eventInfo.website}
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <WebIcon /> Event website
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, website: e.target.value });
          }}
        />
      </div>
      <div className="input-container">
        <calendar-range
          months={2}
          // value={value}
          onchange={(event) => setValue(event.target.value)}
        >
          <calendar-month />
          <calendar-month offset={1} />
        </calendar-range>
      </div>

      {/* <div className="input-container">
        <label htmlFor="website">Event website</label>
        <input
          value={eventInfo.website}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, website: e.target.value });
          }}
        />

        <label htmlFor="name">Start time*</label>
        <input
          id="start-time"
          className="picker"
          type="date"
          value={eventInfo.start_time}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, start_time: e.target.value });
          }}
        />

        <label htmlFor="name">End time*</label>
        <input
          id="end-time"
          className="picker"
          type="date"
          value={eventInfo.end_time}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, end_time: e.target.value });
          }}
        />
      </div> */}
    </>
  );
}
