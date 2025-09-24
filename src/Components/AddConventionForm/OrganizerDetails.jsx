import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import TelegramIcon from "@mui/icons-material/Telegram";

export default function OrganizerDetails({
  setPage,
  page,
  eventInfo,
  setEventInfo
}) {
  return (
    <>
      <div className="input-container">
        <button
          className="red-btn"
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
          }}
        >
          I&apos;m not the organizer
        </button>
      </div>

      <div className="input-container">
        <TextField
          id="name"
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <BadgeIcon /> Organizer name
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, organizerName: e.target.value });
          }}
        />
      </div>

      <div className="input-container">
        <TextField
          type="email"
          id="email"
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <EmailIcon /> Support Email
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, organizerEmail: e.target.value });
          }}
        />
      </div>

      <div className="input-container">
        <TextField
          type="tel"
          id="phone"
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <PhoneIcon /> Phone
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, organizerPhone: e.target.value });
          }}
        />
      </div>

      <div className="input-container">
        <TextField
          id="groupchat"
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <TelegramIcon /> Telegram / Discord
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setEventInfo({ ...eventInfo, organizerGroupChat: e.target.value });
          }}
        />
      </div>
    </>
  );
}
