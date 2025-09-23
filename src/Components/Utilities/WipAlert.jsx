import { useEffect, useState } from "react";

export default function WipAlert() {
  const [wipAccepted, setWipAccepted] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("wipAlert")) {
      localStorage.setItem("wipAlert", JSON.stringify({ accepted: false }));
      setWipAccepted(false);
    }
  }, []);

  function acceptWipAlert() {
    localStorage.setItem("wipAlert", JSON.stringify({ accepted: true }));
    setWipAccepted(true);
  }

  return (
    <>
      {!wipAccepted && (
        <div id="wipAlert">
          <img src="/dist/construction.png" alt="construction sign" />
          <h2>ATTENTION</h2>
          <p>
            This is a project in development! <br />
            There <em>will</em> be bugs and unintended behavior.
            <br />
            <br />
            If you need help with something, please contact Velvet in our{" "}
            <a href={import.meta.env.VITE_DISCORD_INVITE_LINK} target="_blank">
              discord server
            </a>{" "}
            ^^
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
    </>
  );
}
