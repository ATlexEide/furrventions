import { List } from "react-window";

import "../../styles/VirtualizedList.css";
import { useEffect, useRef, useState } from "react";

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
  const [isOverflowing, setIsOverFlowing] = useState(false);
  const listItem = useRef(null);

  useEffect(() => {
    const text = listItem.current;
    const textContainer = listItem.current.parentNode;

    if (text.offsetWidth > textContainer.offsetWidth) {
      setIsOverFlowing(true);
    }
  }, []);

  return (
    <div
      className="border"
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
      style={style}
    >
      <div className={`list-item${isOverflowing ? " overflowing" : ""}`}>
        <div ref={listItem} className="list-item-text">
          <p>{locations[index].display_name}</p>
        </div>
      </div>
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
      id="list"
      rowComponent={RowComponent}
      rowCount={locations.length}
      rowHeight={100}
      rowProps={{ locations, setEventInfo, eventInfo, setQuery, setResult }}
    />
  );
}
