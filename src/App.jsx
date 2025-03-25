"use client";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Home() {
  return (
    <>
      <SignedIn>
        <h2>Welcome to {import.meta.env.VITE_APPNAME}</h2>
      </SignedIn>
      <SignedOut>
        <h1>Please log in to access site</h1>
      </SignedOut>
    </>
  );
}
