import { useNavigate } from "react-router-dom";

export default function MainPage({ user, setIsOpen }) {
  const navigate = useNavigate();
  return (
    <ul id="menu">
      <li
        onClick={() => {
          setIsOpen(false);
          navigate(`user/${user.id}/manage`);
        }}
      >
        Manage account
      </li>
      <li
        onClick={() => {
          setIsOpen(false);
          navigate(`user/${user.id}/conventions`);
        }}
      >
        My Events
      </li>
    </ul>
  );
}
