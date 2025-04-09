import { useState } from "react";

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
  nextBtnTxt
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

                setCurrentPage(currentPage - 1);
              }}
            >
              Back
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
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
