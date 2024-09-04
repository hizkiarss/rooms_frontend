"use client";
import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import LocationDisplay from "./LocationDisplay";

type LatLng = {
  lat: number;
  lng: number;
};

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
};

const center: LatLng = {
  lat: -6.2, // Default latitude (Jakarta)
  lng: 106.816666, // Default longitude (Jakarta)
};

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const LocationPicker: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  });

  const [selected, setSelected] = useState<LatLng | null>(null);

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelected({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onClick={onMapClick}>
        {selected && (
          <Marker position={{ lat: selected.lat, lng: selected.lng }} />
        )}
      </GoogleMap>

      {selected && (
        <div className="mt-4">
          <h3>Selected Location:</h3>
          <LocationDisplay latitude={selected.lat} longitude={selected.lng} />
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
