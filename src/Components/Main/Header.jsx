import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/Header.css";
import UserButton from "../User/UserButton";

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
        {session && <Link to="conventions/add">Add convention</Link>}
        {session && "|"}
        <Link to="conventions">View conventions</Link>||
        {!session && (
          <>
            <Link to="signin">Login</Link> / <Link to="signup">Signup</Link>
          </>
        )}
        {user && <UserButton user={user} supabase={supabase} />}
      </header>
    </>
  );
}
