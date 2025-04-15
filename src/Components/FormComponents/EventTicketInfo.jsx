import { useState } from "react";

export default function EventTicketInfo({ eventInfo, setEventInfo }) {
  const [price, setPrice] = useState();
  return (
    <>
      <div id="ticket-price">
        <input
          id="price"
          type="number"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>
      <div>
        <p>Ticket price: {price ? price : "__"} eur</p>
      </div>
    </>
  );
}
