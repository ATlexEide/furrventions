import { useSupabase } from "../SupabaseHook";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import "./AddConvention.css";

export default function AddConvention() {
  const { user } = useUser();
  const supabase = useSupabase();
  const [conventionInfo, setConventionInfo] = useState({
    organizerID: user.id,
  });
  function clearConventionInfo() {
    setConventionInfo({
      organizerID: user.id,
      name: "",
      description: "",
      start_time: "",
      end_time: "",
      website: "",
    });
  }
  async function addConvention(obj) {
    const { data, error } = await supabase
      .from("conventions")
      .insert(obj)
      .select();
    if (error) console.log(error);
    else {
      clearConventionInfo();
      console.log(data);
    }
  }

  return (
    <>
      <form id="add-con">
        <h2>Register convention</h2>
        <section id="add-con-inputs">
          {/* CONVENTION NAME */}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Convention Name"
            value={conventionInfo.name}
            onChange={(e) => {
              console.log(e.target.value);
              setConventionInfo({
                ...conventionInfo,
                name: e.target.value,
              });
            }}
          />
          {/* CONVENTION DESCRIPTION */}
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={conventionInfo.description}
            onChange={(e) => {
              setConventionInfo({
                ...conventionInfo,
                description: e.target.value,
              });
            }}
          />

          {/* START TIME */}
          <label htmlFor="start-time">Convention starts:</label>
          <input
            type="date"
            name="start-time"
            id="start-time"
            value={conventionInfo.start_time}
            onChange={(e) => {
              setConventionInfo({
                ...conventionInfo,
                start_time: e.target.value,
              });
            }}
          />

          {/* END TIME */}
          <label htmlFor="start-time">Convention starts:</label>
          <input
            type="date"
            name="end-time"
            id="end-time"
            value={conventionInfo.end_time}
            onChange={(e) => {
              setConventionInfo({
                ...conventionInfo,
                end_time: e.target.value,
              });
            }}
          />

          <input
            type="text"
            name="website"
            id="website"
            placeholder="Convention Website"
            value={conventionInfo.website}
            onChange={(e) => {
              setConventionInfo({ ...conventionInfo, website: e.target.value });
            }}
          />
        </section>
        <section id="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              clearConventionInfo();
            }}
          >
            Clear
          </button>
          <button
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
