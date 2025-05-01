import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MapWithPlaceholder from "../Utilities/Map";
import Loading from "../Utilities/Loading";

import "../../styles/ViewConInfo.css";

export default function ViewConInfo({ supabase }) {
  const navigate = useNavigate();
  const params = useParams();
  const con_id = params.id;
  const [submitter, setSubmitter] = useState("");
  const [con, setCon] = useState({});
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sessionExists, setSessionExists] = useState(false);

  async function fetchCon(id) {
    const { data, error } = await supabase
      .from("conventions")
      .select()
      .eq("id", id);
    if (error) throw new Error("Fetching convention failed");
    setCon(data[0]);
  }

  async function getUserId() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new error(error);
    if (data.session) {
      setSessionExists(true);
      return data.session.user.id;
    }
  }

  async function fetchConSubmitter(id) {
    console.clear();
    const currId = sessionExists ? await getUserId() : null;
    if (currId === id) {
      setSubmitter("You");
      return;
    }
    console.log(con);
    console.log("user id", id);

    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("user_id", id);

    if (error)
      throw new Error(`Fetching submitter failed | Code: ${error.code}
    Message: ${error.message}
    Hint: ${error.hint}`);
    // if (data) setSubmitter(data[0]);
    console.log("data", data);
    if (data) setSubmitter(data[0].username);
  }

  if (con.id) console.log(con);
  if (submitter) console.log("submitter", submitter);

  useEffect(() => {
    if (!con_id) return;
    if (!con.id) fetchCon(con_id);
    if (con.id) {
      console.clear();
      console.log(con.tags);
      console.log(tags);
      fetchConSubmitter(con.creatorID);
      console.log(con.tags);
      setTags(con.tags.replace(/("|\[|\])/g, "").split(","));
      setStartDate(new Date(con.start_time));
      setEndDate(new Date(con.end_time));
    }
  }, [con]);
  // const [cons, loading] = useConsObject();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  if (tags.length) {
    console.log(typeof tags, tags);
  }

  function getTag(tag, i) {
    switch (tag) {
      case "adult":
        return <li key={i}>18+</li>;
      case "virtual":
        return <li key={i}>Virtual Event</li>;
      case "eu":
        return <li key={i}>Europe</li>;
      case "na":
        return <li key={i}>North America</li>;
      case "other":
        return <li key={i}>Other location</li>;
      default:
        break;
    }
  }
  if (con.id) {
    console.log("TYPEE", typeof con.start_time);

    console.log("TIMEE", con.start_time);
    console.log("PARSED", Date.parse(con.start_time));
    console.log("DATEEEE", startDate && startDate.getUTCHours());
  }
  if (!con.id) return <Loading />;
  if (con.id)
    return (
      <section id="convention-info">
        <div id="convention-info-heading">
          <button
            className="nav-button"
            onClick={() => {
              navigate("/conventions");
            }}
          >
            ←
          </button>
        </div>
        <div id="convention-info-main">
          <section id="convention-container">
            <section id="convention-details">
              {con.name && <h1>{con.name}</h1>}
              {!con.description && <p>Could not find description</p>}
              {con.description && <p>{con.description}</p>}
              {!con.start_time && <p>Could not find end time</p>}
              {startDate && (
                <p>{`Starts | ${
                  days[startDate.getDay()]
                } ${startDate.getDate()}. ${
                  months[startDate.getMonth()]
                } ${startDate.getUTCFullYear()}`}</p>
              )}
              {!con.end_time && <p>Could not find end time</p>}
              {endDate && (
                <p>{`Ends |  ${days[endDate.getDay()]} ${endDate.getDate()}. ${
                  months[endDate.getMonth()]
                } ${endDate.getUTCFullYear()}`}</p>
              )}
              {Boolean(tags.length) && (
                <>
                  <h3>Tags</h3>
                  <ul>{tags.map((tag, i) => getTag(tag, i))}</ul>
                </>
              )}
              <hr />
              {submitter && <p>Submitted by {submitter}</p>}
            </section>
            <section id="convention-options">
              <button
                disabled={sessionExists ? false : true}
                onClick={
                  () => console.log("click")
                  // TODO: ADD LOGIC
                }
              >
                Save to my cons
              </button>
              {!sessionExists && <p>Log in to save event</p>}
            </section>
          </section>
          <section id="map-container">
            {con.long && con.lat && (
              <MapWithPlaceholder
                conName={con.name}
                cords={[con.lat, con.long]}
              />
            )}
            {!con.long && !con.lat && <p>No location data</p>}
          </section>
        </div>
      </section>
    );
}
