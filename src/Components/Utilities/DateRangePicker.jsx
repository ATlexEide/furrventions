import { useState } from "react";
import "cally";
import "../../styles/DateRangePicker.css";

export default function DateRangePicker({ setData, data, _value = null }) {
  const [value, setValue] = useState(_value ? _value : "");

  const getDateHandler = (e) => {
    setValue(e.target.value);

    const [date_start, date_end] = e.target.value.split("/");

    if (date_start === date_end) {
      setData({
        ...data,
        start_time: null,
        end_time: null
      });
      return;
    }

    setData({
      ...data,
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
