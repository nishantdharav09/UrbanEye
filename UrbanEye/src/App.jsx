import { useState } from "react";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("English");

  const content = {
    English: {
      home: "Home",
      map: "Explore Pune",
      report: "Report a Problem",
      login: "Login",
      badge: "AI-POWERED CIVIC INTELLIGENCE",
      title: "See the Problem.",
      title2: "Improve the City.",
      description:
        "Report drainage, garbage and road problems in Pune with photo, location and AI-powered verification.",
      reportBtn: "Report a Problem",
      exploreBtn: "Explore Pune Issues",
      reports: "Reports",
      open: "Open Issues",
      resolved: "Resolved",
      categories: "What can you report?",
      categoriesText:
        "Help make Pune cleaner, safer and better by reporting civic problems around you.",
      drainage: "Drainage",
      drainageText: "Report blocked drains, overflowing water and drainage problems.",
      garbage: "Garbage",
      garbageText: "Report roadside dumping, overflowing bins and waste problems.",
      roads: "Road Damage",
      roadsText: "Report potholes, damaged roads and unsafe road conditions.",
      mapTitle: "Problems across Pune",
      mapText:
        "Explore civic issues near you and discover problem hotspots across Pune.",
      howTitle: "How UrbanEye works",
      step1: "Capture",
      step1Text: "Take a photo of the civic problem.",
      step2: "Locate",
      step2Text: "UrbanEye adds your location automatically.",
      step3: "Verify",
      step3Text: "AI analyzes the reported problem.",
      step4: "Track",
      step4Text: "Submit and track your complaint.",
    },

    Marathi: {
      home: "मुख्यपृष्ठ",
      map: "पुणे एक्सप्लोर करा",
      report: "समस्या नोंदवा",
      login: "लॉगिन",
      badge: "AI-आधारित नागरी समस्या प्रणाली",
      title: "समस्या दाखवा.",
      title2: "शहर सुधारूया.",
      description:
        "फोटो, लोकेशन आणि AI-आधारित पडताळणीसह पुण्यातील ड्रेनेज, कचरा आणि रस्त्यांच्या समस्या नोंदवा.",
      reportBtn: "समस्या नोंदवा",
      exploreBtn: "पुण्यातील समस्या पहा",
      reports: "एकूण तक्रारी",
      open: "प्रलंबित समस्या",
      resolved: "सोडवलेल्या समस्या",
      categories: "तुम्ही काय नोंदवू शकता?",
      categoriesText:
        "तुमच्या आसपासच्या नागरी समस्या नोंदवून पुणे अधिक स्वच्छ, सुरक्षित आणि चांगले बनवण्यास मदत करा.",
      drainage: "ड्रेनेज",
      drainageText: "बंद नाले, साचलेले पाणी आणि ड्रेनेजच्या समस्या नोंदवा.",
      garbage: "कचरा",
      garbageText: "रस्त्यावरील कचरा, भरलेले कचराकुंड आणि कचऱ्याच्या समस्या नोंदवा.",
      roads: "रस्त्यांचे नुकसान",
      roadsText: "खड्डे, खराब रस्ते आणि धोकादायक रस्त्यांची स्थिती नोंदवा.",
      mapTitle: "पुण्यातील समस्या",
      mapText:
        "तुमच्या जवळील नागरी समस्या पहा आणि पुण्यातील समस्या असलेले भाग शोधा.",
      howTitle: "UrbanEye कसे काम करते?",
      step1: "फोटो घ्या",
      step1Text: "नागरी समस्येचा फोटो घ्या.",
      step2: "लोकेशन",
      step2Text: "UrbanEye तुमचे लोकेशन आपोआप घेईल.",
      step3: "पडताळणी",
      step3Text: "AI नोंदवलेल्या समस्येचे विश्लेषण करेल.",
      step4: "ट्रॅक करा",
      step4Text: "तक्रार नोंदवा आणि तिचा status track करा.",
    },

    Hindi: {
      home: "होम",
      map: "पुणे एक्सप्लोर करें",
      report: "समस्या दर्ज करें",
      login: "लॉगिन",
      badge: "AI-आधारित नागरिक समस्या प्रणाली",
      title: "समस्या दिखाएं।",
      title2: "शहर को बेहतर बनाएं।",
      description:
        "फोटो, लोकेशन और AI-आधारित सत्यापन के साथ पुणे की ड्रेनेज, कचरा और सड़क की समस्याएं दर्ज करें।",
      reportBtn: "समस्या दर्ज करें",
      exploreBtn: "पुणे की समस्याएं देखें",
      reports: "कुल शिकायतें",
      open: "लंबित समस्याएं",
      resolved: "हल की गईं",
      categories: "आप क्या रिपोर्ट कर सकते हैं?",
      categoriesText:
        "अपने आसपास की नागरिक समस्याओं की रिपोर्ट करके पुणे को स्वच्छ, सुरक्षित और बेहतर बनाने में मदद करें।",
      drainage: "ड्रेनेज",
      drainageText: "बंद नालियों, जमा पानी और ड्रेनेज की समस्याएं रिपोर्ट करें।",
      garbage: "कचरा",
      garbageText: "सड़क किनारे कचरा, भरे हुए डिब्बे और कचरे की समस्याएं रिपोर्ट करें।",
      roads: "सड़क की समस्या",
      roadsText: "गड्ढे, खराब सड़कें और असुरक्षित सड़क की स्थिति रिपोर्ट करें।",
      mapTitle: "पुणे की समस्याएं",
      mapText:
        "अपने आसपास की नागरिक समस्याएं देखें और पुणे के समस्या वाले क्षेत्रों को खोजें।",
      howTitle: "UrbanEye कैसे काम करता है?",
      step1: "फोटो लें",
      step1Text: "नागरिक समस्या की फोटो लें।",
      step2: "लोकेशन",
      step2Text: "UrbanEye आपकी लोकेशन अपने आप लेगा।",
      step3: "सत्यापन",
      step3Text: "AI रिपोर्ट की गई समस्या का विश्लेषण करेगा।",
      step4: "ट्रैक करें",
      step4Text: "शिकायत दर्ज करें और उसका status track करें।",
    },
  };

  const t = content[language];

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-eye">◉</span>
          <span>Urban<span>Eye</span></span>
        </div>

        <div className="nav-links">
          <a href="#home">{t.home}</a>
          <a href="#map">{t.map}</a>
          <a href="#categories">{t.report}</a>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="English">English</option>
            <option value="Marathi">मराठी</option>
            <option value="Hindi">हिन्दी</option>
          </select>

          <button className="login-btn">{t.login}</button>
        </div>
      </nav>

      {/* Hero */}
      <main id="home">
        <section className="hero-section">

          <div className="hero-content">

            <div className="hero-badge">
              ✦ {t.badge}
            </div>

            <h1>
              {t.title}
              <br />
              <span>{t.title2}</span>
            </h1>

            <p>{t.description}</p>

            <div className="hero-buttons">
              <button className="primary-btn">
                📍 {t.reportBtn}
              </button>

              <button className="secondary-btn">
                🗺️ {t.exploreBtn}
              </button>
            </div>

          </div>

          <div className="hero-visual">

            <div className="city-card">
              <div className="city-grid"></div>

              <div className="map-point point-one">●</div>
              <div className="map-point point-two">●</div>
              <div className="map-point point-three">●</div>

              <div className="map-label">
                📍 Pune
              </div>
            </div>

          </div>

        </section>

        {/* Statistics */}
        <section className="stats-section">

          <div className="stat-card">
            <strong>12,480+</strong>
            <span>{t.reports}</span>
          </div>

          <div className="stat-card">
            <strong>3,214</strong>
            <span>{t.open}</span>
          </div>

          <div className="stat-card">
            <strong>9,266</strong>
            <span>{t.resolved}</span>
          </div>

        </section>

        {/* Categories */}
        <section id="categories" className="categories-section">

          <div className="section-heading">
            <div className="section-badge">CIVIC REPORTING</div>

            <h2>{t.categories}</h2>

            <p>{t.categoriesText}</p>
          </div>

          <div className="category-grid">

            <div className="category-card drainage">
              <div className="category-icon">💧</div>
              <h3>{t.drainage}</h3>
              <p>{t.drainageText}</p>
              <button>{t.reportBtn} →</button>
            </div>

            <div className="category-card garbage">
              <div className="category-icon">🗑️</div>
              <h3>{t.garbage}</h3>
              <p>{t.garbageText}</p>
              <button>{t.reportBtn} →</button>
            </div>

            <div className="category-card roads">
              <div className="category-icon">🕳️</div>
              <h3>{t.roads}</h3>
              <p>{t.roadsText}</p>
              <button>{t.reportBtn} →</button>
            </div>

          </div>

        </section>

        {/* Map Preview */}
        <section id="map" className="map-section">

          <div className="map-text">
            <div className="section-badge">LIVE CITY VIEW</div>

            <h2>{t.mapTitle}</h2>

            <p>{t.mapText}</p>

            <button className="primary-btn">
              🗺️ {t.exploreBtn}
            </button>
          </div>

          <div className="map-preview">

            <div className="map-road road-one"></div>
            <div className="map-road road-two"></div>
            <div className="map-road road-three"></div>

            <div className="hotspot red">●</div>
            <div className="hotspot yellow">●</div>
            <div className="hotspot green">●</div>

            <div className="map-city-name">
              PUNE
            </div>

          </div>

        </section>

        {/* How it works */}
        <section className="how-section">

          <div className="section-heading">
            <div className="section-badge">SIMPLE PROCESS</div>
            <h2>{t.howTitle}</h2>
          </div>

          <div className="steps-grid">

            <div className="step-card">
              <div className="step-number">01</div>
              <h3>{t.step1}</h3>
              <p>{t.step1Text}</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>{t.step2}</h3>
              <p>{t.step2Text}</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>{t.step3}</h3>
              <p>{t.step3Text}</p>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <h3>{t.step4}</h3>
              <p>{t.step4Text}</p>
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div>
          <div className="logo">
            <span className="logo-eye">◉</span>
            <span>Urban<span>Eye</span></span>
          </div>

          <p>See the Problem. Improve the City.</p>
        </div>

        <p>© 2026 UrbanEye. Civic intelligence for Pune.</p>
      </footer>

    </div>
  );
}

export default App;