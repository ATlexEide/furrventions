import { useEffect } from "react";
import { TextField } from "@mui/material";
import DateRangePicker from "../Utilities/DateRangePicker";

import WebIcon from "@mui/icons-material/Web";

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
    </>
  );
}
