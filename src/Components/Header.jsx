import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Header.css";
import UserButton from "./UserButton";

export default function Header({ supabase }) {
  const [user, setUser] = useState(null);

  async function getSession() {
    if (user) return;
    const { data, error } = await supabase.auth.getSession();
    if (error) console.log(error);
    console.log("session data", data.session.user);
    setUser(data.session.user);
  }
  useEffect(() => {
    if (user) return;
    getSession();
  }, []);
  useEffect(() => {}, [user]);
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
        <Link to="signin">Login</Link> /<Link to="signup">Signup</Link>
        {user && <UserButton supabase={supabase} />}
      </header>
    </>
  );
}
