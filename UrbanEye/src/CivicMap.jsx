
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const reports = [
  {
    id: 1,
    position: [18.5204, 73.8567],
    category: "Pothole",
    status: "Open",
    color: "#ef4444",
  },
  {
    id: 2,
    position: [18.5314, 73.8446],
    category: "Garbage",
    status: "Open",
    color: "#f59e0b",
  },
  {
    id: 3,
    position: [18.5074, 73.8077],
    category: "Drainage",
    status: "In Progress",
    color: "#3b82f6",
  },
  {
    id: 4,
    position: [18.5167, 73.8563],
    category: "Pothole",
    status: "Resolved",
    color: "#22c55e",
  },
];

function ResizeMap() {
  const map = useMap();

  setTimeout(() => map.invalidateSize(), 100);

  return null;
}

export default function CivicMap() {
  return (
    <div className="civic-map-container">
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={12}
        scrollWheelZoom={true}
        className="civic-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ResizeMap />

        {reports.map((report) => (
          <CircleMarker
            key={report.id}
            center={report.position}
            radius={9}
            pathOptions={{
              color: report.color,
              fillColor: report.color,
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <strong>{report.category}</strong>
              <br />
              Status: {report.status}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
