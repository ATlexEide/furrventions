"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <section id="catchphrase-cont">
      <SignedIn>
        <div>
          <h2 id="catchphrase">Welcome to {import.meta.env.VITE_APPNAME}</h2>
          <h3>Your best friend in finding furry conventions!</h3>
        </div>
        <img id="mascot" src="mascot.png" alt="" />
      </SignedIn>
      <SignedOut>
        <h2 id="catchphrase">Please sign in to access site</h2>
        <SignInButton style={{ width: "50%" }} />
      </SignedOut>
    </section>
  );
}
