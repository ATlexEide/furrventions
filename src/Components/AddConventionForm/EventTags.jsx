import { useState } from "react";
import { useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import "../../styles/EventTags.css";
import { red } from "@mui/material/colors";

export default function EventTags({ setIsNotValid, eventInfo, setEventInfo }) {
  setIsNotValid(false);
  // General tags
  const [isAdult, setIsAdult] = useState(
    eventInfo.tags.includes("adult") ? true : false
  );
  const [isVirtual, setIsVirtual] = useState(
    eventInfo.tags.includes("virtual") ? true : false
  );

  // Location
  const [isEU, setIsEU] = useState(
    eventInfo.tags.includes("eu") ? true : false
  );
  const [isNA, setIsNA] = useState(
    eventInfo.tags.includes("na") ? true : false
  );
  const [isSA, setIsSA] = useState(
    eventInfo.tags.includes("sa") ? true : false
  );
  const [isOceania, setIsOceania] = useState(
    eventInfo.tags.includes("oceania") ? true : false
  );
  const [isAsia, setIsAsia] = useState(
    eventInfo.tags.includes("asia") ? true : false
  );
  const [isOther, setIsOther] = useState(
    eventInfo.tags.includes("other") ? true : false
  );

  useEffect(() => {
    const tags = [isAdult ? "adult" : null, isVirtual ? "virtual" : null];

    setEventInfo({
      ...eventInfo,
      tags: tags.filter((tag) => tag)
    });
  }, [isAdult, isVirtual, isEU, isNA, isSA, isOceania, isAsia, isOther]);

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
        <h3>Location</h3>
        <RadioGroup
          sx={{
            color: red,
            "&.Mui-checked": {
              color: "white"
            }
          }}
          defaultValue="other"
          name="location-radio-buttons-group"
          onChange={(e) =>
            setEventInfo({ ...eventInfo, locationTag: e.target.value })
          }
        >
          <FormControlLabel value="eu" control={<Radio />} label="Europe" />
          <FormControlLabel
            value="na"
            control={<Radio />}
            label="North America"
          />
          <FormControlLabel
            value="sa"
            control={<Radio />}
            label="South America"
          />
          <FormControlLabel value="asia" control={<Radio />} label="Asia" />
          <FormControlLabel value="oce" control={<Radio />} label="Oceania" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>

        {/* <div className="input">
          <label htmlFor="eu">Location: Europe</label>
          <div>
            <input
              id="eu"
              type="checkbox"
              onChange={() => setIsEU(!isEU)}
              checked={isEU}
            />
          </div>
        </div>

        <div className="input">
          <label htmlFor="na">Location: North America</label>
          <div>
            <input
              id="na"
              type="checkbox"
              onChange={() => setIsNA(!isNA)}
              checked={isNA}
            />
          </div>
        </div>

        <div className="input">
          <label htmlFor="sa">Location: South America</label>
          <div>
            <input
              id="sa"
              type="checkbox"
              onChange={() => setIsSA(!isSA)}
              checked={isSA}
            />
          </div>
        </div>

        <div className="input">
          <label htmlFor="asia">Location: Asia</label>
          <div>
            <input
              id="asia"
              type="checkbox"
              onChange={() => setIsAsia(!isAsia)}
              checked={isAsia}
            />
          </div>
        </div>

        <div className="input">
          <label htmlFor="oceania">Location: Oceania</label>
          <div>
            <input
              id="oceania"
              type="checkbox"
              onChange={() => setIsOceania(!isOceania)}
              checked={isOceania}
            />
          </div>
        </div>

        <div className="input">
          <label htmlFor="other">Location: Other</label>
          <div>
            <input
              id="other"
              type="checkbox"
              onChange={() => setIsOther(!isOther)}
              checked={isOther}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
