import { useState } from "react";
import { useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import RadioInput from "@mui/material/FormControlLabel";

import "../../styles/EventTags.css";

export default function EventTags({ setIsNotValid, eventInfo, setEventInfo }) {
  const radioStyle = {
    color: "var(--main-border-color)",
    "&.Mui-checked": {
      color: "white"
    }
  };

  // General tags
  const [isAdult, setIsAdult] = useState(
    eventInfo.tags.includes("adult") ? true : false
  );
  const [isVirtual, setIsVirtual] = useState(
    eventInfo.tags.includes("virtual") ? true : false
  );

  useEffect(() => {
    const tags = [isAdult ? "adult" : null, isVirtual ? "virtual" : null];

    setEventInfo({
      ...eventInfo,
      tags: tags.filter((tag) => tag)
    });

    if (eventInfo.locationTag) setIsNotValid(false);
  }, [isAdult, isVirtual, eventInfo.locationTag]);

  return (
    <>
      <div className="input-container">
        <h3>Tags</h3>
        <div className="input">
          <label htmlFor="adult">18+</label>
          <div>
            <input
              id="adult"
              type="checkbox"
              onChange={() => setIsAdult(!isAdult)}
              checked={isAdult}
            />
          </div>
        </div>

        <div className="input">
          <label htmlFor="virtual">Virtual Con</label>
          <div>
            <input
              id="virtual"
              type="checkbox"
              onChange={() => setIsVirtual(!isVirtual)}
              checked={isVirtual}
            />
          </div>
        </div>

        <hr />
        <h3>Location *</h3>
        <RadioGroup
          defaultValue={eventInfo.locationTag}
          name="location-radio-buttons-group"
          onChange={(e) =>
            setEventInfo({ ...eventInfo, locationTag: e.target.value })
          }
        >
          <RadioInput
            value="eu"
            control={<Radio sx={radioStyle} />}
            label="Europe"
          />
          <RadioInput
            value="na"
            control={<Radio sx={radioStyle} />}
            label="North America"
          />
          <RadioInput
            value="sa"
            control={<Radio sx={radioStyle} />}
            label="South America"
          />
          <RadioInput
            value="asia"
            control={<Radio sx={radioStyle} />}
            label="Asia"
          />
          <RadioInput
            value="oce"
            control={<Radio sx={radioStyle} />}
            label="Oceania"
          />
          <RadioInput
            value="other"
            control={<Radio sx={radioStyle} />}
            label="Other"
          />
        </RadioGroup>
      </div>
    </>
  );
}
