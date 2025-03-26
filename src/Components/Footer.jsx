import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-part">
        <p>Developed by {import.meta.env.VITE_DEVHANDLE}</p>
      </div>{" "}
      |
      <div className="footer-part">
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
      </div>
      |{" "}
      <div className="footer-part">
        <Link to="support">Support Me</Link>
      </div>
    </footer>
  );
}
