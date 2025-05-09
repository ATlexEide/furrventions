import { useEffect, useState } from "react";

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
      <div className="input-container">
        <label htmlFor="location">Event location*</label>
        <input
          id="location"
          type="text"
          value={query ? query : eventInfo.location}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          //TODO: Add geocoding to select properly formatted location
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("rawrrr");
            fetchLocation();
          }}
        >
          Search
        </button>
        {result && (
          <ul>
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
          </ul>
        )}
      </div>
    </>
  );
}
