import { useState, useEffect } from "react";
import { fetchParticipantCons, supabase } from "../../utils/SupabaseUtils";
import { NoSession } from "./Auth/NoSession";
import SavedConventionCard from "./SavedConventionCard";
import { Link } from "react-router-dom";
import "./ManageConventions.css";

export default function ManageConventions() {
  const [conventions, setConventions] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!session) {
      getUserSession();
      return;
    }

    fetchParticipantCons(session.user.id, setConventions);
  }, [session]);

  async function getUserSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) console.log(error);
    if (data) setSession(data.session);
  }

  useEffect(() => {
    if (!session) getUserSession();
  }, [session]);
  console.log(conventions);
  if (!session) return <NoSession text="Log in to manage your conventions" />;
  return (
    <section id="my-events">
      {conventions && Boolean(!conventions?.length) && (
        <>
          <img src="https://i.imgur.com/jJVyya7.png" />
          <button id="browse-events-btn">
            <Link to="/conventions">Browse conventions</Link>
          </button>
        </>
      )}

      {Boolean(conventions?.length) && (
        <ul>
          {conventions.map((data, i) => (
            <li key={i}>
              <SavedConventionCard con={data.conventions} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
