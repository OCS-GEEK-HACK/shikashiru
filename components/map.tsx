"use client";

//Map component Component from library
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Box, useAsync, useDisclosure } from "@yamada-ui/react";
import { useState } from "react";

import { DetailModal } from "./detail-modal";

import mapData from "@/components/map-data.json";

export const defaultMapContainerStyle = {
  width: "100%",
  height: "100%",
  // borderRadius: '15px 0px 0px 15px',
};

const MapComponent = () => {
  //  現在地
  const [currentPosition, setCurrentPosition] = useState<
    google.maps.LatLng | undefined
  >();
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(
    undefined,
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultMapZoom = 17;
  const defaultMapOptions: google.maps.MapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    tilt: 0,
    gestureHandling: "auto",
  };

  useAsync(async () => {
    // // 一旦コメントアウト
    // navigator.geolocation.getCurrentPosition((pos) => {
    //     const lat = pos.coords.latitude;
    //     const lng = pos.coords.longitude;
    //     const latlng = new google.maps.LatLng(lat, lng); //中心の緯度, 経度
    //     setCurrentPosition(latlng);
    // }, () => {
    //     const latlng = new google.maps.LatLng(34.68180674746938, 135.82913639406763); //中心の緯度, 経度
    //     setCurrentPosition(latlng);
    // });
    const latlng = new google.maps.LatLng(
      34.68180674746938,
      135.82913639406763,
    ); //中心の緯度, 経度
    setCurrentPosition(latlng);
  });

  return (
    <Box w="full" h="full">
      {currentIndex !== undefined && (
        <DetailModal
          isOpen={isOpen}
          onClose={onClose}
          name={mapData[currentIndex].name}
          description={mapData[currentIndex].description}
          images={mapData[currentIndex].images}
        />
      )}
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={
          currentPosition ?? {
            lat: 34.68180674746938,
            lng: 135.82913639406763,
          }
        }
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {currentPosition && (
          <MarkerF
            title="現在地"
            icon={{
              url: "zundamon-pin.png",
              size: new google.maps.Size(135, 206),
              scaledSize: new google.maps.Size(135, 206),
            }}
            position={currentPosition}
          />
        )}
        {mapData?.map((point, index) => {
          return (
            <MarkerF
              key={index}
              icon={{
                url: "pin.png",
                size: new google.maps.Size(85, 102),
                scaledSize: new google.maps.Size(85, 102),
              }}
              position={{
                lat: point.lat,
                lng: point.lng,
              }}
              onClick={() => {
                index !== undefined ? onOpen() : onClose();
                setCurrentIndex(index);
              }}
            />
          );
        })}
      </GoogleMap>
    </Box>
  );
};

export { MapComponent };
