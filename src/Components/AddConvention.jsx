// import { useSupabase } from "../utils/useSupabase";
import { useState } from "react";
import "../styles/Forms.css";

import OrganizerDetails from "./FormComponents/OrganizerDetails";
import EventType from "./FormComponents/EventType";
import EventName from "./FormComponents/EventName";
import EventLocation from "./FormComponents/EventLocation";
import EventTicketInfo from "./FormComponents/EventTicketInfo";
import EventTags from "./FormComponents/EventTags";
import EventAdditionalInfo from "./FormComponents/EventAdditionalInfo";

export default function AddConvention() {
  // const supabase = useSupabase();
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(0);
  const [conventionInfo, setConventionInfo] = useState({
    organizerID: "user.id",
    location: location
  });

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
    {
      title: "What kind of event are you adding?",
      component: <EventType setPage={setPage} page={page} />
    },
    { title: "Are you the organizer?", component: <OrganizerDetails /> },
    { title: "Please enter {convention/meet} name", component: <EventName /> },
    {
      title: "Please enter {convention/meet} location",
      component: <EventLocation />
    },
    { title: "Ticket pricing", component: <EventTicketInfo /> },
    { title: "Please tick the boxes that apply", component: <EventTags /> },
    { title: "Aaaand some additional info", component: <EventAdditionalInfo /> }
  ];
  return (
    <>
      <form id="add-con">
        <section>
          <h2>{pages[page].title}</h2>
        </section>
        <section>{pages[page].component}</section>
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
