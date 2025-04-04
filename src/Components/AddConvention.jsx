// import {
//   APILoader,
//   PlacePicker
// } from "@googlemaps/extended-component-library/react";
import { useSupabase } from "../utils/useSupabase";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import "../styles/AddConvention.css";

export default function AddConvention() {
  const { user } = useUser();
  const supabase = useSupabase();
  const [location, setLocation] = useState("");
  const [page, setPage] = useState("type");
  const [conventionInfo, setConventionInfo] = useState({
    organizerID: user.id,
    location: location
  });

  function clearConventionInfo() {
    setLocation("");
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
    obj.spots_total = 300;
    obj.creatorID = user.id;
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

  const titles = {
    type: "What kind of event are you adding?",
    askForOrganizer: "Are you the organizer?",
    organizerInfo: "Please enter {convention/meet} name",
    location: "Please enter {convention/meet} location",
    tags: "Please tick the boxes that apply",
    tickets: "Ticket pricing",
    info: "Aaaand some additional info"
  };
  const keys = Object.keys(titles);
  return (
    <>
      <form id="add-con">
        <section>
          <h2>{titles[page]}</h2>
        </section>
        <section>
          {page === "type" && (
            <>
              <button
                onClick={() => {
                  setPage("askForOrganizer");
                }}
              >
                Convention
              </button>
              <button
                onClick={() => {
                  setPage("askForOrganizer");
                }}
              >
                Meet
              </button>
            </>
          )}
        </section>
        <section>
          {page !== "type" && (
            <>
              <button
                onClick={() => {
                  setPage(keys.at(keys.indexOf(page) - 1));
                }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  setPage(keys.at(keys.indexOf(page) + 1));
                }}
              >
                Next
              </button>
            </>
          )}
        </section>
      </form>
    </>
  );
}
