
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
import { useLanguage } from "./LanguageContext";

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

const mapTranslations = {
  English: {
    tag: "URBANEYE • DEMO DATA",
    title: "Pune Civic Issues Map",
    description: "Explore reported civic issues across Pune and nearby areas.",
    totalReports: "Total Reports",
    highSeverity: "High Severity",
    mediumSeverity: "Medium Severity",
    lowSeverity: "Low Severity",
    areas: "areas",
    high: "High",
    medium: "Medium",
    low: "Low",
    dotNote: "Dot size reflects the number of demo complaints",
    category: "Category",
    severity: "Severity",
    status: "Status",
    complaints: "Demo complaints",
    open: "Open",
    inProgress: "In Progress",
    resolved: "Resolved",
    pothole: "Pothole",
    garbage: "Garbage",
    drainage: "Drainage",
    disclaimer: "Demo visualization only. Marker locations, severity levels and complaint counts are sample data, not verified live civic reports.",
  },

  Marathi: {
    tag: "URBANEYE • प्रात्यक्षिक माहिती",
    title: "पुणे नागरी समस्या नकाशा",
    description: "पुणे आणि जवळच्या भागांतील नोंदवलेल्या नागरी समस्या पाहा.",
    totalReports: "एकूण तक्रारी",
    highSeverity: "तीव्र समस्या",
    mediumSeverity: "मध्यम समस्या",
    lowSeverity: "कमी तीव्रतेच्या समस्या",
    areas: "भाग",
    high: "जास्त",
    medium: "मध्यम",
    low: "कमी",
    dotNote: "ठिपक्याचा आकार डेमो तक्रारींची संख्या दर्शवतो",
    category: "प्रकार",
    severity: "तीव्रता",
    status: "स्थिती",
    complaints: "डेमो तक्रारी",
    open: "प्रलंबित",
    inProgress: "काम सुरू आहे",
    resolved: "निराकरण झाले",
    pothole: "खड्डा",
    garbage: "कचरा",
    drainage: "गटार",
    disclaimer: "हा केवळ प्रात्यक्षिक नकाशा आहे. ठिकाणे, तीव्रता आणि तक्रारींची संख्या नमुना माहिती आहे; ती प्रत्यक्ष पडताळलेली माहिती नाही.",
  },

  Hindi: {
    tag: "URBANEYE • डेमो डेटा",
    title: "पुणे नागरिक समस्या मानचित्र",
    description: "पुणे और आसपास के क्षेत्रों में दर्ज नागरिक समस्याएँ देखें।",
    totalReports: "कुल शिकायतें",
    highSeverity: "गंभीर समस्याएँ",
    mediumSeverity: "मध्यम समस्याएँ",
    lowSeverity: "कम गंभीरता वाली समस्याएँ",
    areas: "क्षेत्र",
    high: "अधिक",
    medium: "मध्यम",
    low: "कम",
    dotNote: "बिंदु का आकार डेमो शिकायतों की संख्या दर्शाता है",
    category: "श्रेणी",
    severity: "गंभीरता",
    status: "स्थिति",
    complaints: "डेमो शिकायतें",
    open: "खुली",
    inProgress: "काम जारी है",
    resolved: "हल हो गई",
    pothole: "गड्ढा",
    garbage: "कचरा",
    drainage: "नाली",
    disclaimer: "यह केवल डेमो मानचित्र है। स्थान, गंभीरता और शिकायतों की संख्या नमूना डेटा है, सत्यापित लाइव शिकायतें नहीं।",
  },
};

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
  const { language } = useLanguage();
  const t = mapTranslations[language] || mapTranslations.English;

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

  const translateCategory = (category) => {
    if (category === "Pothole") return t.pothole;
    if (category === "Garbage") return t.garbage;
    if (category === "Drainage") return t.drainage;
    return category;
  };

  const translateSeverity = (severity) => {
    if (severity === "High") return t.high;
    if (severity === "Medium") return t.medium;
    if (severity === "Low") return t.low;
    return severity;
  };

  const translateStatus = (status) => {
    if (status === "Open") return t.open;
    if (status === "In Progress") return t.inProgress;
    if (status === "Resolved") return t.resolved;
    return status;
  };

  return (
    <div className="civic-map-page">
      <div className="civic-map-header">
        <div>
          <span className="civic-map-tag">{t.tag}</span>
          <h1>{t.title}</h1>
          <p>{t.description}</p>
        </div>
      </div>

      <div className="civic-map-stats">
        <div className="civic-stat-card">
          <span className="civic-stat-label">{t.totalReports}</span>
          <strong>{totalComplaints}</strong>
        </div>

        <div className="civic-stat-card">
          <span className="civic-stat-label">{t.highSeverity}</span>
          <strong className="high-text">{highCount} {t.areas}</strong>
        </div>

        <div className="civic-stat-card">
          <span className="civic-stat-label">{t.mediumSeverity}</span>
          <strong className="medium-text">{mediumCount} {t.areas}</strong>
        </div>

        <div className="civic-stat-card">
          <span className="civic-stat-label">{t.lowSeverity}</span>
          <strong className="low-text">{lowCount} {t.areas}</strong>
        </div>
      </div>

      <div className="civic-map-legend">
        <span><i className="legend-dot high-dot" /> {t.high}</span>
        <span><i className="legend-dot medium-dot" /> {t.medium}</span>
        <span><i className="legend-dot low-dot" /> {t.low}</span>
        <span className="legend-note">{t.dotNote}</span>
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
                  <p>
                    <strong>{t.category}:</strong>{" "}
                    {translateCategory(report.category)}
                  </p>
                  <p>
                    <strong>{t.severity}:</strong>{" "}
                    <span style={{ color: getColor(report.severity) }}>
                      {translateSeverity(report.severity)}
                    </span>
                  </p>
                  <p>
                    <strong>{t.status}:</strong>{" "}
                    {translateStatus(report.status)}
                  </p>
                  <p>
                    <strong>{t.complaints}:</strong> {report.complaints}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <p className="civic-map-disclaimer">{t.disclaimer}</p>
    </div>
  );
}
