import React from "react"; // to use jsx
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import ChangeView from "./ChangeView";
import { showDataOnMap } from "./utils";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        {/* this is a component to llsten for changes in center and zoom and sets it because mapcontainer's center and zoom states are immutable  */}
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* loop through all countries and draw circles on map that depend on the number of covid cases; bigger circle = more cases */}
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
