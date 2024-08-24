/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
'use client'

//Map component Component from library
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Box, useAsync } from "@yamada-ui/react";
import { useState } from "react";
import data from "@/components/data.json"

//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '100%',
    // borderRadius: '15px 0px 0px 15px',
};

const MapComponent = () => {
    //  現在地
    const [currentPosition, setCurrentPosition] = useState<google.maps.LatLng | undefined>();
    const defaultMapZoom = 17
    const defaultMapOptions: google.maps.MapOptions = {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        tilt: 0,
        gestureHandling: 'auto',
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
        const latlng = new google.maps.LatLng(34.68180674746938, 135.82913639406763); //中心の緯度, 経度
        setCurrentPosition(latlng);
    })
    return (
        <Box w="full" h="full">
            <GoogleMap mapContainerStyle={defaultMapContainerStyle} center={currentPosition ?? {
                lat: 34.68180674746938,
                lng: 135.82913639406763,
            }} zoom={defaultMapZoom}
                options={defaultMapOptions}>
                {currentPosition && <MarkerF title="現在地" label='現在地' icon={{ url: "zundamon-pin.png", size: new google.maps.Size(135, 206), scaledSize: new google.maps.Size(135, 206) }} position={currentPosition} />}
                {data?.map((point, index) => {
                    return (
                        <MarkerF
                            key={index}
                            position={{
                                lat: point.lat,
                                lng: point.lng
                            }}
                        />
                    );
                })}
            </GoogleMap>
        </Box>
    )
};

export { MapComponent };