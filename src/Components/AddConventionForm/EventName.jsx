import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

export default function EventName({
  setIsNotValid,
  eventInfo,
  setEventInfo,
  setLogo
}) {
  const [error, setError] = useState();
  useEffect(() => {
    if (eventInfo.name) setIsNotValid(false);
  }, [eventInfo]);
  return (
    <>
      <div className="input-container">
        <TextField
          id="name"
          value={eventInfo.name}
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <BadgeIcon /> Event name *
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, name: e.target.value });
          }}
        />
      </div>

      <div className="input-container">
        <TextField
          id="description"
          value={eventInfo.description}
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <DescriptionIcon /> Event description
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, description: e.target.value });
          }}
        />
      </div>

      <div className="input-container">
        <Button
          fullWidth
          component="label"
          // loading
          // loadingPosition="start"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<UploadFileIcon />}
        >
          {eventInfo.logo ? eventInfo.logo.name : "Event Logo"}
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              // File size limit (1MB * Limit)
              if (e.target.files[0].size > 1048576 * 25) {
                setError("filesize");
              }
              if (e.target.files.length) {
                setEventInfo({
                  ...eventInfo,
                  logo: e.target.files[0]
                });
              }
            }}
          />
        </Button>
        {error && (
          <p>
            Image too big <br />
            Keep it under 50MB
          </p>
        )}
      </div>
    </>
  );
}
