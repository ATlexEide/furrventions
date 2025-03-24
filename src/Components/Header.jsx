import "./Header.css";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Header({ _user }) {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(_user);

  if (user.username) {
    return (
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    );
  }
}
