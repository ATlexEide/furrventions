import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function MapPlaceholder() {
  return (
    <p>
      Map of London.{" "}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

export default function MapWithPlaceholder({
  conventions,
  conName = "Convention",
  cords = [60.39118002058307, 5.331024627773373]
}) {
  useEffect(() => {
    console.clear();
    console.log(conventions);
    console.log("refresh");
  }, conventions);

  console.log("filteredCons", conventions);

  return (
    <MapContainer
      center={conventions ? [34.69039805875912, -35.210042531073285] : cords}
      zoom={conventions ? 3 : 16}
      scrollWheelZoom={true}
      placeholder={<MapPlaceholder />}
    >
      {conventions &&
        conventions.map((con, i) => (
          <Marker
            key={i}
            draggable={false}
            position={[con.lat, con.long]}
            ref={null}
          >
            <Popup minWidth={90}>
              {<Link to={`/conventions/${con.id}`}>{con.name}</Link>}
            </Popup>
          </Marker>
        ))}

      {!conventions && (
        <Marker draggable={false} position={cords} ref={null}>
          <Popup minWidth={90}>{conName}</Popup>
        </Marker>
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
