export default function EventType({ eventInfo, setEventInfo, setPage, page }) {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setEventInfo({ ...eventInfo, type: "convention" });
          setPage(page + 1);
        }}
      >
        Convention
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setEventInfo({ ...eventInfo, type: "meet" });
          setPage(page + 2);
        }}
      >
        Meet
      </button>
    </>
  );
}
