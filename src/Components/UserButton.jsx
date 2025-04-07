import { useState } from "react";

// CSS
import "../styles/UserButton.css";

export default function UserButton() {
  const [isOpen, setIsOpen] = useState();
  const _width = 200;
  return (
    <>
      <button
        style={{
          opacity: `${isOpen ? "0" : "1"}`,
          width: `${_width}px`
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
          </>
        </section>
      )}
    </>
  );
}
