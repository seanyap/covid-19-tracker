import React from "react"; // to use jsx
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import ChangeView from "./ChangeView";

function WorldMap({ center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default WorldMap;
