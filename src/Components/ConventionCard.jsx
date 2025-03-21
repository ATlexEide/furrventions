import { fetchLogo } from "../fetchLogo";
import "./ConventionCard.css";

export default function ConventionCard({ con }) {
  return (
    <article className="convention-card">
      <figure className="convention-logo">
        <img
          src={con.logo_path ? fetchLogo(con.logo_path) : "/pawske.png"}
          alt={`${con.convention_name} logo`}
        />
      </figure>
      <h2>{con.convention_name}</h2>
      <section className="convention-info">
        <div>
          <span>Starts: {con.start_time}</span>
          <br />
          <span>Ends: {con.end_time}</span>
        </div>
        <h3>About convention:</h3>
        <p>{con.convention_description}</p>
      </section>
    </article>
  );
}
