import { useState } from "react";

// Take in a form id and pages object with a "title" and optional "component" and callback function
export default function Form({ id, pages, callback }) {
  const [page, setPage] = useState(0);
  return (
    <form id={id}>
      <section>
        <h2>{pages[page].title}</h2>
      </section>
      <section id="form-main">{pages[page].component}</section>
      <section>
        {page > 0 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();

                setPage(page - 1);
              }}
            >
              Back
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                page === pages.length - 1 ? callback() : setPage(page + 1);
              }}
            >
              {page === pages.length - 1 ? "Add event" : "Next"}
            </button>
          </>
        )}
      </section>
    </form>
  );
}
