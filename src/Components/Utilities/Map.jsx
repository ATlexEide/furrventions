import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Link } from "react-router-dom";
import { fetchLogo } from "../../utils/fetchLogo";

function MapPlaceholder() {
  return (
    <p>
      Map of London.{" "}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

export default function MapWithPlaceholder({
  supabase,
  conventions,
  conName = "Convention",
  icon = null,
  cords = [60.39118002058307, 5.331024627773373]
}) {
  useEffect(() => {
    console.log(conventions);
    console.log("refresh");
  }, conventions);

  console.log("filteredCons", conventions);

  let conIcon = new Icon(icon);

  conventions &&
    conventions.map((con) => {
      conIcon = new Icon({
        iconUrl: con.hasLogo
          ? fetchLogo(supabase, con.id)
          : "https://cydiwehmeqivbtceuupi.supabase.co/storage/v1/object/public/convention-images//pawlogo.png",
        iconAnchor: [0, 30],
        popupAnchor: [15, -30],
        iconSize: [30] // size of the icon
      });
      con.markerIcon = conIcon;
    });

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
            icon={con.markerIcon}
          >
            <Popup minWidth={90}>
              {<Link to={`/conventions/${con.id}`}>{con.name}</Link>}
            </Popup>
          </Marker>
        ))}

      {!conventions && (
        <Marker
          draggable={false}
          position={cords}
          ref={null}
          icon={new Icon(icon)}
        >
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
