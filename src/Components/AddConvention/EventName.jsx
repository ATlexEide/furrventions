import { useEffect, useState } from "react";

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
        <label htmlFor="name">Event name*</label>
        <input
          id="name"
          type="text"
          value={eventInfo.name}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, name: e.target.value });
          }}
        />

        <label htmlFor="description">Event description</label>
        <textarea
          id="description"
          value={eventInfo.description}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, description: e.target.value });
          }}
        />

        <label htmlFor="eventLogoInput">Event Logo</label>
        <input
          type="file"
          name="eventLogoInput"
          id="eventLogoInput"
          accept="image/png, image/gif, image/jpeg"
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
