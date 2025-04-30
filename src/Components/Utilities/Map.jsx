import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapPlaceholder() {
  return (
    <p>
      Map of London.{" "}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

export default function MapWithPlaceholder({
  cords = [60.39118002058307, 5.331024627773373]
}) {
  return (
    <MapContainer
      center={cords}
      zoom={14}
      scrollWheelZoom={false}
      placeholder={<MapPlaceholder />}
    >
      <Marker draggable={false} position={cords} ref={null}>
        <Popup minWidth={90}>Convention</Popup>
      </Marker>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
