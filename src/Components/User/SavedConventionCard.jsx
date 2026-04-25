import { fetchLogo } from "../../utils/fetchLogo";
import "../../styles/ConventionCard.css";
import { useNavigate } from "react-router-dom";

export default function SavedConventionCard({ con, type }) {
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

  function getDaysLeft() {
    const today = new Date().getTime();
    const start = new Date(con.start_time).getTime();
    return Math.ceil((start - today) / (1000 * 60 * 60 * 24));
  }
  return (
    <a href={`/conventions/${con.id}`} className="saved">
      <article
        onClick={() => {
          navigate(`/conventions/${con.id}`);
        }}
        className={
          type ? "convention-card" : "convention-card convention-info-card"
        }
      >
        <div className="mobile logo-cover"></div>
        {!con.organizerID && <div className="notice">Community added</div>}
        <div className="main-info-container">
          <figure className="convention-logo">
            <img
              src={
                con.hasLogo
                  ? fetchLogo(con.id)
                  : "https://cydiwehmeqivbtceuupi.supabase.co/storage/v1/object/public/convention-images/pawlogo.png"
              }
              alt={`${con.name} logo`}
            />
          </figure>
          <section className="convention-info">
            {con.name && <h2 className="convention-name">{con.name}</h2>}
            <p>@</p>
            {con.location && <p>{con.location}</p>}
            {con.start_time && con.end_time && (
              <div className="convention-dates">
                <div>
                  <p>{formatDate(con.start_time)}</p>
                  <p>↓</p>
                  <p>{formatDate(con.end_time)}</p>
                </div>
              </div>
            )}
          </section>
          <section>{`${getDaysLeft()} days left`}</section>
        </div>
      </article>
    </a>
  );
}
