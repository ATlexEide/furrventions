import {
  APILoader,
  PlacePicker
} from "@googlemaps/extended-component-library/react";
import React from "react";
import "./LocationSearch.css";

export default function LocationSearch({ placeholder }) {
  const [formattedAddress, setFormattedAddress] = React.useState("");
  const handlePlaceChange = (e) => {
    console.log(e.target.value);
    setFormattedAddress(e.target.value?.formattedAddress ?? "");
  };
  const countries = [];

  return (
    <div>
      <APILoader
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        solutionChannel="GMP_GCC_placepicker_v1"
      />
      <div className="container">
        <PlacePicker
          country={countries}
          placeholder={
            placeholder ? placeholder : "Enter a place to see its address"
          }
          onPlaceChange={handlePlaceChange}
        />
        <div className="result">{formattedAddress}</div>
      </div>
    </div>
  );
}
