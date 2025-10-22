import { useEffect } from "react";
import { TextField } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";

export default function EventTicketInfo({
  setIsNotValid,
  eventInfo,
  setEventInfo
}) {
  useEffect(() => {
    if (eventInfo.price) setIsNotValid(false);
  }, [eventInfo]);

  return (
    <>
      <div className="input-container">
        <TextField
          type="number"
          id="name"
          value={eventInfo.price ? eventInfo.price : ""}
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <EuroIcon /> Ticket Price (EUR)*
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, price: e.target.value });
          }}
        />
      </div>
    </>
  );
}
