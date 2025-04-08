export default function MainPage({ setCurrentPage }) {
  return (
    <ul id="menu">
      <li
        onClick={() => {
          setCurrentPage("account_settings");
        }}
      >
        Account Settings
      </li>
      <li>My Events</li>
      <li>Some other option</li>
    </ul>
  );
}
