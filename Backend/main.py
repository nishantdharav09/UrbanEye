
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
from models import Complaint

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


# Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Complaint Request Model
class ComplaintCreate(BaseModel):
    category: str = Field(min_length=1)
    description: str = Field(min_length=3)
    latitude: float | None = None
    longitude: float | None = None
    severity: str = "Medium"


# Home Route
@app.get("/")
def home():
    return {"message": "UrbanEye Backend is Running!"}


# Health Check
@app.get("/health")
def health():
    return {"status": "OK"}


# Get All Complaints
@app.get("/complaints")
def get_complaints(db: Session = Depends(get_db)):
    return db.query(Complaint).all()


# Create Complaint
@app.post("/complaints", status_code=201)
def create_complaint(
    complaint_data: ComplaintCreate,
    db: Session = Depends(get_db)
):
    allowed_categories = {"Pothole", "Garbage", "Drainage"}
    allowed_severities = {"Low", "Medium", "High"}

    if complaint_data.category not in allowed_categories:
        raise HTTPException(
            status_code=400,
            detail="Category must be Pothole, Garbage, or Drainage"
        )

    if complaint_data.severity not in allowed_severities:
        raise HTTPException(
            status_code=400,
            detail="Severity must be Low, Medium, or High"
        )

    complaint = Complaint(
        category=complaint_data.category,
        description=complaint_data.description,
        latitude=complaint_data.latitude,
        longitude=complaint_data.longitude,
        severity=complaint_data.severity,
        status="Submitted"
    )

    try:
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
            "severity": complaint.severity,
            "status": complaint.status
        }

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unable to save complaint to database"
        )
