
import { useEffect, useState } from "react";
import "./ReportProblem.css";

const categories = [
  {
    id: "drainage",
    icon: "🚰",
    title: "Drainage",
    text: "Blocked or overflowing drainage",
  },
  {
    id: "garbage",
    icon: "🗑️",
    title: "Garbage",
    text: "Roadside garbage or dumping",
  },
  {
    id: "pothole",
    icon: "🕳️",
    title: "Pothole",
    text: "Potholes or damaged roads",
  },
];

function ReportProblem() {
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
      setError("Please select a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be 10 MB or less.");
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
      setLocationMessage("Location is not supported by this browser.");
      return;
    }

    setLocationMessage("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setLocationMessage("Location detected successfully.");
      },
      () => {
        setLocationMessage(
          "Unable to get location. Allow browser permission or enter it manually."
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!category) {
      setError("Please select a problem category.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter the problem location.");
      return;
    }

    if (description.trim().length < 10) {
      setError("Please describe the problem in at least 10 characters.");
      return;
    }

    const complaintId = `UE-${Date.now().toString().slice(-8)}`;

    setSuccess({
      id: complaintId,
      category: categories.find((item) => item.id === category)?.title,
      status: "Submitted (Demo)",
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
          <h1>Report <span>Ready!</span></h1>
          <p>
            Your demo report has been prepared successfully.
            It has not been saved to a database.
          </p>

          <div className="success-details">
            <div>
              <span>Demo Complaint ID</span>
              <strong>{success.id}</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>{success.category}</strong>
            </div>
            <div>
              <span>Severity</span>
              <strong>{severity}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{success.status}</strong>
            </div>
          </div>

          <button
            className="submit-report"
            type="button"
            onClick={resetForm}
          >
            Create Another Report <span>→</span>
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
          <h1>Report a <span>Problem</span></h1>
          <p>
            Help improve Pune by reporting a civic issue near you.
          </p>
        </header>

        <div className="report-progress">
          <div className="progress-step active">
            <span>1</span><p>Problem</p>
          </div>
          <div className="progress-line" />
          <div className="progress-step active">
            <span>2</span><p>Details</p>
          </div>
          <div className="progress-line" />
          <div className="progress-step">
            <span>3</span><p>Submit</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="report-card">
            <div className="card-heading">
              <span className="heading-number">01</span>
              <div>
                <h2>What is the problem?</h2>
                <p>Select the type of civic issue.</p>
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
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
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
                <h2>Add a photo</h2>
                <p>Upload a photo to help explain the issue.</p>
              </div>
            </div>

            <label className="upload-area">
              {imagePreview ? (
                <img src={imagePreview} alt="Selected civic issue" />
              ) : (
                <>
                  <div className="upload-icon">📷</div>
                  <h3>Upload a photo</h3>
                  <p>Click to choose an image from your device</p>
                  <span>JPG, PNG or WebP · Max 10 MB</span>
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
                  Remove photo
                </button>
              </div>
            )}
          </section>

          <section className="report-card">
            <div className="card-heading">
              <span className="heading-number">03</span>
              <div>
                <h2>Where is the problem?</h2>
                <p>Enter the location of the civic issue.</p>
              </div>
            </div>

            <button
              type="button"
              className="location-button"
              onClick={getCurrentLocation}
            >
              <span>📍</span>
              <div>
                <strong>Use my current location</strong>
                <small>Allow location access in your browser</small>
              </div>
              <span className="location-arrow">→</span>
            </button>

            {locationMessage && (
              <p className="location-message" role="status">
                {locationMessage}
              </p>
            )}

            <label className="field-label" htmlFor="report-location">
              Location or coordinates *
            </label>
            <input
              id="report-location"
              className="report-input"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter area, street, or coordinates"
              required
            />
          </section>

          <section className="report-card">
            <div className="card-heading">
              <span className="heading-number">04</span>
              <div>
                <h2>Describe the problem</h2>
                <p>Tell us a little more about what you found.</p>
              </div>
            </div>

            <label className="field-label" htmlFor="report-severity">
              Severity
            </label>
            <select
              id="report-severity"
              className="report-input"
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label className="field-label" htmlFor="report-description">
              Description *
            </label>
            <textarea
              id="report-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Example: Large pothole near the main road..."
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
              <h3>AI Verification</h3>
              <p>
                AI photo verification is planned for a future version.
                No AI analysis is performed in this demo.
              </p>
            </div>
            <span className="ai-status">PLANNED</span>
          </div>

          {error && (
            <div className="report-error" role="alert">
              {error}
            </div>
          )}

          <button className="submit-report" type="submit">
            Submit Demo Report <span>→</span>
          </button>

          <p className="privacy-note">
            🔒 Demo only. Your report is not sent to a server or database.
          </p>
        </form>
      </div>
    </div>
  );
}

export default ReportProblem;
