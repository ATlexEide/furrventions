import { useState } from "react";

// CSS
import "../styles/UserButton.css";

export default function UserButton() {
  const [isOpen, setIsOpen] = useState();
  const _width = 200;
  return (
    <section id="userbutton">
      <button
        style={{ width: `${_width}px` }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Manage profile
      </button>

      {isOpen && (
        <section id="userbutton-content">
          <ul>
            <li>some option</li>
            <li>UwU</li>
            <li>Some other option</li>
          </ul>
        </section>
      )}
    </section>
  );
}
