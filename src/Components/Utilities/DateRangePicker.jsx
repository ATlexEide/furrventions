import "cally";
import "../../styles/DateRangePicker.css";

export default function DateRangePicker({ setValue, value }) {
  return (
    <calendar-range
      id="calendar"
      months={2}
      value={value}
      onchange={(event) => setValue(event.target.value)}
    >
      <div id="calendar-container">
        <calendar-month />
        <calendar-month offset={1} />
      </div>
    </calendar-range>
  );
}
