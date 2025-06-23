from sqlmodel import SQLModel
from uuid import UUID
from enum import Enum
from typing import Optional


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
    areas_to_improve: Optional[str]
    sentiment: Optional[FeedbackType]


class FeedbackRead(FeedbackCreate):
    id: UUID
    manager_id: UUID
    acknowledged: bool
