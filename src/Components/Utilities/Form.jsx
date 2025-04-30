// Take in a
// form id: string
// nextBtnTxt: string // comma separated string "next,final text"
//
// pages array[object{title:string, component?: component}]:
//
// currentPage
// setCurrentPage
export default function Form({
  id,
  pages,
  currentPage,
  setCurrentPage,
  callback,
  nextBtnTxt,
  eventInfo = null,
  setEventInfo = null,
  user = null
}) {
  const nextText = nextBtnTxt.split(",")[0];
  const finalText = nextBtnTxt.split(",")[1];
  return (
    <form id={id}>
      <section>
        <h2>{pages[currentPage].title}</h2>
      </section>
      <section id="form-main">{pages[currentPage].component}</section>
      <section>
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
                console.log(currentPage);
                console.log(pages[currentPage].title);
              }}
            >
              Back
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(currentPage);
                if (currentPage === 1 && eventInfo.type === "convention")
                  setEventInfo({ ...eventInfo, organizerID: user.id });
                currentPage === pages.length - 1
                  ? callback()
                  : setCurrentPage(currentPage + 1);
              }}
            >
              {currentPage === pages.length - 1 ? finalText : nextText}
            </button>
          </>
        )}
      </section>
    </form>
  );
}
