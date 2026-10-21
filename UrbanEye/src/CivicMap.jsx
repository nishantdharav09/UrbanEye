
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CivicMap.css";

const reports = [
  { id: 1, area: "Shivajinagar", position: [18.5308, 73.8475], category: "Pothole", severity: "High", status: "Open", complaints: 6 },
  { id: 2, area: "Deccan", position: [18.5158, 73.8419], category: "Garbage", severity: "Medium", status: "Open", complaints: 4 },
  { id: 3, area: "Swargate", position: [18.5018, 73.8636], category: "Drainage", severity: "High", status: "In Progress", complaints: 7 },
  { id: 4, area: "Hadapsar", position: [18.5089, 73.9259], category: "Pothole", severity: "High", status: "Open", complaints: 8 },
  { id: 5, area: "Kothrud", position: [18.5074, 73.8077], category: "Garbage", severity: "Low", status: "Resolved", complaints: 2 },
  { id: 6, area: "Warje", position: [18.4818, 73.7997], category: "Drainage", severity: "Medium", status: "Open", complaints: 3 },
  { id: 7, area: "Katraj", position: [18.4529, 73.8670], category: "Pothole", severity: "Medium", status: "In Progress", complaints: 4 },
  { id: 8, area: "Kharadi", position: [18.5515, 73.9470], category: "Garbage", severity: "High", status: "Open", complaints: 6 },
  { id: 9, area: "Aundh", position: [18.5590, 73.8078], category: "Drainage", severity: "Low", status: "Resolved", complaints: 2 },
  { id: 10, area: "Baner", position: [18.5590, 73.7868], category: "Pothole", severity: "Medium", status: "Open", complaints: 3 },
  { id: 11, area: "Kondhwa", position: [18.4663, 73.8912], category: "Garbage", severity: "Low", status: "Open", complaints: 1 },
  { id: 12, area: "Viman Nagar", position: [18.5679, 73.9143], category: "Pothole", severity: "High", status: "Open", complaints: 5 },
  { id: 13, area: "Pimpri", position: [18.6298, 73.7997], category: "Drainage", severity: "Medium", status: "In Progress", complaints: 4 },
  { id: 14, area: "Chinchwad", position: [18.6298, 73.7811], category: "Garbage", severity: "Low", status: "Resolved", complaints: 2 },
  { id: 15, area: "Wagholi", position: [18.5793, 73.9780], category: "Drainage", severity: "Low", status: "Open", complaints: 2 },
];

function getColor(severity) {
  switch (severity) {
    case "High":
      return "#ef4444";
    case "Medium":
      return "#f59e0b";
    case "Low":
      return "#22c55e";
    default:
      return "#64748b";
  }
}

function FitPuneMap() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(
        [
          [18.38, 73.65],
          [18.75, 74.05],
        ],
        { padding: [25, 25] }
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

export default function CivicMap() {
  const totalComplaints = reports.reduce(
    (total, report) => total + report.complaints,
    0
  );

  const highCount = reports.filter(
    (report) => report.severity === "High"
  ).length;

  const mediumCount = reports.filter(
    (report) => report.severity === "Medium"
  ).length;

  const lowCount = reports.filter(
    (report) => report.severity === "Low"
  ).length;

  return (
    <div className="civic-map-page">
      <div className="civic-map-header">
        <div>
          <span className="civic-map-tag">URBANEYE • DEMO DATA</span>
          <h1>Pune Civic Issues Map</h1>
          <p>
            Explore reported civic issues across Pune and nearby areas.
          </p>
        </div>
      </div>

      <div className="civic-map-stats">
        <div className="civic-stat-card">
          <span className="civic-stat-label">Total Reports</span>
          <strong>{totalComplaints}</strong>
        </div>

        <div className="civic-stat-card">
          <span className="civic-stat-label">High Severity</span>
          <strong className="high-text">{highCount} areas</strong>
        </div>

        <div className="civic-stat-card">
          <span className="civic-stat-label">Medium Severity</span>
          <strong className="medium-text">{mediumCount} areas</strong>
        </div>

        <div className="civic-stat-card">
          <span className="civic-stat-label">Low Severity</span>
          <strong className="low-text">{lowCount} areas</strong>
        </div>
      </div>

      <div className="civic-map-legend">
        <span><i className="legend-dot high-dot" /> High</span>
        <span><i className="legend-dot medium-dot" /> Medium</span>
        <span><i className="legend-dot low-dot" /> Low</span>
        <span className="legend-note">
          Dot size reflects the number of demo complaints
        </span>
      </div>

      <div className="civic-map-container">
        <MapContainer
          center={[18.5204, 73.8567]}
          zoom={11}
          scrollWheelZoom={true}
          className="civic-leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitPuneMap />

          {reports.map((report) => (
            <CircleMarker
              key={report.id}
              center={report.position}
              radius={Math.min(7 + report.complaints, 16)}
              pathOptions={{
                color: getColor(report.severity),
                fillColor: getColor(report.severity),
                fillOpacity: 0.8,
                weight: 2,
              }}
            >
              <Popup>
                <div className="civic-map-popup">
                  <h3>{report.area}</h3>
                  <p><strong>Category:</strong> {report.category}</p>
                  <p>
                    <strong>Severity:</strong>{" "}
                    <span style={{ color: getColor(report.severity) }}>
                      {report.severity}
                    </span>
                  </p>
                  <p><strong>Status:</strong> {report.status}</p>
                  <p><strong>Demo complaints:</strong> {report.complaints}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <p className="civic-map-disclaimer">
        Demo visualization only. Marker locations, severity levels and
        complaint counts are sample data, not verified live civic reports.
      </p>
    </div>
  );
}
