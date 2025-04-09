export default function EventTicketInfo({ eventInfo, setEventInfo }) {
  return (
    <>
      <div id="ticket-price">
        <label htmlFor="price">Ticket price:</label>
        <input id="price" type="number" />
        <span>eur</span>
      </div>
    </>
  );
}
