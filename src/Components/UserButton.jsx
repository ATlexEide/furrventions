import { useState } from "react";

// CSS
import "../styles/UserButton.css";

export default function UserButton({ user, supabase }) {
  const [isOpen, setIsOpen] = useState();

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    window.location.reload();
  }
  console.log(user);

  const furname = user.user_metadata.furname ?? "User";
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
            <div id="user-menu-header">
              <h3>Logged in as {furname}</h3>
              <button
                id="close-menu"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                ✕
              </button>
            </div>
            <ul id="menu">
              <li>some option</li>
              <li>UwU</li>
              <li>Some other option</li>
            </ul>
            <button id="logout" className="red-btn" onClick={logout}>
              Log out
            </button>
          </>
        </section>
      )}
    </>
  );
}
