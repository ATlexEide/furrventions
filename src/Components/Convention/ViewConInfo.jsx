import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Utilities/Loading";

export default function ViewConInfo({ supabase }) {
  const navigate = useNavigate();
  const params = useParams();
  const con_id = params.id;
  const [submitter, setSubmitter] = useState("");
  console.log(con_id);
  const [con, setCon] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  async function fetchCon(id) {
    const { data, error } = await supabase
      .from("conventions")
      .select()
      .eq("id", id);
    if (error) throw new Error("Fetching convention failed");
    console.log(data);
    setCon(data[0]);
  }

  async function fetchConSubmitter(id) {
    console.clear();
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

  if (con) console.log(con);
  if (submitter) console.log("submitter", submitter);

  useEffect(() => {
    if (!con_id) return;
    if (!con.id) fetchCon(con_id);
    console.log(con);
    if (con) fetchConSubmitter(con.creatorID);
    setStartDate(new Date(con.start_time));
    setEndDate(new Date(con.end_time));
  }, [con]);
  console.log(startDate);
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
  if (!con.id) return <Loading />;
  if (con.id)
    return (
      <section>
        <button
          className="nav-button"
          onClick={() => {
            navigate("/conventions");
          }}
        >
          ←
        </button>
        <article>
          {con.name && <h1>{con.name}</h1>}
          {!con.description && <p>Could not find description</p>}
          {con.description && <p>{con.description}</p>}
          {!con.start_time && <p>Could not find end time</p>}
          {con.start_time && (
            <p>{`Starts | ${
              startDate.getHours().length > 2
                ? startDate.getHours()
                : "0" + startDate.getHours()
            }:${
              startDate.getMinutes().length > 2
                ? startDate.getMinutes()
                : "0" + startDate.getMinutes()
            } ${days[startDate.getDay()]} ${startDate.getDate()}. ${
              months[startDate.getMonth()]
            } ${startDate.getFullYear()}`}</p>
          )}
          {!con.end_time && <p>Could not find end time</p>}
          {con.end_time && (
            <p>{`Ends | ${
              endDate.getHours().length > 2
                ? endDate.getHours()
                : "0" + endDate.getHours()
            }:${
              endDate.getMinutes().length > 2
                ? endDate.getMinutes()
                : "0" + endDate.getMinutes()
            } ${days[endDate.getDay()]} ${endDate.getDate()}. ${
              months[endDate.getMonth()]
            } ${endDate.getFullYear()}`}</p>
          )}
          {submitter && <p>Submitted by {submitter}</p>}
        </article>
        <section id="map">
          <p>insert map here</p>
        </section>

        <button
          onClick={
            // TODO: ADD LOGIC
            console.log("click")
          }
        >
          Add to my cons
        </button>
      </section>
    );
}
