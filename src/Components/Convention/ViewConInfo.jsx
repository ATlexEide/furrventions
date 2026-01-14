import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MapWithPlaceholder from "../Utilities/Map";
import Loading from "../Utilities/Loading";
import { fetchLogo } from "../../utils/fetchLogo";
import { TextField } from "@mui/material";

import "../../styles/ViewConInfo.css";
import DateRangePicker from "../Utilities/DateRangePicker";
import EuroIcon from "@mui/icons-material/Euro";
import Euro from "@mui/icons-material/Euro";

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
  const [isEditing, setIsEditing] = useState(false);
  const [updateObject, setUpdateObject] = useState({});

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [hasNewQuery, setHasNewQuery] = useState(false);

  async function fetchLocation() {
    fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`)
      .then((res) => res.json())
      .then((res) => setResult(res));
  }

  async function submitUpdate() {
    const { data, error } = await supabase
      .from("conventions")
      .update(updateObject)
      .eq("id", con_id)
      .select("*");
    if (data) setCon(data);
    if (error) console.log(error);
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
              <section id="eventinfo-name">
                {!isEditing && con.name && <h1>{con.name}</h1>}
                {isEditing && (
                  <div>
                    <label htmlFor="update-name">Name </label>
                    <input
                      type="text"
                      id="update-name"
                      name="update-name"
                      value={
                        "name" in updateObject ? updateObject.name : con.name
                      }
                      onChange={(e) => {
                        setUpdateObject({
                          ...updateObject,
                          name: e.target.value
                        });
                      }}
                    />
                  </div>
                )}
              </section>

              <section id="convention-general">
                <section id="eventinfo-ticket-price" className="info-section">
                  <p>
                    <span className="label">
                      {!isEditing && <strong>Ticket price</strong>}
                    </span>{" "}
                    {isEditing ? (
                      <div className="input-container">
                        <TextField
                          type="numbers"
                          value={
                            "ticket_price" in updateObject
                              ? updateObject.ticket_price
                              : con.ticket_price
                          }
                          label={
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4
                              }}
                            >
                              <EuroIcon /> Ticket Price
                            </span>
                          }
                          variant="outlined"
                          onChange={(e) => {
                            setUpdateObject({
                              ...updateObject,
                              ticket_price: e.target.value
                            });
                          }}
                        />
                      </div>
                    ) : con.ticket_price ? (
                      con.ticket_price + "eur"
                    ) : (
                      "Entry is free"
                    )}
                  </p>
                </section>

                <section id="eventinfo-dates" className="info-section">
                  {!startDate && <p>Could not find end time</p>}
                  {startDate && (
                    <p>
                      {!isEditing && (
                        <span className="label">
                          <strong>Starts</strong>
                        </span>
                      )}
                      {isEditing ? (
                        <>
                          <span className="label">
                            <strong>Date</strong>
                          </span>
                          <DateRangePicker
                            setData={setUpdateObject}
                            data={updateObject}
                            _value={
                              con.start_time.split("T")[0] +
                              "/" +
                              con.end_time.split("T")[0]
                            }
                          />
                        </>
                      ) : (
                        `${days[startDate.getDay()]} ${startDate.getDate()}. ${
                          months[startDate.getMonth()]
                        } ${startDate.getUTCFullYear()}`
                      )}
                    </p>
                  )}

                  {!endDate && <p>Could not find end time</p>}
                  {endDate && !isEditing && (
                    <p>
                      <span className="label">
                        <strong>Ends</strong>
                      </span>
                      {`${days[endDate.getDay()]} ${endDate.getDate()}. ${
                        months[endDate.getMonth()]
                      } ${endDate.getUTCFullYear()}`}
                    </p>
                  )}
                </section>

                <section id="eventinfo-location" className="info-section">
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
                          hasNewQuery || updateObject.location
                            ? updateObject.location
                            : con.location
                        }
                        onChange={(e) => {
                          setQuery(e.target.value);
                          if (query !== updateObject.location)
                            setHasNewQuery(true);
                        }}
                      />
                      {hasNewQuery && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            fetchLocation();
                          }}
                        >
                          Search
                        </button>
                      )}
                      {result && hasNewQuery && (
                        <ul>
                          {result.map((res, i) => (
                            <li
                              key={i}
                              onClick={() => {
                                setQuery(res.display_name);
                                setHasNewQuery(false);
                                setUpdateObject({
                                  ...updateObject,
                                  long: res.lon,
                                  lat: res.lat,
                                  location: res.display_name
                                });
                              }}
                            >
                              {res.display_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </section>
                <section id="eventinfo-description" className="info-section">
                  {!isEditing && !con.description && <p>No description</p>}
                  {!isEditing && con.description && (
                    <p>
                      <strong>Description</strong> <br />
                      {con.description}
                    </p>
                  )}
                  {isEditing && (
                    <>
                      <label htmlFor="edit-desc">Description</label>
                      <input
                        name="edit-desc"
                        id="edit-desc"
                        value={
                          "description" in updateObject
                            ? updateObject.description
                            : con.description
                        }
                        onChange={(e) => {
                          setUpdateObject({
                            ...updateObject,
                            description: e.target.value
                          });
                        }}
                      />
                    </>
                  )}
                </section>

                <section id="eventinfo-website" className="info-section">
                  {!con.website && (
                    <p id="website" className="info-section">
                      {isEditing ? (
                        <>
                          <label htmlFor="update-website">Website</label>
                          <br />
                          <input
                            id="update-website"
                            name="update-website"
                            type="text"
                            value={
                              "website" in updateObject
                                ? updateObject.website
                                : con.website
                            }
                            onChange={(e) => {
                              setUpdateObject({
                                ...updateObject,
                                website: e.target.value
                              });
                            }}
                          />
                        </>
                      ) : (
                        "We could not see any website for this convention"
                      )}
                    </p>
                  )}
                  {con.website && (
                    <p id="website" className="info-section">
                      {!isEditing && (
                        <a
                          target="_blank"
                          href={
                            con.website.includes("://")
                              ? con.website
                              : `https://${con.website}`
                          }
                        >
                          {con.website}
                        </a>
                      )}
                      {isEditing && (
                        <>
                          <label htmlFor="update-website">Website</label>
                          <br />
                          <input
                            id="update-website"
                            name="update-website"
                            type="text"
                            value={
                              "website" in updateObject
                                ? updateObject.website
                                : con.website
                            }
                            onChange={(e) => {
                              setUpdateObject({
                                ...updateObject,
                                website: e.target.value
                              });
                            }}
                          />
                        </>
                      )}
                    </p>
                  )}
                </section>
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
                    if (Object.entries(updateObject).length) submitUpdate();
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
                    onClick={() => {
                      setQuery(null);
                      setResult(null);
                      setIsEditing(!isEditing);
                    }}
                  >{`Edit ${con.type}`}</button>
                  <button className="red-btn">{`Delete ${con.type}`}</button>
                </>
              )}
            </section>
          </section>
          <section id="map-container">
            {con.long && con.lat && (
              <MapWithPlaceholder
                conventions={false}
                conName={con.name}
                icon={{
                  iconUrl: con.hasLogo
                    ? fetchLogo(supabase, con.id)
                    : "https://cydiwehmeqivbtceuupi.supabase.co/storage/v1/object/public/convention-images/pawlogo.png",
                  iconAnchor: [0, 30],
                  popupAnchor: [15, -30],
                  iconSize: [50] // size of the icon
                }}
                cords={[con.lat, con.long]}
              />
            )}
            {!con.long && !con.lat && <p>No location data</p>}
          </section>
        </div>
      </section>
    );
}
