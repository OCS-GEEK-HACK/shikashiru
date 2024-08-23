/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
'use client'

//Map component Component from library
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Box, useAsync } from "@yamada-ui/react";
import { useState } from "react";

//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '100%',
    // borderRadius: '15px 0px 0px 15px',
};

const MapComponent = () => {
    //  現在地
    const [currentPosition, setCurrentPosition] = useState<google.maps.LatLng | undefined>();
    const defaultMapZoom = 18
    const defaultMapOptions: google.maps.MapOptions = {
        zoomControl: true,
        tilt: 0,
        gestureHandling: 'auto',
    };

    useAsync(async () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const latlng = new google.maps.LatLng(lat, lng); //中心の緯度, 経度
            setCurrentPosition(latlng);
        }, () => {
            const latlng = new google.maps.LatLng(35.66003283140587, 139.70522242457778); //中心の緯度, 経度
            setCurrentPosition(latlng);
        });
    })
    return (
        <Box w="full" h="full">
            <GoogleMap mapContainerStyle={defaultMapContainerStyle} center={currentPosition ?? {
                lat: 35.66003283140587,
                lng: 139.70522242457778,
            }} zoom={defaultMapZoom}
                options={defaultMapOptions}>
                {currentPosition && <MarkerF title="現在地" label='現在地' icon="zundamon-pin.png" position={currentPosition} />}
            </GoogleMap>
        </Box>
    )
};

export { MapComponent };