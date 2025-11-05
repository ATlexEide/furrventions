export default function Form({
  id,
  pages,
  currentPage,
  setCurrentPage,
  callback,
  nextBtnTxt,
  eventInfo = null,
  setEventInfo = null,
  user = null,
  isNotValid = true,
  setIsNotValid
}) {
  const nextText = nextBtnTxt.split(",")[0];
  const finalText = nextBtnTxt.split(",")[1];
  return (
    <form id={id}>
      <section>
        <h2>{pages[currentPage].title}</h2>
      </section>
      <section id="form-main">{pages[currentPage].component}</section>
      <section id="pagination-buttons">
        {currentPage > 0 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (currentPage === 2 && !eventInfo.organizerID) {
                  setCurrentPage(0);
                  return;
                }
                setCurrentPage(currentPage - 1);
              }}
            >
              Back
            </button>

            <button
              disabled={isNotValid}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage === 1 && eventInfo.type === "convention")
                  setEventInfo({ ...eventInfo, organizerID: user.id });
                currentPage === pages.length - 1
                  ? callback()
                  : setCurrentPage(currentPage + 1);
                setIsNotValid(true);
              }}
            >
              {currentPage === pages.length - 1 ? finalText : nextText}
            </button>
          </>
        )}
      </section>
      <section id="form-pagination">
        {pages.map((page, i) => (
          <div
            key={i}
            className={`pagination-dot ${
              i === currentPage ? "current-dot" : ""
            }`}
          ></div>
        ))}
      </section>
    </form>
  );
}
