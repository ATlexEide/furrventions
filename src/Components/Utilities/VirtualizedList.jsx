import { List } from "react-window";

import "../../styles/VirtualizedList.css";

// function RowComponent({ index, location, style }) {
function RowComponent({
  index,
  locations,
  style,
  setEventInfo,
  eventInfo,
  setQuery,
  setResult
}) {
  console.log(style);
  console.log(locations[index]);
  return (
    <div
      className="list-item"
      onClick={() => {
        setEventInfo({
          ...eventInfo,
          long: locations[index].lon,
          lat: locations[index].lat,
          location: locations[index].display_name
        });
        setQuery(locations[index].display_name);
        setResult([]);
      }}
      // className="flex items-center justify-between"
      style={style}
    >
      <div className="list-item-text">{locations[index].display_name}</div>
      {/* <div className="text-slate-500 text-xs">{`${index + 1} of ${ */}
      <div>{`${index + 1} of ${locations.length}`}</div>
    </div>
  );
}

export default function VirtualizedList({
  locations,
  setEventInfo,
  eventInfo,
  setQuery,
  setResult
}) {
  return (
    <List
      rowComponent={RowComponent}
      rowCount={locations.length}
      rowHeight={50}
      rowProps={{ locations, setEventInfo, eventInfo, setQuery, setResult }}
    />
  );
}
