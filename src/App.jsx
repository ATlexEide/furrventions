"use client";

export default function Home() {
  console.log(`



    What are you looking for? UwU


    
    `);
  return (
    <main>
      <div>
        <img width="120px" src="/pawlogo.png" alt="Furrventions logo" />
        <h1>Your best friend in finding furry meets and conventions!</h1> <br />
        <h2>Coming soon!</h2>
        <a href={import.meta.env.VITE_DISCORD_INVITE_LINK}>
          <h4>Join us on discord for updates on development</h4>
        </a>
      </div>
    </main>
  );
}
