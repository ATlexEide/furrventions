import { useEffect } from "react";

export default function EventName({
  setIsNotValid,
  eventInfo,
  setEventInfo,
  setLogo
}) {
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
          onChange={(e) => {
            setEventInfo({ ...eventInfo, logo: e.target.files[0] });
            if (e.target.files[0])
              setEventInfo({ ...eventInfo, hasLogo: true });
          }}
        />
      </div>
    </>
  );
}
