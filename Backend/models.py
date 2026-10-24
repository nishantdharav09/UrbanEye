from sqlalchemy import Column, Integer, String, Float, Text
from database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    image_url = Column(String(255), nullable=True)
    severity = Column(String(20), default="Medium")
    status = Column(String(30), default="Submitted")