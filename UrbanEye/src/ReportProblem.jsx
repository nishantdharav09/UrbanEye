import { useState } from "react";
import "./ReportProblem.css";

function ReportProblem() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

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

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="report-page">
      <div className="report-container">

        {/* HEADER */}
        <div className="report-header">
          <div className="report-badge">✦ URBANEYE REPORT</div>

          <h1>
            Report a <span>Problem</span>
          </h1>

          <p>
            Help improve Pune by reporting a civic issue near you.
          </p>
        </div>

        {/* PROGRESS */}
        <div className="report-progress">

          <div className="progress-step active">
            <span>1</span>
            <p>Problem</p>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>2</span>
            <p>Details</p>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>3</span>
            <p>Submit</p>
          </div>

        </div>

        {/* CATEGORY */}
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
                className={`report-category ${
                  category === item.id ? "selected" : ""
                }`}
                onClick={() => setCategory(item.id)}
              >

                <div className="report-category-icon">
                  {item.icon}
                </div>

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

        {/* PHOTO */}
        <section className="report-card">

          <div className="card-heading">
            <span className="heading-number">02</span>

            <div>
              <h2>Add a photo</h2>
              <p>A photo helps UrbanEye understand the issue.</p>
            </div>
          </div>

          <label className="upload-area">

            {image ? (
              <img
                src={image}
                alt="Selected problem"
              />
            ) : (
              <>
                <div className="upload-icon">📷</div>

                <h3>Upload a photo</h3>

                <p>
                  Click to choose an image from your device
                </p>

                <span>
                  JPG, PNG • Max 10MB
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              hidden
            />

          </label>

        </section>

        {/* LOCATION */}
        <section className="report-card">

          <div className="card-heading">
            <span className="heading-number">03</span>

            <div>
              <h2>Where is the problem?</h2>
              <p>Add the location of the civic issue.</p>
            </div>
          </div>

          <button className="location-button">

            <span>📍</span>

            <div>
              <strong>Use my current location</strong>

              <small>
                Allow location access to detect your position
              </small>
            </div>

            <span className="location-arrow">→</span>

          </button>

        </section>

        {/* DESCRIPTION */}
        <section className="report-card">

          <div className="card-heading">
            <span className="heading-number">04</span>

            <div>
              <h2>Describe the problem</h2>

              <p>
                Tell us a little more about what you found.
              </p>
            </div>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: Large pothole near the main road..."
            maxLength="500"
          />

          <div className="character-count">
            {description.length}/500
          </div>

        </section>

        {/* AI INFO */}
        <div className="ai-info">

          <div className="ai-icon">
            🤖
          </div>

          <div>
            <h3>AI Verification</h3>

            <p>
              UrbanEye will analyse your photo to help verify the
              reported civic issue.
            </p>
          </div>

          <span className="ai-status">
            AI
          </span>

        </div>

        {/* SUBMIT */}
        <button className="submit-report">
          Submit Report
          <span>→</span>
        </button>

        <p className="privacy-note">
          🔒 Your report information is used only for civic issue tracking.
        </p>

      </div>
    </div>
  );
}

export default ReportProblem;