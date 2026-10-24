
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import "./ReportProblem.css";

const categories = [
  {
    id: "drainage",
    icon: "🚰",
    titleKey: "drainage",
    textKey: "drainageDesc",
  },
  {
    id: "garbage",
    icon: "🗑️",
    titleKey: "garbage",
    textKey: "garbageDesc",
  },
  {
    id: "pothole",
    icon: "🕳️",
    titleKey: "pothole",
    textKey: "potholeDesc",
  },
];

function ReportProblem() {
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function handleImage(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    ) {
      setError(t.invalidImage || "Please select a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t.largeImage || "Image size must be less than 10 MB.");
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
      setLocationMessage(
        t.locationUnsupported || "Geolocation is not supported by your browser."
      );
      return;
    }

    setLocationMessage(
      t.locationDetecting || "Detecting your location..."
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation(
          `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        );

        setLocationMessage(
          t.locationDetected || "Location detected successfully."
        );
      },
      (geoError) => {
        console.error("Location error:", geoError);

        setLocationMessage(
          t.locationFailed ||
            "Unable to get location. Allow location permission and try again."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  function goToStepTwo() {
    setError("");

    if (!category) {
      setError(t.requiredCategory || "Please select a category.");
      return;
    }

    setStep(2);
  }

  function goToStepThree() {
    setError("");

    if (!location.trim()) {
      setError(t.requiredLocation || "Please enter your location.");
      return;
    }

    if (description.trim().length < 10) {
      setError(
        t.shortDescription ||
          "Description must contain at least 10 characters."
      );
      return;
    }

    setStep(3);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (submitting) return;

    if (!category) {
      setStep(1);
      setError(t.requiredCategory || "Please select a category.");
      return;
    }

    if (!location.trim()) {
      setStep(2);
      setError(t.requiredLocation || "Please enter your location.");
      return;
    }

    if (description.trim().length < 10) {
      setStep(2);
      setError(
        t.shortDescription ||
          "Description must contain at least 10 characters."
      );
      return;
    }

    const categoryMap = {
      pothole: "Pothole",
      garbage: "Garbage",
      drainage: "Drainage",
    };

    // Expected GPS format: latitude, longitude
    const coordinates = location.match(
      /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/
    );

    const latitude = coordinates
      ? Number(coordinates[1])
      : null;

    const longitude = coordinates
      ? Number(coordinates[2])
      : null;

    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("category", categoryMap[category]);
      formData.append("description", description.trim());
      formData.append("severity", severity);

      if (latitude !== null) {
        formData.append("latitude", String(latitude));
      }

      if (longitude !== null) {
        formData.append("longitude", String(longitude));
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(
        "http://127.0.0.1:8000/complaints",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const detail = data.detail;

        throw new Error(
          typeof detail === "string"
            ? detail
            : Array.isArray(detail)
              ? detail.map((item) => item.msg).join(", ")
              : "Unable to submit complaint. Please try again."
        );
      }

      setSuccess({
        id: data.complaint_id,
        category: categories.find(
          (item) => item.id === category
        )?.titleKey,
        status: data.status || "Submitted",
      });
    } catch (err) {
      console.error("Complaint submission failed:", err);

      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Check that the backend is running and CORS is enabled."
          : err.message || "Unable to submit complaint."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setStep(1);
    setCategory("");
    setImageFile(null);
    setImagePreview("");
    setDescription("");
    setLocation("");
    setLocationMessage("");
    setSeverity("Medium");
    setError("");
    setSuccess(null);
    setSubmitting(false);
  }

  const progressSteps = [
    { number: 1, label: t.problemTitle || "Category" },
    { number: 2, label: t.describeTitle || "Details" },
    { number: 3, label: t.submit || "Submit" },
  ];

  if (success) {
    return (
      <div className="report-page">
        <div className="report-container report-success">
          <div className="success-icon">✓</div>

          <div className="report-badge">
            URBANEYE REPORT
          </div>

          <h1>{t.reportReady || "Report Submitted!"}</h1>

          <p>
            {t.reportSuccessMessage ||
              "Your complaint has been saved successfully."}
          </p>

          <div className="success-details">
            <div>
              <span>{t.complaintId || "Complaint ID"}</span>
              <strong>{success.id}</strong>
            </div>

            <div>
              <span>{t.selectCategory || "Category"}</span>
              <strong>
                {t[success.category] || success.category}
              </strong>
            </div>

            <div>
              <span>{t.severity || "Severity"}</span>
              <strong>
                {t[severity.toLowerCase()] || severity}
              </strong>
            </div>

            <div>
              <span>{t.status || "Status"}</span>
              <strong>{success.status}</strong>
            </div>
          </div>

          <button
            className="submit-report"
            type="button"
            onClick={resetForm}
          >
            {t.anotherReport || "Report Another Problem"}{" "}
            <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <div className="report-container">
        <header className="report-header">
          <div className="report-badge">
            ✦ URBANEYE REPORT
          </div>

          <h1>
            {t.problemTitle || "Report a Civic Problem"}
          </h1>

          <p>
            {t.problemDescription ||
              "Help improve your city by reporting civic issues."}
          </p>
        </header>

        <div className="report-progress">
          {progressSteps.map((item, index) => (
            <div
              className="progress-group"
              key={item.number}
            >
              <div
                className={`progress-step ${
                  step === item.number
                    ? "active"
                    : step > item.number
                      ? "completed"
                      : ""
                }`}
                aria-current={
                  step === item.number ? "step" : undefined
                }
              >
                <span>
                  {step > item.number ? "✓" : item.number}
                </span>

                <p>{item.label}</p>
              </div>

              {index < progressSteps.length - 1 && (
                <div
                  className={`progress-line ${
                    step > item.number ? "completed" : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Select category */}
          {step === 1 && (
            <section className="report-card">
              <div className="card-heading">
                <span className="heading-number">01</span>

                <div>
                  <h2>
                    {t.selectCategory || "Select Category"}
                  </h2>

                  <p>
                    {t.categoryDescription ||
                      "Choose the type of civic problem."}
                  </p>
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
                    <div className="report-category-icon">
                      {item.icon}
                    </div>

                    <div className="report-category-text">
                      <h3>
                        {t[item.titleKey] || item.titleKey}
                      </h3>

                      <p>
                        {t[item.textKey] || ""}
                      </p>
                    </div>

                    <div className="category-check">
                      {category === item.id ? "✓" : ""}
                    </div>
                  </button>
                ))}
              </div>

              {error && (
                <div className="report-error" role="alert">
                  {error}
                </div>
              )}

              <button
                className="submit-report"
                type="button"
                onClick={goToStepTwo}
              >
                Next <span>→</span>
              </button>
            </section>
          )}

          {/* STEP 2: Enter report details */}
          {step === 2 && (
            <>
              <section className="report-card">
                <div className="card-heading">
                  <span className="heading-number">02</span>

                  <div>
                    <h2>
                      {t.addPhoto || "Add Photo"}
                    </h2>

                    <p>
                      {t.photoDescription ||
                        "Upload a photo of the problem, if available."}
                    </p>
                  </div>
                </div>

                <label className="upload-area">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt={t.chooseImage || "Selected image"}
                    />
                  ) : (
                    <>
                      <div className="upload-icon">📷</div>

                      <h3>
                        {t.uploadPhoto || "Upload Photo"}
                      </h3>

                      <p>
                        {t.chooseImage || "Choose an image"}
                      </p>

                      <span>
                        {t.imageLimit || "JPG, PNG or WEBP, max 10 MB"}
                      </span>
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
                      {t.removePhoto || "Remove Photo"}
                    </button>
                  </div>
                )}
              </section>

              <section className="report-card">
                <div className="card-heading">
                  <span className="heading-number">03</span>

                  <div>
                    <h2>
                      {t.locationTitle || "Location"}
                    </h2>

                    <p>
                      {t.locationDescription ||
                        "Add the location of the problem."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="location-button"
                  onClick={getCurrentLocation}
                >
                  <span>📍</span>

                  <div>
                    <strong>
                      {t.currentLocation || "Use Current Location"}
                    </strong>

                    <small>
                      {t.locationPermission ||
                        "Allow location permission in your browser."}
                    </small>
                  </div>

                  <span className="location-arrow">→</span>
                </button>

                {locationMessage && (
                  <p
                    className="location-message"
                    role="status"
                  >
                    {locationMessage}
                  </p>
                )}

                <label
                  className="field-label"
                  htmlFor="report-location"
                >
                  {t.locationLabel || "Location"} *
                </label>

                <input
                  id="report-location"
                  className="report-input"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  placeholder={
                    t.locationPlaceholder ||
                    "Enter latitude, longitude or location"
                  }
                  required
                />
              </section>

              <section className="report-card">
                <div className="card-heading">
                  <span className="heading-number">04</span>

                  <div>
                    <h2>
                      {t.describeTitle || "Describe the Problem"}
                    </h2>

                    <p>
                      {t.describeDescription ||
                        "Provide details about the civic issue."}
                    </p>
                  </div>
                </div>

                <label
                  className="field-label"
                  htmlFor="report-severity"
                >
                  {t.severity || "Severity"}
                </label>

                <select
                  id="report-severity"
                  className="report-input"
                  value={severity}
                  onChange={(event) =>
                    setSeverity(event.target.value)
                  }
                >
                  <option value="Low">
                    {t.low || "Low"}
                  </option>

                  <option value="Medium">
                    {t.medium || "Medium"}
                  </option>

                  <option value="High">
                    {t.high || "High"}
                  </option>
                </select>

                <label
                  className="field-label"
                  htmlFor="report-description"
                >
                  {t.descriptionLabel || "Description"} *
                </label>

                <textarea
                  id="report-description"
                  className="report-input"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder={
                    t.descriptionPlaceholder ||
                    "Describe the problem and its location..."
                  }
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
                  <h3>{t.aiTitle || "AI Assistance"}</h3>

                  <p>
                    {t.aiDescription ||
                      "AI-powered issue detection can be integrated here."}
                  </p>
                </div>

                <span className="ai-status">
                  {t.planned || "Planned"}
                </span>
              </div>

              {error && (
                <div className="report-error" role="alert">
                  {error}
                </div>
              )}

              <div className="step-actions">
                <button
                  className="back-button"
                  type="button"
                  onClick={() => {
                    setError("");
                    setStep(1);
                  }}
                >
                  ← Back
                </button>

                <button
                  className="submit-report"
                  type="button"
                  onClick={goToStepThree}
                >
                  Next <span>→</span>
                </button>
              </div>

              <p className="privacy-note">
                {t.privacy ||
                  "Your submitted information will be used to process this report."}
              </p>
            </>
          )}

          {/* STEP 3: Review and submit */}
          {step === 3 && (
            <section className="report-card">
              <div className="card-heading">
                <span className="heading-number">03</span>

                <div>
                  <h2>
                    {t.submit || "Review and Submit"}
                  </h2>

                  <p>
                    Review your report before submitting.
                  </p>
                </div>
              </div>

              <div className="success-details">
                <div>
                  <span>
                    {t.selectCategory || "Category"}
                  </span>

                  <strong>
                    {t[
                      categories.find(
                        (item) => item.id === category
                      )?.titleKey
                    ] || category}
                  </strong>
                </div>

                <div>
                  <span>
                    {t.locationLabel || "Location"}
                  </span>

                  <strong>{location}</strong>
                </div>

                <div>
                  <span>{t.severity || "Severity"}</span>

                  <strong>
                    {t[severity.toLowerCase()] || severity}
                  </strong>
                </div>

                <div>
                  <span>
                    {t.descriptionLabel || "Description"}
                  </span>

                  <p>{description}</p>
                </div>

                {imagePreview && (
                  <div>
                    <span>
                      {t.addPhoto || "Photo"}
                    </span>

                    <img
                      src={imagePreview}
                      alt={t.chooseImage || "Complaint photo"}
                      style={{
                        display: "block",
                        maxWidth: "100%",
                        maxHeight: "220px",
                        marginTop: "10px",
                        borderRadius: "12px",
                      }}
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="report-error" role="alert">
                  {error}
                </div>
              )}

              <div className="step-actions">
                <button
                  className="back-button"
                  type="button"
                  onClick={() => {
                    setError("");
                    setStep(2);
                  }}
                  disabled={submitting}
                >
                  ← Back
                </button>

                <button
                  className="submit-report"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting..."
                    : t.submit || "Submit Report"}{" "}
                  <span>{submitting ? "…" : "✓"}</span>
                </button>
              </div>

              <p className="privacy-note">
                {t.privacy ||
                  "Your submitted information will be used to process this report."}
              </p>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReportProblem;
