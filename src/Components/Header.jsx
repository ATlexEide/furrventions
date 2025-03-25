import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useUser();
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
          <button
            onClick={() => {
              navigate("conventions/add");
            }}
          >
            Add convention
          </button>
          <button
            onClick={() => {
              navigate("conventions");
            }}
          >
            View conventions
          </button>
          <UserButton />
        </header>
      </SignedIn>
    </>
  );
}
