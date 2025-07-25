import { fetchLogo } from "../../utils/fetchLogo";
import "../../styles/ConventionCard.css";
import { useNavigate } from "react-router-dom";

export default function ConventionCard({ supabase, con, type }) {
  const navigate = useNavigate();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  function formatDate(when) {
    const date = new Date(when);

    const dateObj = {
      minutes: () => {
        return date.getUTCMinutes() < 10
          ? "0" + date.getUTCMinutes()
          : date.getUTCMinutes();
      },
      hours: () => {
        return date.getUTCHours() < 10
          ? "0" + date.getUTCHours()
          : date.getUTCHours();
      },
      day: days[date.getUTCDay()],
      date: date.getUTCDate(),
      month: months[date.getUTCMonth()],
      year: date.getUTCFullYear()
    };
    return `${dateObj.day} ${dateObj.date}. ${dateObj.month} ${dateObj.year} `;
  }

  return (
    <article
      onClick={() => {
        navigate(`/conventions/${con.id}`);
      }}
      className={
        type ? "convention-card" : "convention-card convention-info-card"
      }
    >
      <figure className="convention-logo">
        <img
          src={
            con.logoFileType
              ? fetchLogo(supabase, con.name)
              : "https://cydiwehmeqivbtceuupi.supabase.co/storage/v1/object/public/convention-logos//pawlogo.png"
          }
          alt={`${con.name} logo`}
        />
      </figure>
      <section className="convention-info">
        {con.name && <h2 className="convention-name">{con.name}</h2>}
        {con.location && <p>{con.location}</p>}
        {con.spots_total && (
          <p>
            <span className="info-prefix">Total spots:</span> {con.spots_total}
          </p>
        )}
        {con.spots_total && (
          <>
            <p>
              <span className="info-prefix">Interested:</span>{" "}
              {con.spots_taken ? con.spots_taken : 0}
            </p>
            <p>
              <span className="info-prefix">Spots left*:</span>{" "}
              {con.spots_total - con.spots_taken}
            </p>
          </>
        )}
        {con.start_time && con.end_time && (
          <div className="convention-dates">
            <div>
              <span className="info-prefix">Starts:</span>{" "}
              <p>{formatDate(con.start_time)}</p>
              <span className="info-prefix">Ends:</span>
              <p>{formatDate(con.end_time)}</p>
            </div>
          </div>
        )}
      </section>
      <section>
        {con.description && (
          <div>
            <p className="convention-desc">{con.description}</p>
          </div>
        )}
      </section>
    </article>
  );
}
