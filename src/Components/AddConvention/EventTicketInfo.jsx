import { useEffect } from "react";

export default function EventTicketInfo({
  setIsNotValid,
  eventInfo,
  setEventInfo
}) {
  useEffect(() => {
    if (eventInfo.price) setIsNotValid(false);
  }, [eventInfo]);

  return (
    <>
      <div id="ticket-price">
        <p>(Lowest cost for a ticket in euro)</p>
        <input
          id="price"
          type="number"
          value={eventInfo.price}
          onChange={(e) => {
            setEventInfo({ ...eventInfo, price: e.target.value });
          }}
        />
      </div>
      <div>
        <p>Ticket price: {eventInfo.price ? eventInfo.price : "__"} eur</p>
      </div>
    </>
  );
}
