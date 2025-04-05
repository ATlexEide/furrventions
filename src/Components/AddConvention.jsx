// import { useSupabase } from "../utils/useSupabase";
import { useState } from "react";
import "../styles/Forms.css";

export default function AddConvention() {
  const user = { id: "test" };
  // const supabase = useSupabase();
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(0);
  const [conventionInfo, setConventionInfo] = useState({
    organizerID: user.id,
    location: location
  });

  function clearConventionInfo() {
    setLocation("");
    setConventionInfo({
      organizerID: user.id,
      name: "",
      description: "",
      start_time: undefined,
      end_time: undefined,
      website: ""
    });
  }

  // async function addConvention(obj) {
  //   obj.spots_total = 300;
  //   obj.creatorID = user.id;
  //   const { data, error } = await supabase
  //     .from("conventions")
  //     .insert(obj)
  //     .select();

  //   if (error) {
  //     switch (error.code) {
  //       case "23502":
  //         alert("Please fill out all required fields");
  //         break;
  //       case "23505":
  //         alert(
  //           "Please make sure name and website are unique to this convention"
  //         );
  //         break;

  //       default:
  //         break;
  //     }

  //     console.log(error);
  //   } else {
  //     clearConventionInfo();
  //     console.log(data);
  //   }
  // }

  const pages = [
    "What kind of event are you adding?",
    "Are you the organizer?",
    "Please enter {convention/meet} name",
    "Please enter {convention/meet} location",
    "Please tick the boxes that apply",
    "Ticket pricing",
    "Aaaand some additional info"
  ];
  return (
    <>
      <form id="add-con">
        <section>
          <h2>{pages[page]}</h2>
        </section>
        <section>
          {!page && (
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
          )}
        </section>
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
                  setPage(page + 1);
                }}
              >
                Next
              </button>
            </>
          )}
        </section>
      </form>
    </>
  );
}
