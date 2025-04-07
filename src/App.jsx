"use client";
import { useEffect, useState } from "react";

export default function Home({ supabase }) {
  // Taglines for display under landing page greeting
  const taglines = [
    "Your best friend in finding furry conventions!",
    "Yippieee",
    "Finding meets and conventions made simple!",
    "Do you know about any cons in the area?",
    "I'm not a furry but"
  ];

  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data, error } = supabase.auth.getSession();
    if (error) console.log(error);
    if (data) setUser(data);
    console.log(data);
  }, []);
  console.log("user", user);
  return (
    <section id="catchphrase-cont">
      <div>
        <h2 id="catchphrase">Welcome to {import.meta.env.VITE_APPNAME}</h2>
        <h3>{taglines[Math.floor(Math.random() * taglines.length)]}</h3>
      </div>
      <img id="mascot" src="mascot.png" alt="" />
    </section>
  );
}
