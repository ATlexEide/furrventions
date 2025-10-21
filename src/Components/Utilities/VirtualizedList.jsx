import { List } from "react-window";

import "../../styles/VirtualizedList.css";

// function RowComponent({ index, location, style }) {
function RowComponent({ index, locations, style }) {
  console.log(style);
  console.log(locations[index]);
  return (
    <div
      className="list-item"
      onClick={() => console.log(locations[index])}
      // className="flex items-center justify-between"
      style={style}
    >
      <div className="list-item-text">{locations[index].display_name}</div>
      {/* <div className="text-slate-500 text-xs">{`${index + 1} of ${ */}
      <div>{`${index + 1} of ${locations.length}`}</div>
    </div>
  );
}

export default function VirtualizedList({ locations }) {
  return (
    <List
      rowComponent={RowComponent}
      rowCount={locations.length}
      rowHeight={50}
      rowProps={{ locations }}
    />
  );
}
