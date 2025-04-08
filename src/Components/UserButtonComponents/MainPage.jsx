import { useNavigate } from "react-router-dom";

export default function MainPage({ user, setCurrentPage }) {
  const navigate = useNavigate();
  return (
    <ul id="menu">
      <li
        onClick={() => {
          setCurrentPage("account_settings");
        }}
      >
        Account Settings
      </li>
      <li
        onClick={() => {
          setCurrentPage("main");
          navigate(`manage/${user.id}/conventions`);
        }}
      >
        My Events
      </li>
      <li>Some other option</li>
    </ul>
  );
}
