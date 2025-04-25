export default function EventAdditionalInfo({ eventInfo, setEventInfo }) {
  return (
    <>
      <div className="input-container">
        <label htmlFor="name">Additional Info:</label>
        <input id="name" type="text" />
      </div>
    </>
  );
}
