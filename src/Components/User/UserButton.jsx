import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/UserButton.css";
import { logout } from "../../utils/SupabaseUtils";

export default function UserButton({ user }) {
  const [isOpen, setIsOpen] = useState();
  const navigate = useNavigate();

  const furname = user.user_metadata.furname ?? "User";
  const id = user.id;

  function closeAndGoTo(uri) {
    setIsOpen(false);
    navigate(uri);
  }

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
      ></button>

      {isOpen && (
        <section id="user-menu">
          <section id="user-menu-header">
            <h3>Logged in as {furname}</h3>
            <button
              id="close-menu"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              ✕
            </button>
          </section>

          <section id="content">
            <ul id="menu">
              <li
                onClick={() => {
                  closeAndGoTo(`user/${id}/manage`);
                }}
              >
                Manage account
              </li>

              <li
                onClick={() => {
                  closeAndGoTo(`user/${id}/conventions`);
                }}
              >
                My Events
              </li>
            </ul>
          </section>

          <button id="logout" className="red-btn" onClick={logout}>
            Log out
          </button>
        </section>
      )}
    </>
  );
}
