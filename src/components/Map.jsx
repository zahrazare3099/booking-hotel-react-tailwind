import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "../App.css";
import "leaflet/dist/leaflet.js";
import { useNavigate } from "react-router-dom";
import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import useGeoLocation from "../Hooks/useGeoLocation";
import { LoaderIcon } from "react-hot-toast";
import useURLLocation from "../Hooks/useURLLocation";

export default function Map({ MarkerLocation }) {
  const [mapPosition, setMapPosition] = useState([51, 3]);
  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    // anchor: new google.maps.Point(15, 30),
  };
  const [lat, lng] = useURLLocation();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  const {
    isLoading: isLoadingUserPosition,
    position: geoPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng)
      setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className="mapContainer w-3/4 bg-slate-200 m-8 mt-0 p-5 rounded-xl border ">
      <MapContainer
        className="max-h-[calc(100vh_-_100px)]"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "71vh" }}
      >
        <button
          onClick={getPosition}
          className="bg-primary-600 flex items-center justify-center p-2 text-white font-bold getLocation m-3 absolute rounded-xl bottom-0"
        >
          {isLoadingUserPosition ? (
            <LoaderIcon className="w-5 h-5" />
          ) : (
            <ViewfinderCircleIcon className="w-5 h-5" />
          )}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapPosition} />
        {MarkerLocation?.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>
                Name of Hotel : {item.host_name}
                <br />
                {item.host_location}
              </Popup>
            </Marker>
          );
        })}
        {/* <Marker position={mapPosition}>
          <Popup>Your Location</Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
