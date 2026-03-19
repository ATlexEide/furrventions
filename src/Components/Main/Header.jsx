import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/Header.css";
import UserButton from "../User/UserButton";
import { getUserSession, logout } from "../../utils/SupabaseUtils";

export default function Header() {
  const mobileWidth = 900;
  const [user, setUser] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileWidth);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const navigate = useNavigate();
  const id = user?.id;

  function closeAndGoTo(uri) {
    setIsBurgerOpen(false);
    navigate(uri);
  }
  function checkScreenSize() {
    setIsMobile(window.innerWidth <= mobileWidth);
  }

  useEffect(() => {
    (async function getUser() {
      const session = await getUserSession();
      if (session) setUser(session.user);
    })();

    window.addEventListener("resize", checkScreenSize);

    checkScreenSize();
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  if (!isMobile)
    return (
      <>
        <header>
          <figure id="logo-container">
            <Link to="/">
              <img id="logo" src="/pawlogo.png" alt="" />
            </Link>
          </figure>
          <h1 id="header-home">
            {user && `Hello, ${user.user_metadata.furname}!`}
          </h1>
          <nav>
            {user && <Link to="conventions/add">Add convention</Link>}
            {user && "|"}
            <Link to="conventions">View conventions</Link>
            {!user && (
              <div id="user-container">
                <Link to="signin">Login</Link> / <Link to="signup">Signup</Link>
              </div>
            )}
            {user && (
              <div id="user-container">
                <>
                  {`${user.user_metadata.furname}`} <UserButton user={user} />
                </>
              </div>
            )}
          </nav>
        </header>
      </>
    );

  function toggleNoScroll() {
    if (document.body.classList.contains("noscroll"))
      document.body.classList.remove("noscroll");
    else document.body.classList.add("noscroll");
  }

  function clickHandler() {
    toggleNoScroll();
    setIsBurgerOpen(false);
  }

  if (isMobile)
    return (
      <>
        <header>
          <figure id="logo-container">
            <Link to="/">
              <img id="logo" src="/pawlogo.png" alt="" />
            </Link>
          </figure>
          <h1 id="header-home">
            {user && `Hello, ${user.user_metadata.furname}!`}
          </h1>

          <nav
            id="hamburger-nav"
            className={`${isBurgerOpen ? "nav-open" : null}`}
          >
            <button
              className="mobile"
              id="hamburger-toggle"
              onClick={() => {
                toggleNoScroll();
                setIsBurgerOpen(!isBurgerOpen);
              }}
            >
              <img
                id="burger-icon"
                src={isBurgerOpen ? "/close.svg" : "/burger-icon.svg"}
                alt=""
              />
            </button>
            <section id="burger-menu" hidden={!isBurgerOpen}>
              {!user && (
                <div id="user-container">
                  <ul>
                    <li>
                      <Link to="conventions" onClick={clickHandler}>
                        View Conventions
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <Link to="signin" onClick={clickHandler}>
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link to="signup" onClick={clickHandler}>
                        Sign up
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              {user && (
                <>
                  <ul>
                    <li>
                      <Link to="conventions" onClick={clickHandler}>
                        View Conventions
                      </Link>
                    </li>
                    <li>
                      <Link to="conventions/add" onClick={clickHandler}>
                        Add convention
                      </Link>
                    </li>
                  </ul>
                  <div id="user-container">
                    <hr />
                    <h2>{`Logged in as ${user.user_metadata.furname}`}</h2>
                    <ul>
                      <li
                        onClick={() => {
                          closeAndGoTo(`user/${id}/manage`);
                        }}
                      >
                        Manage account
                      </li>
                      <li>
                        <button
                          id="logout"
                          className="red-btn"
                          onClick={logout}
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </section>
          </nav>
        </header>
      </>
    );
}
