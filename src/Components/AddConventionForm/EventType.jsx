export default function EventType({
  eventInfo,
  setEventInfo,
  setPage,
  page,
  user
}) {
  return (
    <>
      <button
        disabled
        onClick={(e) => {
          e.preventDefault();
          setEventInfo({ ...eventInfo, type: "convention" });
          setPage(page + 1);
        }}
      >
        Convention
      </button>
      <button
        disabled
        onClick={(e) => {
          e.preventDefault();
          setEventInfo({ ...eventInfo, type: "meet", organizerID: user.id });
          setPage(page + 2);
        }}
      >
        Meet
      </button>
    </>
  );
}
