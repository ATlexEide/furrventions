import { useState } from "react";

export default function WipAlert() {
  const [wipAccepted, setWipAccepted] = useState(true);

  if (!localStorage.getItem("wipAlert")) {
    localStorage.setItem("wipAlert", JSON.stringify({ accepted: false }));
    setWipAccepted(false);
  }

  const wipAlert = JSON.parse(localStorage.getItem("wipAlert"));
  if (!wipAlert.accepted) setWipAccepted(false);
  console.log(wipAlert.accepted);

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
    </>
  );
}
