import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import ReportProblem from "./ReportProblem";

const text = {
  English: {
    home: "Home",
    explore: "Explore Pune",
    report: "Report a Problem",
    login: "Login",
    title: "See the Problem. Improve the City.",
    description:
      "UrbanEye helps citizens report civic problems and helps cities understand and solve them faster.",
    reportBtn: "Report a Problem",
    exploreBtn: "Explore Pune",
    mapTitle: "Pune Civic Map",
    reports: "Reports",
    open: "Open Issues",
    resolved: "Resolved",
    trust: "Community Trust",
  },

  Marathi: {
    home: "मुख्यपृष्ठ",
    explore: "पुणे एक्सप्लोर करा",
    report: "समस्या नोंदवा",
    login: "लॉगिन",
    title: "समस्या पाहा. शहर सुधारा.",
    description:
      "UrbanEye नागरिकांना नागरी समस्या नोंदवण्यास आणि त्या जलद सोडवण्यास मदत करते.",
    reportBtn: "समस्या नोंदवा",
    exploreBtn: "पुणे एक्सप्लोर करा",
    mapTitle: "पुणे नागरी नकाशा",
    reports: "अहवाल",
    open: "प्रलंबित समस्या",
    resolved: "सोडवलेल्या",
    trust: "समुदायाचा विश्वास",
  },

  Hindi: {
    home: "होम",
    explore: "पुणे एक्सप्लोर करें",
    report: "समस्या रिपोर्ट करें",
    login: "लॉगिन",
    title: "समस्या देखें। शहर सुधारें।",
    description:
      "UrbanEye नागरिकों को नागरिक समस्याओं की रिपोर्ट करने और उन्हें तेजी से हल करने में मदद करता है।",
    reportBtn: "समस्या रिपोर्ट करें",
    exploreBtn: "पुणे एक्सप्लोर करें",
    mapTitle: "पुणे सिविक मैप",
    reports: "रिपोर्ट",
    open: "खुली समस्याएं",
    resolved: "हल की गईं",
    trust: "समुदाय का विश्वास",
  },
};

function Home() {
  const [language, setLanguage] = useState("English");
  const t = text[language];

  const goToExplore = () => {
    document.getElementById("explore")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="logo">
          Urban<span>Eye</span>
        </Link>

        <div className="nav-links">
          <Link to="/">{t.home}</Link>

          <button
            type="button"
            className="nav-link-button"
            onClick={goToExplore}
          >
            {t.explore}
          </button>

          <Link to="/report">{t.report}</Link>

          <Link to="/login">{t.login}</Link>
        </div>

        <div className="nav-actions">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select language"
          >
            <option value="English">English</option>
            <option value="Marathi">मराठी</option>
            <option value="Hindi">हिन्दी</option>
          </select>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="badge">
              ✦ AI-POWERED CIVIC INTELLIGENCE PLATFORM
            </div>

            <h1>{t.title}</h1>

            <p>{t.description}</p>

            <div className="hero-buttons">
              <Link to="/report" className="primary-btn">
                {t.reportBtn} →
              </Link>

              <button
                type="button"
                className="secondary-btn"
                onClick={goToExplore}
              >
                {t.exploreBtn} ↗
              </button>
            </div>
          </div>

          {/* HERO MAP */}
          <div className="hero-map">
            <div className="map-card">
              <div className="map-card-top">
                <span>📍</span>
                <strong>{t.mapTitle}</strong>
              </div>

              <div className="map-visual">
                <div className="map-road road1"></div>
                <div className="map-road road2"></div>
                <div className="map-road road3"></div>

                <span className="map-marker red">●</span>
                <span className="map-marker yellow">●</span>
                <span className="map-marker green">●</span>
              </div>

              <div className="map-bottom">
                <span>● Live reports</span>
                <span>Pune</span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          <div>
            <strong>1,248</strong>
            <span>{t.reports}</span>
          </div>

          <div>
            <strong>321</strong>
            <span>{t.open}</span>
          </div>

          <div>
            <strong>927</strong>
            <span>{t.resolved}</span>
          </div>

          <div>
            <strong>94%</strong>
            <span>{t.trust}</span>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="categories">
          <div className="section-title">
            <small>REPORT A PROBLEM</small>

            <h2>What did you find?</h2>

            <p>
              Choose an issue and help improve your neighbourhood.
            </p>
          </div>

          <div className="category-grid">
            <Link to="/report" className="category-card">
              <span>🚰</span>
              <h3>Drainage</h3>
              <p>Blocked or overflowing drainage</p>
            </Link>

            <Link to="/report" className="category-card">
              <span>🗑️</span>
              <h3>Garbage</h3>
              <p>Roadside garbage or dumping</p>
            </Link>

            <Link to="/report" className="category-card">
              <span>🕳️</span>
              <h3>Potholes</h3>
              <p>Potholes or damaged roads</p>
            </Link>
          </div>
        </section>

        {/* EXPLORE */}
        <section className="explore" id="explore">
          <div>
            <small>EXPLORE PUNE</small>

            <h2>Understand your city.</h2>

            <p>
              Explore reported civic issues across Pune.
            </p>
          </div>

          <div className="real-map">
            <iframe
              title="Pune Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=73.75%2C18.45%2C73.95%2C18.65&layer=mapnik"
            ></iframe>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how">
          <small>HOW IT WORKS</small>

          <h2>From problem to action.</h2>

          <div className="steps">
            <div>
              <b>01</b>
              <span>📸</span>
              <h3>Report</h3>
              <p>Take a photo and report the issue.</p>
            </div>

            <div>
              <b>02</b>
              <span>🤖</span>
              <h3>AI Verifies</h3>
              <p>AI helps identify the problem.</p>
            </div>

            <div>
              <b>03</b>
              <span>📊</span>
              <h3>Prioritize</h3>
              <p>Issues are classified by severity.</p>
            </div>

            <div>
              <b>04</b>
              <span>✅</span>
              <h3>Resolve</h3>
              <p>Authorities can resolve issues.</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <Link to="/" className="logo">
          Urban<span>Eye</span>
        </Link>

        <div>
          <Link to="/">{t.home}</Link>
          <Link to="/report">{t.report}</Link>
          <Link to="/login">{t.login}</Link>
        </div>

        <p>© 2026 UrbanEye</p>
      </footer>
    </div>
  );
}

/* LOGIN PAGE */
function Login() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("Login UI is ready. Backend authentication will be added later.");
  };

  return (
    <div className="simple-page">
      <div className="simple-card">
        <h1>UrbanEye Login</h1>

        <p>Login to continue.</p>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            type="email"
            required
          />

          <input
            placeholder="Password"
            type="password"
            required
          />

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        {message && <div className="login-message">{message}</div>}

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

/* APP */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/report"
          element={<ReportProblem />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;