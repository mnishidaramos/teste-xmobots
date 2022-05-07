import React from "react";

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

export default function LeafletMap() {
    const mapStyle = {
        margin: '0',
        width: 'calc(100vw - 65px)',
        height: 'calc(100vh - 65px)',
    }

    return (
        <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false} style={mapStyle}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
} 