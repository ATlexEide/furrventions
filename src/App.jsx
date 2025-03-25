"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
      }}
    >
      <SignedIn>
        <h2 id="catchphrase">Welcome to {import.meta.env.VITE_APPNAME}</h2>
      </SignedIn>
      <SignedOut>
        <h2 id="catchphrase">Please sign in to access site</h2>
        <SignInButton style={{ width: "50%" }} />
      </SignedOut>
    </section>
  );
}
