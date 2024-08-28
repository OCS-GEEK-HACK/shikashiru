"use client";

//Map component Component from library
import { DirectionsRenderer, GoogleMap, MarkerF } from "@react-google-maps/api";
import {
  Box,
  Image,
  useAsync,
  useDisclosure,
  useBoolean,
} from "@yamada-ui/react";
import { CSSProperties, useState } from "react";

import { DetailModal } from "./detail-modal";
import Fortune from "./fortune";

import mapData from "@/components/map-data.json";
import { useFilter } from "@/contexts/filter-context";

export const defaultMapContainerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

const MapComponent = () => {
  //  現在地
  const [currentPosition, setCurrentPosition] = useState<
    google.maps.LatLng | undefined
  >();
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(
    undefined,
  );
  const [directionsResponse, setDirectionsResponse] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const [showFortune, { toggle: toggleFortune }] = useBoolean(false);

  const { selectedKey } = useFilter();
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

  const calculateRoute = async () => {
    if (!currentPosition || currentIndex === undefined) return;

    const directionsService = new google.maps.DirectionsService();

    const result = await directionsService.route({
      origin: currentPosition,
      destination: new google.maps.LatLng(
        mapData[currentIndex].lat,
        mapData[currentIndex].lng,
      ),
      travelMode: google.maps.TravelMode.WALKING,
    });

    onClose();
    setDirectionsResponse(result);
  };

  // mapDataをフィルタリングして、選択されたキーに合致するポイントのみを表示
  const filteredMapData = selectedKey
    ? mapData.filter((point) => point.category.includes(selectedKey))
    : mapData;

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
          onNavigate={calculateRoute}
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
              url: "/icon/zundamon-pin.png",
              size: new google.maps.Size(135, 206),
              scaledSize: new google.maps.Size(135, 206),
            }}
            position={currentPosition}
          />
        )}
        {filteredMapData?.map((point, index) => {
          return (
            <MarkerF
              title={point.name}
              key={index}
              icon={{
                url: "/icon/pin.png",
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
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      {/* おみくじアイコン */}
      <Box
        position="fixed"
        bottom="15px"
        right="15px"
        cursor="pointer"
        onClick={toggleFortune}
      >
        <Image
          src="/icon/deer.png"
          alt="Deer Icon"
          width="120px"
          height="120px"
        />
      </Box>

      {/* おみくじ表示 */}
      <Fortune showFortune={showFortune} />
    </Box>
  );
};

export { MapComponent };
