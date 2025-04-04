import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-part">
        <p>Developed by {import.meta.env.VITE_DEVHANDLE}</p>
      </div>{" "}
      |
      <div className="footer-part">
        <Link to="/support">Support Me on Ko-fi</Link>
      </div>{" "}
      |
      <div className="footer-part">
        <ul className="socials">
          <li>Socials //</li>
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/alexander-eide/"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/ATlexEide">
              GitHub
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.alexandereide.com/">
              Website
            </a>
          </li>
        </ul>
      </div>
      |{" "}
      <div className="footer-part">
        <ul className="socials">
          <li>Furrventions socials //</li>
          <li>
            <a target="_blank" href="https://x.com/furrventions">
              Twitter
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://bsky.app/profile/furrventions.bsky.social"
            >
              Bsky
            </a>
          </li>
          <li>
            <a target="_blank" href="https://discord.gg/WvbYgkprZd">
              Discord
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
