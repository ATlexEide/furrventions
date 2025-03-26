import { Link } from "react-router-dom";
import "./Header.css";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  const { user } = useUser();

  const DotIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    );
  };
  return (
    <>
      <SignedOut>
        <header></header>
      </SignedOut>
      <SignedIn>
        <header>
          {user && (
            <Link id="header-home" to="/">
              <h1>
                Hello,{" "}
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                !
              </h1>
            </Link>
          )}
          <Link to="conventions/add">Add convention</Link>
          <Link to="conventions">View conventions</Link>|
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Manage my conventions"
                labelIcon={<DotIcon />}
                href={`/user/${user.id}/manage/conventions`}
              />
            </UserButton.MenuItems>
          </UserButton>
        </header>
      </SignedIn>
    </>
  );
}
