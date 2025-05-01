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
          type="datetime-local"
          value={eventInfo.start_time}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, start_time: e.target.value });
          }}
        />

        <label htmlFor="name">End time*</label>
        <input
          id="end-time"
          type="datetime-local"
          value={eventInfo.end_time}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, end_time: e.target.value });
          }}
        />
      </div>
    </>
  );
}
