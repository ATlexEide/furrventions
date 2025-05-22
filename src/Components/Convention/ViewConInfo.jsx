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
  const [session, setSession] = useState(null);
  const [userIsCreator, setUserIsCreator] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [updateObject, setUpdateObject] = useState({});

  function submitUpdate() {
    alert("test");
  }

  useEffect(() => {
    getSession();
  }, []);

  async function fetchCon(id) {
    const { data, error } = await supabase
      .from("conventions")
      .select()
      .eq("id", id);
    if (error) throw new Error("Fetching convention failed");
    setCon(data[0]);
  }

  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new error(error);
    if (data) {
      setSession(data.session);
    }
  }

  async function fetchConSubmitter(id) {
    const currId = session ? session.user.id : null;
    if (currId === id) {
      setUserIsCreator(true);
      setSubmitter("You");
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("user_id", id);

    if (error)
      throw new Error(`Fetching submitter failed | Code: ${error.code}
    Message: ${error.message}
    Hint: ${error.hint}`);
    // if (data) setSubmitter(data[0]);
    if (data) setSubmitter(data[0].username);
  }

  if (con.id) console.log(con);

  useEffect(() => {
    if (!con_id) return;
    if (!con.id) fetchCon(con_id);
    if (con.id) {
      fetchConSubmitter(con.creatorID);
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
      case "sa":
        return <li key={i}>South America</li>;
      case "asia":
        return <li key={i}>Asia</li>;
      case "oceania":
        return <li key={i}>Oceania</li>;
      case "other":
        return <li key={i}>Other location</li>;
      default:
        break;
    }
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
              {!isEditing && con.name && <h1>{con.name}</h1>}
              {isEditing && (
                <div>
                  <label htmlFor="update-name">Name </label>
                  <input
                    type="text"
                    id="update-name"
                    name="update-name"
                    value={con.name}
                  />
                </div>
              )}
              <section id="convention-general">
                <section>
                  {!con.price && <p>Could not find a price</p>}
                  {con.price && (
                    <p>
                      <span className="label">
                        <strong>Ticket price</strong>
                      </span>{" "}
                      {isEditing ? (
                        <input
                          type="number"
                          value={updateObject.price || con.price}
                          onChange={(e) => {
                            setUpdateObject({
                              ...updateObject,
                              price: e.target.value
                            });
                          }}
                        />
                      ) : (
                        con.price + "eur"
                      )}
                    </p>
                  )}
                </section>
                <section id="dates" className="info-section">
                  {!startDate && <p>Could not find end time</p>}
                  {startDate && (
                    <p>
                      <span className="label">
                        <strong>Starts</strong>
                      </span>
                      {isEditing ? (
                        <input
                          className="picker"
                          type="date"
                          value={startDate}
                          onChange={(e) =>
                            setUpdateObject({
                              ...updateObject,
                              start_time: e.target.value
                            })
                          }
                        />
                      ) : (
                        `${days[startDate.getDay()]} ${startDate.getDate()}. ${
                          months[startDate.getMonth()]
                        } ${startDate.getUTCFullYear()}`
                      )}
                    </p>
                  )}
                  {!endDate && <p>Could not find end time</p>}
                  {endDate && (
                    <p>
                      <span className="label">
                        <strong>Ends</strong>
                      </span>
                      {isEditing ? (
                        <input
                          className="picker"
                          type="date"
                          value={new Date(endDate)}
                          onChange={(e) =>
                            setUpdateObject({
                              ...updateObject,
                              end_time: e.target.value
                            })
                          }
                        />
                      ) : (
                        `${days[endDate.getDay()]} ${endDate.getDate()}. ${
                          months[endDate.getMonth()]
                        } ${endDate.getUTCFullYear()}`
                      )}
                    </p>
                  )}
                </section>
                <section className="info-section">
                  <p>
                    {isEditing ? (
                      <label htmlFor="update-location">Location</label>
                    ) : (
                      <strong>Location</strong>
                    )}
                  </p>
                  {!isEditing && !con.location && (
                    <p>Unable to find location</p>
                  )}
                  {!isEditing && con.location && <p>{con.location}</p>}
                  {isEditing && (
                    <>
                      <input
                        id="update-location"
                        name="update-location"
                        type="text"
                        value={
                          "location" in updateObject
                            ? updateObject.location
                            : con.location
                        }
                        onChange={(e) => {
                          setUpdateObject({
                            ...updateObject,
                            location: e.target.value
                          });
                        }}
                      />
                    </>
                  )}
                </section>
                {!isEditing && !con.description && <p>No description</p>}
                {!isEditing && con.description && (
                  <p>
                    <strong>Description</strong> <br />
                    con.description
                  </p>
                )}
                {isEditing && (
                  <>
                    <label htmlFor="edit-desc">Description</label>
                    <input
                      name="edit-desc"
                      id="edit-desc"
                      value={con.description}
                    />
                  </>
                )}
                {!con.website && <p>No website submitted</p>}
                {con.website && (
                  <p id="website" className="info-section">
                    <a
                      target="_blank"
                      href={
                        con.website.includes("://")
                          ? con.website
                          : `https://${con.website}`
                      }
                    >
                      {isEditing ? (
                        <>
                          <label htmlFor="update-website">Website</label>
                          <br />
                          <input
                            id="update-website"
                            name="update-website"
                            type="text"
                            value={con.website}
                            onChange={(e) => {
                              setUpdateObject({
                                ...updateObject,
                                website: e.target.value
                              });
                            }}
                          />
                        </>
                      ) : (
                        con.website
                      )}
                    </a>
                  </p>
                )}
              </section>
              {Boolean(tags.length) && (
                <>
                  <h2>Tags</h2>
                  <ul>{tags.map((tag, i) => getTag(tag, i))}</ul>
                </>
              )}
              {isEditing && (
                <button
                  onClick={() => {
                    submitUpdate();
                    setIsEditing(false);
                  }}
                >
                  Save Changes
                </button>
              )}
              <hr />
              {submitter && <p id="submitter">Submitted by {submitter}</p>}
            </section>
            <section id="convention-options">
              <button
                disabled={session ? false : true}
                onClick={
                  () => console.log("click")
                  // TODO: ADD LOGIC
                }
              >
                Save to my events
              </button>
              {!session && <p>Log in to save event</p>}
              {userIsCreator && (
                <>
                  <button
                    className="orange-btn"
                    onClick={() => setIsEditing(!isEditing)}
                  >{`Edit ${con.type}`}</button>
                  <button className="red-btn">{`Delete ${con.type}`}</button>
                </>
              )}
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
