"use client";
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const MapContainer: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "travel_map",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API ?? "",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    try {
      const directionsService = new google.maps.DirectionsService();

      const origin = "Fukuoka Airport (FUK)";
      const destination = "Hakata Station";

      directionsService.route(
        {
          origin: origin as string,
          destination: destination as string,
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (response, status) => {
          if (status === "OK") {
            setDirections(response);
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  const center = { lat: 37.7749, lng: -122.4194 };
  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  console.log(directions);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerClassName="w-screen h-screen"
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </>
  ) : (
    <div>로드 안됨</div>
  );
};

export default MapContainer;
