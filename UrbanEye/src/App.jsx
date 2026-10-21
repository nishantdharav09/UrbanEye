
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
import CivicMap from "./CivicMap";
import { LanguageProvider, useLanguage } from "./LanguageContext";

function Home() {
  const { language, changeLanguage, t } = useLanguage();

  const goToExplore = () => {
    document.getElementById("explore")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
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
            onChange={(e) => changeLanguage(e.target.value)}
            aria-label="Select language"
          >
            <option value="English">English</option>
            <option value="Marathi">मराठी</option>
            <option value="Hindi">हिन्दी</option>
          </select>
        </div>
      </nav>

      <main>
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

          <div className="hero-map">
            <div className="map-card">
              <div className="map-card-top">
                <span>📍</span>
                <strong>{t.mapTitle}</strong>
              </div>

              <div className="map-visual">
                <div className="mini-map-placeholder">
                  <span className="mini-map-pin">📍</span>
                  <strong>Pune, Maharashtra</strong>
                  <p>Explore civic issues across Pune</p>

                  <Link
                    to="/explore-map"
                    className="mini-map-button"
                  >
                    View Civic Map →
                  </Link>
                </div>
              </div>

              <div className="map-bottom">
                <span>● {t.demoReports}</span>
                <span>Pune</span>
              </div>
            </div>
          </div>
        </section>

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

        <section className="categories">
          <div className="section-title">
            <small>{t.categoryLabel}</small>
            <h2>{t.categoryHeading}</h2>
            <p>{t.categoryDescription}</p>
          </div>

          <div className="category-grid">
            <Link to="/report" className="category-card">
              <span>🚰</span>
              <h3>{t.drainage}</h3>
              <p>{t.drainageDesc}</p>
            </Link>

            <Link to="/report" className="category-card">
              <span>🗑️</span>
              <h3>{t.garbage}</h3>
              <p>{t.garbageDesc}</p>
            </Link>

            <Link to="/report" className="category-card">
              <span>🕳️</span>
              <h3>{t.pothole}</h3>
              <p>{t.potholeDesc}</p>
            </Link>
          </div>
        </section>

        <section className="explore" id="explore">
          <div>
            <small>{t.explore}</small>
            <h2>{t.exploreHeading}</h2>
            <p>{t.exploreDescription}</p>

            <Link
              to="/explore-map"
              className="primary-btn explore-map-link"
            >
              Open Full Pune Map →
            </Link>
          </div>

          <div className="explore-preview-card">
            <div className="explore-preview-icon">🗺️</div>
            <h3>Pune Civic Issues Map</h3>
            <p>
              Explore demo reports across Pune, including high,
              medium and low severity locations.
            </p>
            <Link to="/explore-map" className="mini-map-button">
              Explore Map →
            </Link>
          </div>
        </section>

        <section className="how">
          <small>{t.howLabel}</small>
          <h2>{t.howHeading}</h2>

          <div className="steps">
            <div>
              <b>01</b>
              <span>📸</span>
              <h3>{t.stepReport}</h3>
              <p>{t.stepReportDesc}</p>
            </div>

            <div>
              <b>02</b>
              <span>🤖</span>
              <h3>{t.stepAI}</h3>
              <p>{t.stepAIDesc}</p>
            </div>

            <div>
              <b>03</b>
              <span>📊</span>
              <h3>{t.stepPriority}</h3>
              <p>{t.stepPriorityDesc}</p>
            </div>

            <div>
              <b>04</b>
              <span>✅</span>
              <h3>{t.stepResolve}</h3>
              <p>{t.stepResolveDesc}</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Link to="/" className="logo">
          Urban<span>Eye</span>
        </Link>

        <div>
          <Link to="/">{t.home}</Link>
          <Link to="/report">{t.report}</Link>
          <Link to="/login">{t.login}</Link>
          <Link to="/explore-map">Civic Map</Link>
        </div>

        <p>© 2026 UrbanEye</p>
      </footer>
    </div>
  );
}

function ExploreMap() {
  return (
    <div className="explore-map-page">
      <div className="explore-map-topbar">
        <Link to="/" className="back-home-link">
          ← Back to Home
        </Link>

        <span className="explore-map-brand">
          Urban<span>Eye</span>
        </span>
      </div>

      <CivicMap />
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage(t.loginMessage);
  };

  return (
    <div className="simple-page">
      <div className="simple-card">
        <h1>{t.loginTitle}</h1>
        <p>{t.loginDescription}</p>

        <form onSubmit={handleLogin}>
          <input
            placeholder={t.email}
            type="email"
            aria-label={t.email}
            required
          />

          <input
            placeholder={t.password}
            type="password"
            aria-label={t.password}
            required
          />

          <button type="submit" className="primary-btn">
            {t.login}
          </button>
        </form>

        {message && (
          <div className="login-message">{message}</div>
        )}

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← {t.backHome}
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportProblem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore-map" element={<ExploreMap />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
