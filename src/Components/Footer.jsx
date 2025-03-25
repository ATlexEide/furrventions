import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <p>Developed by {import.meta.env.VITE_DEVHANDLE}</p>
      <ul id="socials">
        <p>Socials //</p>
        <li>
          <a href="https://www.linkedin.com/in/alexander-eide/">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/ATlexEide">GitHub</a>
        </li>
        <li>
          <a href="https://www.alexandereide.com/">Website</a>
        </li>
      </ul>
    </footer>
  );
}
