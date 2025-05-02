import { useEffect } from "react";

export default function EventAdditionalInfo({
  setIsNotValid,
  eventInfo,
  setEventInfo
}) {
  useEffect(() => {
    if (eventInfo.start_time && eventInfo.end_time) setIsNotValid(false);
  });
  return (
    <>
      <div className="input-container">
        <label htmlFor="website">Event website</label>
        <input
          id="website"
          type="text"
          value={eventInfo.website}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, website: e.target.value });
          }}
        />

        <label htmlFor="name">Start time*</label>
        <input
          id="start-time"
          className="picker"
          type="date"
          value={eventInfo.start_time}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, start_time: e.target.value });
          }}
        />

        <label htmlFor="name">End time*</label>
        <input
          id="end-time"
          className="picker"
          type="date"
          value={eventInfo.end_time}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, end_time: e.target.value });
          }}
        />
      </div>
    </>
  );
}
