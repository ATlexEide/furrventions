export default function EventLocation({ eventInfo, setEventInfo }) {
  return (
    <>
      <div className="input-container">
        <label htmlFor="location">Event location:</label>
        <input id="location" type="text" />
      </div>
    </>
  );
}
