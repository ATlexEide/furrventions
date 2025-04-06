import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const user = { username: "velvet" };

  return (
    <>
      <header>
        <figure id="logo-container">
          <Link to="/">
            <img id="logo" src="/pawlogo.png" alt="" />
          </Link>
        </figure>
        {user && (
          <h1 id="header-home">
            Hello,{" "}
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!
          </h1>
        )}
        <Link to="conventions/add">Add convention</Link> |
        <Link to="conventions">View conventions</Link>||
        <Link to="login">Login</Link> /<Link to="signup">Signup</Link>
      </header>
    </>
  );
}
