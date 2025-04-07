import { useState } from "react";

// CSS
import "../styles/UserButton.css";

export default function UserButton() {
  const [isOpen, setIsOpen] = useState();
  const _width = 200;
  return (
    <>
      <button
        style={{ width: `${_width}px` }}
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
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Close
            </button>
            <ul>
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
