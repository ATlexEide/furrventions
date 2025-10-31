import { useState } from "react";
import "cally";
import "../../styles/DateRangePicker.css";

export default function DateRangePicker({ setEventInfo, eventInfo }) {
  const [value, setValue] = useState("");

  const getDateHandler = (e) => {
    setValue(e.target.value);

    const [date_start, date_end] = e.target.value.split("/");

    if (date_start === date_end) {
      setEventInfo({
        ...eventInfo,
        start_time: null,
        end_time: null
      });
      return;
    }

    setEventInfo({
      ...eventInfo,
      start_time: date_start,
      end_time: date_end
    });
  };

  return (
    <calendar-range
      id="calendar"
      months={2}
      value={value}
      onchange={getDateHandler}
      onClick={(e) => console.log(e.target.value)}
    >
      <div id="calendar-container">
        <calendar-month />
        <calendar-month offset={1} />
      </div>
    </calendar-range>
  );
}
