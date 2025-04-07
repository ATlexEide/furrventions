import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Header.css";
import UserButton from "./UserButton";

export default function Header({ supabase }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  async function getSession() {
    if (user) return;
    const { data, error } = await supabase.auth.getSession();
    if (!error) setSession(data.session);
  }
  useEffect(() => {
    getSession();
    if (!session) return;
    setUser(session.user);
  }, [session]);

  console.log("HEADER SESSION", session);
  console.log("HEADER USER", user);
  return (
    <>
      <header>
        <figure id="logo-container">
          <Link to="/">
            <img id="logo" src="/pawlogo.png" alt="" />
          </Link>
        </figure>
        <h1 id="header-home">
          {user && `Hello, ${user.user_metadata.furname}!`}
        </h1>
        <Link to="conventions/add">Add convention</Link> |
        <Link to="conventions">View conventions</Link>||
        {!session && (
          <>
            <Link to="signin">Login</Link> / <Link to="signup">Signup</Link>
          </>
        )}
        {user && <UserButton supabase={supabase} />}
      </header>
    </>
  );
}
