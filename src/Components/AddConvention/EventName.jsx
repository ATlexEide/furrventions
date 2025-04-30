export default function EventName({ eventInfo, setEventInfo }) {
  return (
    <>
      <div className="input-container">
        <label htmlFor="name">Event name:</label>
        <input
          id="name"
          type="text"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, name: e.target.value });
          }}
        />
      </div>
    </>
  );
}
