import "./Header.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ _user }) {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(_user);

  if (user.username) {
    return (
      <header>
        <figure>
          <img src="" alt="" />
        </figure>
        <Link to="/">
          <h1>Hello {user.username}</h1>
        </Link>
        <nav>
          <button>Lorem</button>
          <button>ipsum</button>
          <button>My Conventions</button>
          {user.isOrganizer && (
            <button onClick={() => navigate(`manage/${user.id}/conventions`)}>
              Manage events
            </button>
          )}
        </nav>
      </header>
    );
  }
}
