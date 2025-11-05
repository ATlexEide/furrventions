import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import EuroIcon from "@mui/icons-material/Euro";

export default function EventTicketInfo({
  setIsNotValid,
  eventInfo,
  setEventInfo
}) {
  const [isFree, setIsFree] = useState(eventInfo.price === 0 ? true : false);

  useEffect(() => {
    if (!isFree && !eventInfo.price) setIsNotValid(true);
    else setIsNotValid(false);
  }, [eventInfo]);

  return (
    <>
      <div className="input-container">
        <TextField
          disabled={isFree}
          type="number"
          id="name"
          value={eventInfo.price ? eventInfo.price : null}
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <EuroIcon /> Ticket Price (EUR)*
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, price: Number(e.target.value) });
          }}
        />
      </div>
      {!eventInfo.price && (
        <div className="input">
          <label htmlFor="adult">Event is free</label>
          <div>
            <input
              id="event-is-free-checkbox"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setEventInfo({ ...eventInfo, price: 0 });
                  setIsFree(true);
                  setIsNotValid(false);
                } else {
                  setIsFree(false);
                  setIsNotValid(true);
                }
              }}
              checked={isFree}
            />
          </div>
        </div>
      )}
    </>
  );
}
