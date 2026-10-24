
import uuid
from pathlib import Path

from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
from models import Complaint


# Create FastAPI application
app = FastAPI(title="UrbanEye API")


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create database tables
Base.metadata.create_all(bind=engine)


# Photo storage folder
BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


# Serve uploaded photos
app.mount(
    "/uploads",
    StaticFiles(directory=str(UPLOAD_DIR)),
    name="uploads",
)


# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Home route
@app.get("/")
def home():
    return {"message": "UrbanEye Backend is Running!"}


# Health check
@app.get("/health")
def health():
    return {"status": "OK"}


# Get all complaints
@app.get("/complaints")
def get_complaints(db: Session = Depends(get_db)):
    return db.query(Complaint).all()


# Create complaint with optional photo
@app.post("/complaints", status_code=201)
async def create_complaint(
    category: str = Form(...),
    description: str = Form(...),
    latitude: float | None = Form(None),
    longitude: float | None = Form(None),
    severity: str = Form("Medium"),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    allowed_categories = {"Pothole", "Garbage", "Drainage"}
    allowed_severities = {"Low", "Medium", "High"}
    allowed_image_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
    }

    # Validate category
    if category not in allowed_categories:
        raise HTTPException(
            status_code=400,
            detail="Category must be Pothole, Garbage, or Drainage",
        )

    # Validate description
    if not description.strip() or len(description.strip()) < 3:
        raise HTTPException(
            status_code=400,
            detail="Description must contain at least 3 characters",
        )

    # Validate severity
    if severity not in allowed_severities:
        raise HTTPException(
            status_code=400,
            detail="Severity must be Low, Medium, or High",
        )

    image_url = None
    saved_image_path = None

    try:
        # Process optional image
        if image is not None and image.filename:
            if image.content_type not in allowed_image_types:
                raise HTTPException(
                    status_code=400,
                    detail="Only JPG, PNG, and WEBP images are allowed",
                )

            content = await image.read()

            if len(content) > 10 * 1024 * 1024:
                raise HTTPException(
                    status_code=400,
                    detail="Image size must be 10 MB or less",
                )

            if not content:
                raise HTTPException(
                    status_code=400,
                    detail="Uploaded image is empty",
                )

            extension_by_type = {
                "image/jpeg": ".jpg",
                "image/png": ".png",
                "image/webp": ".webp",
            }

            filename = (
                f"{uuid.uuid4().hex}"
                f"{extension_by_type[image.content_type]}"
            )

            saved_image_path = UPLOAD_DIR / filename
            saved_image_path.write_bytes(content)
            image_url = f"/uploads/{filename}"

        # Save complaint to database
        complaint = Complaint(
            category=category,
            description=description.strip(),
            latitude=latitude,
            longitude=longitude,
            image_url=image_url,
            severity=severity,
            status="Submitted",
        )

        db.add(complaint)
        db.commit()
        db.refresh(complaint)

        return {
            "message": "Complaint submitted successfully",
            "complaint_id": complaint.id,
            "category": complaint.category,
            "description": complaint.description,
            "latitude": complaint.latitude,
            "longitude": complaint.longitude,
            "image_url": (
                f"http://127.0.0.1:8000{complaint.image_url}"
                if complaint.image_url
                else None
            ),
            "severity": complaint.severity,
            "status": complaint.status,
        }

    except HTTPException:
        if saved_image_path and saved_image_path.exists():
            saved_image_path.unlink()
        raise

    except Exception as error:
        db.rollback()

        if saved_image_path and saved_image_path.exists():
            saved_image_path.unlink()

        print(f"Complaint submission error: {error}")

        raise HTTPException(
            status_code=500,
            detail="Unable to save complaint to database",
        )

    finally:
        if image is not None:
            await image.close()
