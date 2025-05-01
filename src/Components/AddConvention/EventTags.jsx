import { useState } from "react";
import { useEffect } from "react";

import "../../styles/EventTags.css";

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
  const [isOther, setIsOther] = useState(
    eventInfo.tags.includes("other") ? true : false
  );

  useEffect(() => {
    const tags = [
      isAdult ? "adult" : null,
      isVirtual ? "virtual" : null,
      isEU ? "eu" : null,
      isNA ? "na" : null,
      isOther ? "other" : null
    ];

    setEventInfo({
      ...eventInfo,
      tags: tags.filter((tag) => tag)
    });
  }, [isAdult, isVirtual, isEU, isNA, isOther]);

  return (
    <>
      <div className="input-container">
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

        <div className="input">
          <label htmlFor="eu">Location: EU</label>
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
          <label htmlFor="na">Location: NA</label>
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
          <label htmlFor="other">Location: Other</label>
          <div>
            <input
              id="other"
              type="checkbox"
              onChange={() => setIsOther(!isOther)}
              checked={isOther}
            />
          </div>
        </div>
      </div>
    </>
  );
}
