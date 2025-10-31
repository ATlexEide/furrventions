import { useEffect } from "react";
import { TextField } from "@mui/material";

import WebIcon from "@mui/icons-material/Web";

import DateRangePicker from "../Utilities/DateRangePicker";

export default function EventAdditionalInfo({
  setIsNotValid,
  eventInfo,
  setEventInfo
}) {
  useEffect(() => {
    if (eventInfo.start_time && eventInfo.end_time) setIsNotValid(false);
    if (eventInfo.start_time === eventInfo.end_time) setIsNotValid(true);
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
        <DateRangePicker data={eventInfo} setData={setEventInfo} />
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
