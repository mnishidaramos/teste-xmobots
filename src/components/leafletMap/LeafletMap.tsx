import React from "react";

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { coordType } from "../../utils/coordUpload";

export const mapMarkers = (coordList: coordType[]) => {
    const regexNum = new RegExp('(([0-9]{6,}))');
    let newLat = 0.0;
    let newLng = 0.0;
    let latNum = 0.0;
    let lngNum = 0.0;
    let newCoords: [Number[]] = [[]];

    if (coordList && coordList.length > 0) {
        coordList.forEach((c) => {
            latNum = Number.parseInt(c.dms.lat);
            // DD = d + (min/60) + (sec/3600)
            newLat = (latNum / 10000) +
                ((latNum % 10000) / 100) / 60 +
                ((latNum % 10000) % 100) / 3600;
            //Se a latitude é negativa, adiciona o sinal
            if (c.dms.lat.includes('S')) newLat *= -1;
            //Os mesmos cálculos para longitude
            lngNum = Number.parseInt(c.dms.lng);
            newLng = (lngNum / 10000) +
                ((lngNum % 10000) / 100) / 60 +
                ((lngNum % 10000) % 100) / 3600;
            if (c.dms.lng.includes('W')) newLng *= -1;
            newCoords.push([newLat, newLng]);
        });
        //Retira o primeiro elemento do array, que é um array vazio
        newCoords.shift();
    }
    return newCoords;
}

type LeafletMapProps = {
    children: React.ReactNode;
}

export default function LeafletMap(props: LeafletMapProps) {
    const mapStyle = {
        margin: '0',
        width: 'calc(100vw - 65px)',
        height: 'calc(100vh - 65px)',
    }

    return (
        <MapContainer center={[-22.0180395, -47.891154]} zoom={9} scrollWheelZoom={false} style={mapStyle}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.children}
        </MapContainer>
    )
}