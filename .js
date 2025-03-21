// Import React & ReactDOM
import React, { useState, useEffect } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";

// Import Leaflet before React-Leaflet
import "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js";
import { MapContainer, TileLayer, Marker, Popup } from "https://esm.sh/react-leaflet";
import "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";

const MapView = ({ coordinates }) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer center={coordinates} zoom={6} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coordinates}>
        <Popup>Last Known Location</Popup>
      </Marker>
    </MapContainer>
  );
};

const SearchForm = ({ onSearch }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
      <input type="number" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
      <button type="submit">Search</button>
    </form>
  );
};

const App = () => {
  const [coordinates, setCoordinates] = useState({ lat: 20.5937, lng: 78.9629 });

  const handleSearch = (newCoords) => {
    setCoordinates(newCoords);
  };

  return (
    <div>
      <h1>Search and Rescue Tool</h1>
      <SearchForm onSearch={handleSearch} />
      <MapView coordinates={coordinates} />
    </div>
  );
};

// Use createRoot() for React 18
const root = createRoot(document.getElementById("root"));
root.render(<App />);
