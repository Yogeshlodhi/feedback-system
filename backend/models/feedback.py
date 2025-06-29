from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4
from models.user import User
from schemas.feedback import FeedbackType


class Feedback(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    employee_id: UUID = Field(foreign_key="user.id", nullable=False)
    manager_id: UUID = Field(foreign_key="user.id", nullable=False)
    
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    
    strengths: Optional[str] = Field(default=None, nullable=True)
    behavior: Optional[str] = Field(default=None, nullable=True)
    area_to_improve: Optional[str] = Field(default=None, nullable=True)
    
    feedback_type: FeedbackType = Field(default=FeedbackType.NEUTRAL, nullable=False)
    acknowledged: bool = Field(default=False)
    
    # foreign_keys to resolve ambiguity
    employee: User = Relationship(
        back_populates="feedbacks",
        sa_relationship_kwargs={"foreign_keys": "[Feedback.employee_id]"}
    )

    manager: User = Relationship(
        back_populates="submitted_feedbacks",
        sa_relationship_kwargs={"foreign_keys": "[Feedback.manager_id]"}
    )