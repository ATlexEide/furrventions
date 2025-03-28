import { Marker } from "@vis.gl/react-google-maps";
export function placeMarker(con, i) {
  async function fetchAndPlace(con, i) {
    const loc = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&place_id=${con.location}`
    )
      .then((res) => res.json())
      .then((res) => res.results[0].geometry.location);
    return <Marker key={i} position={loc} />;
  }
  fetchAndPlace(con, i);
  console.log("MARKER CON LOCATION", con.location);
}
