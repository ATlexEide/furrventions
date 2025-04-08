import { useState } from "react";

// CSS
import "../styles/UserButton.css";
import MainPage from "./UserButtonComponents/MainPage";
import AccountSettings from "./UserButtonComponents/AccountSettings";

export default function UserButton({ user, supabase }) {
  const [isOpen, setIsOpen] = useState();
  const [currentPage, setCurrentPage] = useState("main");

  const pages = {
    main: <MainPage setCurrentPage={setCurrentPage} />,
    account_settings: <AccountSettings user={user} />
  };
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
              {currentPage === "main" ? "✕" : "←"}
            </button>
          </section>
          <section id="content">{pages[currentPage]}</section>
          <button id="logout" className="red-btn" onClick={logout}>
            Log out
          </button>
        </section>
      )}
    </>
  );
}
