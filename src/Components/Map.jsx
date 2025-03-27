import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function BasicMap() {
  <APIProvider
    solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
  >
    <Map
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    />
  </APIProvider>;
}
