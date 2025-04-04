import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const user = { username: "velvet" };

  return (
    <>
      {/* <SignedOut>
        <header>
          <figure id="logo-container">
            <Link to="/">
              <img id="logo" src="/pawlogo.png" alt="" />
            </Link>
          </figure>
          <h1 id="header-home">Hello, Guest!</h1>
          <Link to="conventions">View conventions</Link>||
          <Link to="signin">Login</Link> / <Link to="signup">Signup</Link>
        </header>
      </SignedOut> */}
      {/* <SignedIn> */}
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
        {/* <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Manage my conventions"
                labelIcon={<DotIcon />}
                href={`/user/${user && user.id}/manage/conventions`}
              />
            </UserButton.MenuItems>
          </UserButton> */}
      </header>
      {/* </SignedIn> */}
    </>
  );
}
