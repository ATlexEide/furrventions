"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function Home() {
  // Taglines for display under landing page greeting
  const taglines = [
    "Your best friend in finding furry conventions!",
    "Yippieee",
    "Finding meets and conventions made simple!"
  ];

  return (
    <section id="catchphrase-cont">
      <div>
        <img width="120px" src="/pawlogo.png" alt="Furrventions logo" />
        <h2>Coming soon!</h2>
        <h3>Join us on discord for updates on development</h3>
        <p>
          <a href="https://discord.gg/BGhRuR2C5d">
            Click here for the invite link
          </a>
        </p>
      </div>
    </section>
  );
}
