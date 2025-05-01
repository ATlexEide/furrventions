// import { useSupabase } from "../utils/useSupabase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "../Utilities/Form";

// CSS
import "../../styles/Forms.css";

// Form components
import OrganizerDetails from "./OrganizerDetails";
import EventType from "./EventType";
import EventName from "./EventName";
import EventLocation from "./EventLocation";
import EventTicketInfo from "./EventTicketInfo";
import EventTags from "./EventTags";
import EventAdditionalInfo from "./EventAdditionalInfo";

export default function AddConvention({ supabase }) {
  const [page, setPage] = useState(0);
  const [session, setSession] = useState(null);

  const [eventInfo, setEventInfo] = useState({
    type: null,
    name: null,
    location: null,
    long: null,
    lat: null,
    price: null,
    tags: [],
    additionalInfo: null,
    website: null,

    organizerID: null,
    organizerName: null,
    organizerEmail: null,
    organizerPhone: null,
    organizerGroupChat: null,

    creatorID: null
  });
  console.log(eventInfo);

  async function getSession() {
    if (session) return;
    const { data, error } = await supabase.auth.getSession();
    if (!error) setSession(data.session);
  }
  useEffect(() => {
    if (!session) getSession();
    if (session) setEventInfo({ ...eventInfo, creatorID: session.user.id });
  }, [session]);

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
          user={session ? session.user : null}
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
      title: `Please enter ${eventInfo.type} name`,
      component: <EventName eventInfo={eventInfo} setEventInfo={setEventInfo} />
    },
    {
      title: `Please enter ${eventInfo.type} location`,
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
  async function addEvent() {
    const { error } = await supabase.from("conventions").insert(eventInfo);

    console.log(error);
    if (error) throw new Error(error);

    navigate("/conventions/");
  }

  return (
    <>
      <Form
        id={"add-con"}
        callback={addEvent}
        currentPage={page}
        setCurrentPage={setPage}
        pages={pages}
        nextBtnTxt={"Next,Add Event"}
        eventInfo={eventInfo}
        setEventInfo={setEventInfo}
        user={session ? session.user : null}
      />
    </>
  );
}
