"use client";
export default function Home() {
  // Taglines for display under landing page greeting
  const taglines = [
    "Your best friend in finding furry conventions!",
    "Yippieee",
    "Finding meets and conventions made simple!",
    "Do you know about any cons in the area?",
    "I'm not a furry but"
  ];

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
