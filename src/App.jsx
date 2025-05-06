"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [wipAccepted, setWipAccepted] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("wipAlert")) {
      localStorage.setItem("wipAlert", JSON.stringify({ accepted: false }));
      setWipAccepted(false);
    }

    const wipAlert = JSON.parse(localStorage.getItem("wipAlert"));
    if (!wipAlert.accepted) setWipAccepted(false);
    console.log(wipAlert.accepted);
  }, []);

  function acceptWipAlert() {
    localStorage.setItem("wipAlert", JSON.stringify({ accepted: true }));
    setWipAccepted(true);
  }
  // Taglines for display under landing page greeting
  const taglines = [
    "Your best friend in finding furry conventions!",
    "Yippieee",
    "Finding meets and conventions made simple!",
    "Do you know about any cons in the area?",
    "I'm not a furry but",
    "Rawrrrrr"
  ];

  return (
    <>
      {!wipAccepted && (
        <div id="wipAlert">
          <h2>ATTENTION</h2>
          <p>
            This is a project in development! <br />
            There <em>will</em> be bugs and unintended behavior.
            <br />
            <br />
            If you need help with something, please contact Velvet in our
            discord server ^^
          </p>
          <hr />
          <p>(This message will only be shown once)</p>
          <button
            onClick={() => {
              acceptWipAlert();
            }}
          >
            Proceed
          </button>
        </div>
      )}
      {wipAccepted && (
        <section id="catchphrase-cont">
          <div>
            <h2 id="catchphrase">Welcome to {import.meta.env.VITE_APPNAME}</h2>
            <h3>{taglines[Math.floor(Math.random() * taglines.length)]}</h3>
          </div>
          <img id="mascot" src="mascot.png" alt="" />
        </section>
      )}

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
