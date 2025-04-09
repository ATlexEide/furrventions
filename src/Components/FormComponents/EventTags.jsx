export default function EventTags({ eventInfo, setEventInfo }) {
  return (
    <>
      <div className="input-container">
        <label htmlFor="name">Event name:</label>
        <input id="name" type="checkbox" value={"some val"} />
      </div>
    </>
  );
}
