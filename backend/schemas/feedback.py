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
    area_to_improve: str
    feedback_type : FeedbackType
    employee_id: UUID


class FeedbackUpdate(SQLModel):
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    feedback_type: Optional[FeedbackType]



class FeedbackRead(FeedbackCreate):
    id: UUID
    employee_id: UUID
    manager_id: UUID
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    feedback_type: FeedbackType
    acknowledged: bool
    created_at: datetime
    updated_at: datetime


class FeedbackCreateRequest(SQLModel):
    employee_id: UUID
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    feedback_type: FeedbackType  

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
    
class MyFeedbackResponse(SQLModel):
    feedback_id: UUID
    from_manager: str
    strengths: str
    behavior: str
    area_to_improve: str
    feedback_type: str 
    received_on: datetime
    acknowledged: bool

class AcknowledgeResponse(SQLModel):
    message: str
