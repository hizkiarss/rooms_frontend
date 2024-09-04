"use client";
import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

type LocationDisplayProps = {
  latitude: number;
  longitude: number;
};

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
};

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const LocationDisplay: React.FC<LocationDisplayProps> = ({
  latitude,
  longitude,
}) => {
  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14} // Zoom level yang lebih dekat
      center={center}
      options={options}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default LocationDisplay;
