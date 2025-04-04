import { placeMarker } from "../utils/placeMarker.jsx";

export function BasicMap({ cons }) {
  if (!cons) {
    throw new Error("No cons in map");
  }
  <div id="map"></div>;
}
