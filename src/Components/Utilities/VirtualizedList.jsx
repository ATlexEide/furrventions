import { List } from "react-window";

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);
function Row({ index, style }) {
  return <div style={style}>{items[index]}</div>;
}
export default function VirtualizedList() {
  return (
    <List
      height={400} // Height of the container
      itemCount={items.length} // Total number of items
      itemSize={35} // Height of each row in pixels
      width="100%" // Width of the container
    >
      {Row}
    </List>
  );
}
