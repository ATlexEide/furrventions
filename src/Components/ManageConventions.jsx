import { useState, useEffect } from "react";

export default function ManageConventions({ supabase }) {
  const [conventions, setConventions] = useState(null);
  const [session, setSession] = useState(null);

  async function getUserSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) console.log(error);
    if (data) setSession(data.session);
  }

  async function fetchUserCons() {
    if (!session) getUserSession();
    const { data, error } = await supabase
      .from("participants")
      .select(
        `
      conventions (
        *
      )
    `
      )
      .eq("userID", session.user.id);
    if (error) console.log(error);
    if (data) setConventions(data);
  }

  useEffect(() => {
    if (!session) getUserSession();
    if (session) fetchUserCons();
  }, [session]);

  if (session) console.log(session.user.id);
  if (conventions) console.log(conventions);

  return (
    <ul>
      {conventions &&
        conventions.map((data, i) => <li key={i}>{data.conventions.name}</li>)}
    </ul>
  );
}
