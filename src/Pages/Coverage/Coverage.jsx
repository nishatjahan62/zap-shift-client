import React, { useState, useRef } from "react";
import { useLoaderData } from "react-router";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2";

// Fix Leaflet marker icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom component to update map view
const MapZoom = ({ center }) => {
  const map = useMap();

  React.useEffect(() => {const MapZoom = ({ center }) => {
  const map = useMap();

  React.useEffect(() => {
    if (center) {
      map.flyTo(center, 10, {
        animate: true,
        duration: 2, // seconds
        easeLinearity: 0.25,
      });
    }
  }, [center, map]);

  return null;
};

    if (center) {
      map.flyTo(center, 11, {
        animate: true,
        duration: 2, // seconds
        easeLinearity: 0.25,
      });
    }
  }, [center, map]);

  return null;
};


const CoveragePage = () => {
  const districts = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [targetCenter, setTargetCenter] = useState(null);
  const [searchedDistrict, setSearchedDistrict] = useState(null);
  const inputRef = useRef();

 const handleSearch = () => {
  const match = districts.find((d) =>
    d.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (match) {
    setTargetCenter([match.latitude, match.longitude]);
    setSearchedDistrict(match.district);
  } else {
    Swal.fire({
      title: "SORRY!",
      text: `We are not available in ${searchTerm}.`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};


  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary">
        We are available in 64 districts
      </h1>

      {/* Search Field */}
      <div className="mb-6 flex justify-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search district..."
          className="p-2 border rounded-l-md w-64 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleEnterKey}
        />
        <button
          className="px-4 bg-primary text-white rounded-r-md "
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "600px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        {targetCenter && <MapZoom center={targetCenter} />}

        {districts.map((district, index) => (
          <Marker
            key={index}
            position={[district.latitude, district.longitude]}
          >
            <Popup>
              <strong>{district.district}</strong>
              <br />
              Areas: {district.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {searchedDistrict && (
        <p className="mt-4 text-center text-primary">
           Zoomed to <strong>{searchedDistrict}</strong>
        </p>
      )}
    </div>
  );
};

export default CoveragePage;
