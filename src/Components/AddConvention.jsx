// import { useSupabase } from "../utils/useSupabase";
import { useState } from "react";
import "../styles/Forms.css";

// Form components
import OrganizerDetails from "./FormComponents/OrganizerDetails";
import EventType from "./FormComponents/EventType";
import EventName from "./FormComponents/EventName";
import EventLocation from "./FormComponents/EventLocation";
import EventTicketInfo from "./FormComponents/EventTicketInfo";
import EventTags from "./FormComponents/EventTags";
import EventAdditionalInfo from "./FormComponents/EventAdditionalInfo";
import { useNavigate } from "react-router-dom";

export default function AddConvention() {
  const [page, setPage] = useState(0);
  const [eventInfo, setEventInfo] = useState({
    type: null,

    organizerID: null,
    organizerName: null,
    organizerEmail: null,
    organizerPhone: null,
    organizerGroupChat: null,

    creatorID: null,
    location: null
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
      component: (
        <EventType
          eventInfo={eventInfo}
          setEventInfo={setEventInfo}
          setPage={setPage}
          page={page}
        />
      )
    },
    {
      title: "Are you the organizer?",
      component: (
        <OrganizerDetails
          setPage={setPage}
          page={page}
          eventInfo={eventInfo}
          setEventInfo={setEventInfo}
        />
      )
    },
    {
      title: "Please enter {convention/meet} name",
      component: <EventName eventInfo={eventInfo} setEventInfo={setEventInfo} />
    },
    {
      title: "Please enter {convention/meet} location",
      component: (
        <EventLocation eventInfo={eventInfo} setEventInfo={setEventInfo} />
      )
    },
    {
      title: "Ticket pricing",
      component: (
        <EventTicketInfo eventInfo={eventInfo} setEventInfo={setEventInfo} />
      )
    },
    {
      title: "Please tick the boxes that apply",
      component: <EventTags eventInfo={eventInfo} setEventInfo={setEventInfo} />
    },
    {
      title: "Aaaand some additional info",
      component: (
        <EventAdditionalInfo
          eventInfo={eventInfo}
          setEventInfo={setEventInfo}
        />
      )
    }
  ];

  const navigate = useNavigate();
  function addEvent() {
    alert("Some logic to add event");
    navigate("/");
  }
  console.log(eventInfo);
  return (
    <>
      <form id="add-con">
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
                  page === pages.length - 1 ? addEvent() : setPage(page + 1);
                }}
              >
                {page === pages.length - 1 ? "Add event" : "Next"}
              </button>
            </>
          )}
        </section>
      </form>
    </>
  );
}
