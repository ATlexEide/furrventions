export default function EventAdditionalInfo({ eventInfo, setEventInfo }) {
  return (
    <>
      <div className="input-container">
        <label htmlFor="website">Event website</label>
        <input
          id="website"
          type="text"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, website: e.target.value });
          }}
        />

        <label htmlFor="name">Start time*</label>
        <input
          id="start-time"
          type="datetime-local"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, start_time: e.target.value });
          }}
        />

        <label htmlFor="name">End time*</label>
        <input
          id="end-time"
          type="datetime-local"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, end_time: e.target.value });
          }}
        />
      </div>
    </>
  );
}
