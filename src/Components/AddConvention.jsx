import { useSupabase } from "../SupabaseHook";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import "./AddConvention.css";
import LocationSearch from "./LocationSearch";

export default function AddConvention() {
  const { user } = useUser();
  const supabase = useSupabase();
  const [conventionInfo, setConventionInfo] = useState({
    organizerID: user.id
  });
  function clearConventionInfo() {
    setConventionInfo({
      organizerID: user.id,
      name: "",
      description: "",
      start_time: undefined,
      end_time: undefined,
      website: ""
    });
  }
  async function addConvention(obj) {
    const { data, error } = await supabase
      .from("conventions")
      .insert(obj)
      .select();
    if (error) {
      switch (error.code) {
        case "23502":
          alert("Please fill out all required fields");
          break;
        case "23505":
          alert(
            "Please make sure name and website are unique to this convention"
          );
          break;

        default:
          break;
      }
      console.log(error);
    } else {
      clearConventionInfo();
      console.log(data);
    }
  }

  return (
    <>
      <form id="add-con">
        <h2>Register a convention</h2>
        <section id="add-con-inputs">
          {/* CONVENTION NAME */}
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Convention Name*"
            value={conventionInfo.name}
            onChange={(e) => {
              console.log(e.target.value);
              setConventionInfo({
                ...conventionInfo,
                name: e.target.value
              });
            }}
          />
          {/* CONVENTION DESCRIPTION */}
          <input
            required
            type="text"
            name="description"
            id="description"
            placeholder="Description*"
            value={conventionInfo.description}
            onChange={(e) => {
              setConventionInfo({
                ...conventionInfo,
                description: e.target.value
              });
            }}
          />

          <div id="date-select">
            {/* START TIME */}
            <div className="input-cont">
              <label htmlFor="start-time">Convention Starts:</label>
              <input
                required
                type="date"
                name="start-time"
                id="start-time"
                value={conventionInfo.start_time}
                onChange={(e) => {
                  setConventionInfo({
                    ...conventionInfo,
                    start_time: e.target.value
                  });
                }}
              />
            </div>

            {/* END TIME */}
            <div className="input-cont">
              <label htmlFor="start-time">Convention Ends:</label>
              <input
                required
                type="date"
                name="end-time"
                id="end-time"
                value={conventionInfo.end_time}
                onChange={(e) => {
                  setConventionInfo({
                    ...conventionInfo,
                    end_time: e.target.value
                  });
                }}
              />
            </div>
          </div>

          {/* CONVENTION WEBSITE */}
          <input
            required
            type="text"
            name="website"
            id="website"
            placeholder="Convention Website*"
            value={conventionInfo.website}
            onChange={(e) => {
              setConventionInfo({ ...conventionInfo, website: e.target.value });
            }}
          />
          {/* LOCATION */}
          <LocationSearch
            name="location"
            id="location"
            placeholder="Convention location*"
            value={conventionInfo.location}
            onChange={(e) => {
              setConventionInfo({
                ...conventionInfo,
                location: e.target.value
              });
            }}
          />
        </section>
        <p>Convention will be registered to user id {user.id}</p>
        <section id="buttons">
          <button
            id="clear-con-btn"
            onClick={(e) => {
              e.preventDefault();
              clearConventionInfo();
            }}
          >
            Clear
          </button>
          <button
            id="add-con-btn"
            onClick={(e) => {
              e.preventDefault();
              addConvention(conventionInfo);
            }}
          >
            Add
          </button>
        </section>
      </form>
    </>
  );
}
