import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MapWithPlaceholder from "../Utilities/Map";
import Loading from "../Utilities/Loading";
import { fetchLogo } from "../../utils/fetchLogo";
import { TextField } from "@mui/material";
import { getSession } from "../../utils/SupabaseUtils";
import { supabase } from "../../utils/SupabaseUtils";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import RadioInput from "@mui/material/FormControlLabel";

import "../../styles/ViewConInfo.css";
import DateRangePicker from "../Utilities/DateRangePicker";
import EuroIcon from "@mui/icons-material/Euro";
import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";
import WebIcon from "@mui/icons-material/Web";

export default function ViewConInfo() {
  const radioStyle = {
    color: "var(--main-border-color)",
    "&.Mui-checked": {
      color: "white"
    }
  };

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
  const [location, setLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const [isAdult, setIsAdult] = useState(tags.includes("adult"));
  const [isVirtual, setIsVirtual] = useState(tags.includes("virtual"));
  const tagTable = {
    adult: "18+",
    virtual: "Virtual Event",
    eu: "Europe",
    na: "North America",
    sa: "South America",
    oce: "Oceania",
    asia: "Asia",
    other: "Other location"
  };

  const hasTags = Boolean(tags.length);
  // const [query, setQuery] = useState("");
  // const [result, setResult] = useState([]);
  // const [hasNewQuery, setHasNewQuery] = useState(false);
  // async function fetchLocation() {
  //   fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`)
  //     .then((res) => res.json())
  //     .then((res) => setResult(res));
  // }
  useEffect(() => {
    getSession(setSession);
  }, []);

  useEffect(() => {
    // This is gonna break whenever i add more tags... but it works for now :3
    const tags = [
      isAdult ? "adult" : null,
      isVirtual ? "virtual" : null,
      newLocation ? newLocation : location ? location : null
    ];

    const filtered = tags.filter((tag) => tag !== null);
    setTags(filtered);
    setUpdateObject({ ...updateObject, tags: filtered });
  }, [isAdult, isVirtual, newLocation]);

  useEffect(() => {
    if (!con_id) return;
    if (!con.id) fetchCon(con_id);
    if (con.id) {
      fetchConSubmitter(con.creatorID);
      const _tags = con.tags.replace(/("|\[|\])/g, "").split(",");
      setTags(_tags);
      setStartDate(new Date(con.start_time));
      setEndDate(new Date(con.end_time));
      setIsAdult(_tags.includes("adult") ? true : false);
      setIsVirtual(_tags.includes("virtual") ? true : false);
      setLocation(
        _tags.filter((tag) => tag !== "adult" && tag !== "virtual")[0]
      );
    }
  }, [con]);

  async function submitUpdate() {
    console.clear();
    console.log("UPDATING");
    console.log(updateObject);

    if (tags.length) {
      // for (const tag in tags) if (tag) updateObject.tags.push(tag);
    }
    const { data, error } = await supabase
      .from("conventions")
      .update(updateObject)
      .eq("id", con_id)
      .select("*");
    if (error) console.log(error);
    if (data) setCon(data);
  }

  async function fetchCon(id) {
    const { data, error } = await supabase
      .from("conventions")
      .select()
      .eq("id", id);
    if (error) throw new Error("Fetching convention failed");
    setCon(data[0]);
    console.log(data[0]);
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
    return tag in tagTable ? <li key={i}>{tagTable[tag]}</li> : null;
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
              <section id="convention-general">
                <section id="eventinfo-name">
                  {!isEditing && con.name && <h1>{con.name}</h1>}
                  {isEditing && (
                    <div>
                      {/*  */}
                      <div className="input-container">
                        <TextField
                          id="update-name"
                          name="update-name"
                          type="text"
                          value={
                            "name" in updateObject
                              ? updateObject.name
                              : con.name
                          }
                          label={
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4
                              }}
                            >
                              <BadgeIcon /> Convention Name
                            </span>
                          }
                          variant="outlined"
                          onChange={(e) => {
                            setUpdateObject({
                              ...updateObject,
                              name: e.target.value
                            });
                          }}
                        />
                      </div>
                      {/*  */}
                    </div>
                  )}
                </section>

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
                              <EuroIcon /> Ticket Price (EUR)
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
                  {!startDate && <p>Could not find start time</p>}
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
                  <p>{!isEditing && <strong>Location</strong>}</p>
                  {!isEditing && !con.location && (
                    <p>Unable to find location</p>
                  )}
                  {!isEditing && con.location && <p>{con.location}</p>}
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
                      <div className="input-container">
                        <TextField
                          id="edit-desc"
                          name="edit-desc"
                          type="text"
                          value={
                            "description" in updateObject
                              ? updateObject.description
                              : con.description
                          }
                          label={
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4
                              }}
                            >
                              <DescriptionIcon /> Description
                            </span>
                          }
                          variant="outlined"
                          onChange={(e) => {
                            setUpdateObject({
                              ...updateObject,
                              description: e.target.value
                            });
                          }}
                        />
                      </div>
                    </>
                  )}
                </section>

                <section id="eventinfo-website" className="info-section">
                  <p id="website" className="info-section">
                    {!isEditing && (
                      <>
                        {con.website ? (
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
                        ) : (
                          <p>
                            We could not find any website for this convention
                          </p>
                        )}
                      </>
                    )}

                    {isEditing && (
                      <>
                        <div className="input-container">
                          <TextField
                            id="update-website"
                            name="update-website"
                            type="text"
                            value={
                              "website" in updateObject
                                ? updateObject.website
                                : con.website
                                ? con.website
                                : ""
                            }
                            label={
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4
                                }}
                              >
                                <WebIcon /> Event website
                              </span>
                            }
                            variant="outlined"
                            onChange={(e) => {
                              setUpdateObject({
                                ...updateObject,
                                website: e.target.value
                              });
                            }}
                          />
                        </div>
                      </>
                    )}
                  </p>
                </section>
              </section>
              {!isEditing && hasTags && (
                <>
                  <h2>Tags</h2>
                  <ul>{tags.map((tag, i) => getTag(tag, i))}</ul>
                </>
              )}

              {isEditing && hasTags && (
                <div className="input-container">
                  <h3>Tags</h3>
                  <div className="input">
                    <label htmlFor="adult">18+</label>
                    <div>
                      <input
                        id="adult"
                        type="checkbox"
                        onChange={() => setIsAdult(!isAdult)}
                        checked={isAdult}
                      />
                    </div>
                  </div>

                  <div className="input">
                    <label htmlFor="virtual">Virtual Con</label>
                    <div>
                      <input
                        id="virtual"
                        type="checkbox"
                        onChange={() => setIsVirtual(!isVirtual)}
                        checked={isVirtual}
                      />
                    </div>
                  </div>

                  <hr />
                  <h3>Location</h3>
                  <RadioGroup
                    defaultValue={location}
                    name="location-radio-buttons-group"
                    onChange={(e) => setNewLocation(e.target.value)}
                  >
                    <RadioInput
                      value="eu"
                      control={<Radio sx={radioStyle} />}
                      label="Europe"
                    />
                    <RadioInput
                      value="na"
                      control={<Radio sx={radioStyle} />}
                      label="North America"
                    />
                    <RadioInput
                      value="sa"
                      control={<Radio sx={radioStyle} />}
                      label="South America"
                    />
                    <RadioInput
                      value="asia"
                      control={<Radio sx={radioStyle} />}
                      label="Asia"
                    />
                    <RadioInput
                      value="oce"
                      control={<Radio sx={radioStyle} />}
                      label="Oceania"
                    />
                    <RadioInput
                      value="other"
                      control={<Radio sx={radioStyle} />}
                      label="Other"
                    />
                  </RadioGroup>
                </div>
              )}

              {isEditing && (
                <button
                  onClick={() => {
                    if ("name" in updateObject && !updateObject.name) {
                      alert("Convention must have a name");
                      return;
                    }
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
                      // setQuery(null);
                      // setResult(null);
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
                    ? fetchLogo(con.id)
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
