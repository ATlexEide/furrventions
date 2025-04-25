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
  const [eventInfo, setEventInfo] = useState({
    type: null,
    name: null,
    location: null,
    price: [],
    tags: [],
    additionalInfo: null,

    organizerID: null,
    organizerName: null,
    organizerEmail: null,
    organizerPhone: null,
    organizerGroupChat: null,

    creatorID: null
  });

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  async function getSession() {
    if (user) return;
    const { data, error } = await supabase.auth.getSession();
    if (!error) setSession(data.session);
  }
  useEffect(() => {
    getSession();
    if (!session) return;
    setUser(session.user);
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
          user={user}
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
  function addEvent() {
    alert("Some logic to add event");
    navigate("/");
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
        user={user}
      />
    </>
  );
}
