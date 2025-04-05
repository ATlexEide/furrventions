export default function EventType({ setPage, page }) {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setPage(page + 1);
        }}
      >
        Convention
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setPage(page + 2);
        }}
      >
        Meet
      </button>
    </>
  );
}
