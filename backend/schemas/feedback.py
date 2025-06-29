from sqlmodel import SQLModel
from uuid import UUID
from enum import Enum
from typing import Optional
from datetime import datetime


class FeedbackType(str, Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    NEUTRAL = "neutral"


class FeedbackCreate(SQLModel):
    strengths: str
    areas_to_improve: str
    sentiment: FeedbackType
    employee_id: UUID


class FeedbackUpdate(SQLModel):
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    feedback_type: Optional[FeedbackType]
    # acknowledged: Optional[bool]



class FeedbackRead(FeedbackCreate):
    feedback_id: UUID
    employee_id: UUID
    manager_id: UUID
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    feedback_type: FeedbackType
    acknowledged: bool
    created_at: datetime
    updated_at: datetime
    # id: UUID
    # manager_id: UUID
    # acknowledged: bool


class FeedbackCreateRequest(SQLModel):
    employee_id: UUID
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    feedback_type: FeedbackType  # e.g., POSITIVE, NEGATIVE, NEUTRAL

class SubmittedFeedbackResponse(SQLModel):
    feedback_id: UUID
    employee_id: UUID
    employee_name: str
    employee_email: str
    submitted_at: datetime
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    acknowledged: bool
    feedback_type: str

class FeedbackOut(SQLModel):
    id: UUID
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    feedback_type: FeedbackType
    acknowledged: bool
    created_at: datetime


class EmployeeWithFeedbackOut(SQLModel):
    id: UUID
    username: str
    email: str
    feedbacks: list[FeedbackOut]