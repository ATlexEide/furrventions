import { useState } from "react";

import MainPage from "./MainPage";
import "../../styles/UserButton.css";

export default function UserButton({ user, supabase }) {
  const [isOpen, setIsOpen] = useState();
  const [currentPage, setCurrentPage] = useState("main");

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    window.location.reload();
  }

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
      ></button>

      {isOpen && (
        <section id="user-menu">
          <section id="user-menu-header">
            <h3>Logged in as {furname}</h3>
            <button
              id="close-menu"
              onClick={() => {
                currentPage === "main"
                  ? setIsOpen(!isOpen)
                  : setCurrentPage("main");
              }}
            >
              ✕
            </button>
          </section>
          <section id="content">
            <MainPage user={user} setIsOpen={setIsOpen} />
          </section>
          <button id="logout" className="red-btn" onClick={logout}>
            Log out
          </button>
        </section>
      )}
    </>
  );
}
