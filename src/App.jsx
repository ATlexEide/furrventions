"use client";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <SignedIn>
        <h1>SIGNED IN</h1>
        <button onClick={() => navigate("conventions")}>Test</button>
      </SignedIn>
      <SignedOut>
        <h1>Please log in to access site</h1>
      </SignedOut>
    </>
  );
}
