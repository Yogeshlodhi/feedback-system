import uuid
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import List, Optional
from enum import Enum
# from models.feedback import Feedback
from schemas.user import UserRole

class User(SQLModel, table=True):
    # User's own unique identifier
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    
    # Team the user belongs to, if any
    # team_id: Optional[uuid.UUID] = Field(foreign_key="team.id", index=True, nullable=True)
    
    username: str = Field(index=True, nullable=False)
    email: str = Field(index=True, unique=True, nullable=False)
    password: str = Field(nullable=False)
    role: UserRole = Field(default=UserRole.EMPLOYEE, nullable=False)
    
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    
     # Explicitly define foreign_keys to resolve ambiguity
    feedbacks: List["Feedback"] = Relationship(
        back_populates="employee",
        sa_relationship_kwargs={"foreign_keys": "[Feedback.employee_id]"}
    )

    submitted_feedbacks: List["Feedback"] = Relationship(
        back_populates="manager",
        sa_relationship_kwargs={"foreign_keys": "[Feedback.manager_id]"}
    )


from models.feedback import Feedback 

    