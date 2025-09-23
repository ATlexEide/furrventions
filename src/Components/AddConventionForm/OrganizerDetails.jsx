export default function OrganizerDetails({
  setPage,
  page,
  eventInfo,
  setEventInfo
}) {
  return (
    <div id="organizer-details">
      <button
        className="red-btn"
        onClick={(e) => {
          e.preventDefault();
          setPage(page + 1);
        }}
      >
        I&apos;m not the organizer
      </button>
      <div className="input-container">
        <label htmlFor="name">Organizer name</label>
        <input
          id="name"
          type="text"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, organizerName: e.target.value });
          }}
        />
      </div>

      <div className="input-container">
        <label htmlFor="email">Support Email</label>
        <input
          id="email"
          type="email"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, organizerEmail: e.target.value });
          }}
        />
      </div>

      <div className="input-container">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, organizerPhone: e.target.value });
          }}
        />
      </div>

      <div className="input-container">
        <label htmlFor="groupchat">Telegram/Discord</label>
        <input
          id="groupchat"
          type="text"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, organizerGroupChat: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
