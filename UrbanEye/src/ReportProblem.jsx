
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import "./ReportProblem.css";

const categories = [
  { id: "drainage", icon: "🚰", titleKey: "drainage", textKey: "drainageDesc" },
  { id: "garbage", icon: "🗑️", titleKey: "garbage", textKey: "garbageDesc" },
  { id: "pothole", icon: "🕳️", titleKey: "pothole", textKey: "potholeDesc" },
];

function ReportProblem() {
  const { t } = useLanguage();

  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError(t.invalidImage);
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t.largeImage);
      event.target.value = "";
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function getCurrentLocation() {
    setLocationMessage("");

    if (!navigator.geolocation) {
      setLocationMessage(t.locationUnsupported);
      return;
    }

    setLocationMessage(t.locationDetecting);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setLocationMessage(t.locationDetected);
      },
      () => {
        setLocationMessage(t.locationFailed);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!category) {
      setError(t.requiredCategory);
      return;
    }

    if (!location.trim()) {
      setError(t.requiredLocation);
      return;
    }

    if (description.trim().length < 10) {
      setError(t.shortDescription);
      return;
    }

    const complaintId = `UE-${Date.now().toString().slice(-8)}`;

    setSuccess({
      id: complaintId,
      category: categories.find((item) => item.id === category)?.titleKey,
    });
  }

  function resetForm() {
    setCategory("");
    setImageFile(null);
    setImagePreview("");
    setDescription("");
    setLocation("");
    setLocationMessage("");
    setSeverity("Medium");
    setError("");
    setSuccess(null);
  }

  if (success) {
    return (
      <div className="report-page">
        <div className="report-container report-success">
          <div className="success-icon">✓</div>
          <div className="report-badge">URBANEYE REPORT</div>

          <h1>
            {t.reportReady}
          </h1>

          <p>{t.demoSuccess}</p>

          <div className="success-details">
            <div>
              <span>{t.complaintId}</span>
              <strong>{success.id}</strong>
            </div>

            <div>
              <span>{t.selectCategory}</span>
              <strong>{t[success.category]}</strong>
            </div>

            <div>
              <span>{t.severity}</span>
              <strong>{t[severity.toLowerCase()]}</strong>
            </div>

            <div>
              <span>{t.status}</span>
              <strong>{t.submittedDemo}</strong>
            </div>
          </div>

          <button
            className="submit-report"
            type="button"
            onClick={resetForm}
          >
            {t.anotherReport} <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <div className="report-container">
        <header className="report-header">
          <div className="report-badge">✦ URBANEYE REPORT</div>
          <h1>{t.problemTitle}</h1>
          <p>{t.problemDescription}</p>
        </header>

        <div className="report-progress">
          <div className="progress-step active">
            <span>1</span>
            <p>{t.problemTitle}</p>
          </div>
          <div className="progress-line" />
          <div className="progress-step active">
            <span>2</span>
            <p>{t.describeTitle}</p>
          </div>
          <div className="progress-line" />
          <div className="progress-step">
            <span>3</span>
            <p>{t.submit}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="report-card">
            <div className="card-heading">
              <span className="heading-number">01</span>
              <div>
                <h2>{t.selectCategory}</h2>
                <p>{t.categoryDescription}</p>
              </div>
            </div>

            <div className="category-options">
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`report-category ${
                    category === item.id ? "selected" : ""
                  }`}
                  aria-pressed={category === item.id}
                  onClick={() => {
                    setCategory(item.id);
                    setError("");
                  }}
                >
                  <div className="report-category-icon">{item.icon}</div>
                  <div className="report-category-text">
                    <h3>{t[item.titleKey]}</h3>
                    <p>{t[item.textKey]}</p>
                  </div>
                  <div className="category-check">
                    {category === item.id ? "✓" : ""}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="report-card">
            <div className="card-heading">
              <span className="heading-number">02</span>
              <div>
                <h2>{t.addPhoto}</h2>
                <p>{t.photoDescription}</p>
              </div>
            </div>

            <label className="upload-area">
              {imagePreview ? (
                <img src={imagePreview} alt={t.chooseImage} />
              ) : (
                <>
                  <div className="upload-icon">📷</div>
                  <h3>{t.uploadPhoto}</h3>
                  <p>{t.chooseImage}</p>
                  <span>{t.imageLimit}</span>
                </>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImage}
                hidden
              />
            </label>

            {imageFile && (
              <div className="selected-file">
                <span>✓ {imageFile.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview("");
                  }}
                >
                  {t.removePhoto}
                </button>
              </div>
            )}
          </section>

          <section className="report-card">
            <div className="card-heading">
              <span className="heading-number">03</span>
              <div>
                <h2>{t.locationTitle}</h2>
                <p>{t.locationDescription}</p>
              </div>
            </div>

            <button
              type="button"
              className="location-button"
              onClick={getCurrentLocation}
            >
              <span>📍</span>
              <div>
                <strong>{t.currentLocation}</strong>
                <small>{t.locationPermission}</small>
              </div>
              <span className="location-arrow">→</span>
            </button>

            {locationMessage && (
              <p className="location-message" role="status">
                {locationMessage}
              </p>
            )}

            <label className="field-label" htmlFor="report-location">
              {t.locationLabel} *
            </label>

            <input
              id="report-location"
              className="report-input"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder={t.locationPlaceholder}
              required
            />
          </section>

          <section className="report-card">
            <div className="card-heading">
              <span className="heading-number">04</span>
              <div>
                <h2>{t.describeTitle}</h2>
                <p>{t.describeDescription}</p>
              </div>
            </div>

            <label className="field-label" htmlFor="report-severity">
              {t.severity}
            </label>

            <select
              id="report-severity"
              className="report-input"
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
            >
              <option value="Low">{t.low}</option>
              <option value="Medium">{t.medium}</option>
              <option value="High">{t.high}</option>
            </select>

            <label className="field-label" htmlFor="report-description">
              {t.descriptionLabel} *
            </label>

            <textarea
              id="report-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={t.descriptionPlaceholder}
              minLength={10}
              maxLength={500}
              required
            />

            <div className="character-count">
              {description.length}/500
            </div>
          </section>

          <div className="ai-info">
            <div className="ai-icon">🤖</div>
            <div>
              <h3>{t.aiTitle}</h3>
              <p>{t.aiDescription}</p>
            </div>
            <span className="ai-status">{t.planned}</span>
          </div>

          {error && (
            <div className="report-error" role="alert">
              {error}
            </div>
          )}

          <button className="submit-report" type="submit">
            {t.submit} <span>→</span>
          </button>

          <p className="privacy-note">{t.privacy}</p>
        </form>
      </div>
    </div>
  );
}

export default ReportProblem;
