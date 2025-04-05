export default function EventTicketInfo({ eventInfo, setEventInfo }) {
  return (
    <>
      <label htmlFor="price">Ticket price:</label>
      <input id="price" type="number" />
      <span>eur</span>
    </>
  );
}
