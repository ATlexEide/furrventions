import { useState } from "react";

// CSS
import "../styles/UserButton.css";

export default function UserButton() {
  const [isOpen, setIsOpen] = useState();
  return (
    <>
      <button
        id="manage-profile"
        style={{
          opacity: `${isOpen ? "0" : "1"}`
        }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Manage profile
      </button>

      {isOpen && (
        <section id="user-menu">
          <>
            {" "}
            <button
              id="close-menu"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Close
            </button>
            <ul id="menu">
              <li>some option</li>
              <li>UwU</li>
              <li>Some other option</li>
            </ul>
            <button id="logout" className="red-btn">
              Log out
            </button>
          </>
        </section>
      )}
    </>
  );
}
