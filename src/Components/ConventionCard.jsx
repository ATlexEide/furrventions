import { fetchLogo } from "../fetchLogo";
import "./ConventionCard.css";

export default function ConventionCard({ con }) {
  // con = {
  //   name: "TEST CON",
  //   lat: 0.00,
  //   long: 0.00,
  //   description: "TEST DESCRIPTION",
  //   // logo_path: "/public/pawske.png",
  //   start_time: "01-01-0101",
  //   end_time: "02-02-0202",
  //   spots_total: 200,
  //   spots_taken: 69,
  //   creatorID: "",
  //   organizerID: ""
  // };

  return (
    <article className="convention-card">
      <figure className="convention-logo">
        <img
          src={con.logo_path ? fetchLogo(con.logo_path) : "/pawske.png"}
          alt={`${con.name} logo`}
        />
      </figure>
      <section className="convention-info">
        {con.name && <h2 className="convention-name">{con.name}</h2>}
        {con.convention_location && <p>{con.convention_location}</p>}
        {con.location && <p>{con.location}</p>}
        {con.total_spots && (
          <p>
            <span className="info-prefix">Total spots:</span> {con.total_spots}
          </p>
        )}
        {con.taken_spots && (
          <p>
            <span className="info-prefix">Interested:</span> {con.taken_spots}
          </p>
        )}
        {con.total_spots && con.taken_spots && (
          <p>
            <span className="info-prefix">Spots left*:</span>{" "}
            {con.total_spots - con.taken_spots}
          </p>
        )}
        {con.start_time && con.end_time && (
          <div className="convention-dates">
            <span>
              <span className="info-prefix">Starts:</span> {con.start_time}
            </span>
            <br />
            <span>
              <span className="info-prefix">Ends:</span> {con.end_time}
            </span>
          </div>
        )}
        {con.convention_description && (
          <div>
            <h3 className="convention-desc-title">About convention:</h3>
            <p className="convention-desc">{con.convention_description}</p>
          </div>
        )}
      </section>
    </article>
  );
}
