import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { placeMarker } from "../utils/placeMarker.jsx";

export function BasicMap({ cons }) {
  if (!cons) {
    throw new Error("No cons in map");
  }
  <div id="map">
    <APIProvider
      solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    >
      <Map
        defaultZoom={8}
        defaultCenter={{ lat: 59.9138688, lng: 10.7522454 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {cons.map((con, i) => placeMarker(con, i))}
      </Map>
    </APIProvider>
  </div>;
}
