import { useState, useEffect } from "react";
import { fetchParticipantCons, supabase } from "../../utils/SupabaseUtils";
import { NoSession } from "./NoSession";

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
    <ul>
      {conventions &&
        conventions.map((data, i) => <li key={i}>{data.conventions.name}</li>)}
    </ul>
  );
}
