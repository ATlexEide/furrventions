import { useEffect } from "react";
import { resetPassword } from "./utils/SupabaseUtils";

export default function Home() {
  // Taglines for display under landing page greeting
  const taglines = [
    "Your best friend in finding furry conventions!",
    "Yippieee",
    "Finding meets and conventions made simple!",
    "Do you know about any cons in the area?",
    "I'm not a furry but..",
    "Rawrrrrr",
    ":3",
    "OwO"
  ];

  useEffect(() => {
    resetPassword();
  }, []);

  return (
    <>
      <section id="catchphrase-cont">
        <div>
          <h2 id="catchphrase">Welcome to {import.meta.env.VITE_APPNAME}</h2>
          <h3>{taglines[Math.floor(Math.random() * taglines.length)]}</h3>
        </div>
        <img id="mascot" src="mascot.png" alt="" />
      </section>

      <section id="mobile-catch">
        <img id="logo" src="pawlogo.png" alt="" />
        <p>
          We&apos;re working on the mobile version! <br /> <br />
          For now, please visit on desktop to view the site ^^
        </p>
        <a href={import.meta.env.VITE_DISCORD_INVITE_LINK}>
          <h4>Join us on discord for updates on development</h4>
        </a>
      </section>
    </>
  );
}
