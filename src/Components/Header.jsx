import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        {user && (
          <Link to="/">
            <h1>
              Hello,
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!
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
      </SignedIn>
    </header>
  );
}
