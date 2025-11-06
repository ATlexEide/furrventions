import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/Header.css";
import UserButton from "../User/UserButton";
import { getUserSession } from "../../utils/SupabaseUtils";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function getUser() {
      const session = await getUserSession();
      setUser(session.user);
    })();
  }, []);

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
        {user && <Link to="conventions/add">Add convention</Link>}
        {user && "|"}
        <Link to="conventions">View conventions</Link>||
        {!user && (
          <>
            <Link to="signin">Login</Link> / <Link to="signup">Signup</Link>
          </>
        )}
        {user && <UserButton user={user} />}
      </header>
    </>
  );
}
