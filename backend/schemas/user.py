from typing import Optional, List
from sqlmodel import SQLModel
from enum import Enum
from pydantic import BaseModel
from uuid import UUID

class UserRole(str, Enum):
    MANAGER="manager"
    EMPLOYEE="employee"
    
class UserPosition(str, Enum):
    SOFTWARE_DEVELOPER = "Software Developer"
    DATA_ANALYST = "Data Analyst"
    QA_ENGINEER = "QA Engineer"
    DESIGNER = "Designer"
    MANAGER = "Manager"
    
class UserBase(SQLModel):
    username: str
    email: str
    role: UserRole = UserRole.EMPLOYEE
    position: UserPosition

class UserCreate(UserBase):
    password: str


class TokenResponse(SQLModel):
    access_token: str
    user: UserBase
    
class LoginRequest(BaseModel):
    email: str
    password: str
    
class UserTeamResponse(BaseModel):
    member_id: UUID
    username: str
    feedback_count: int
    position: Optional[str] = "Software Developer"  # Placeholder
    sentiment_trend: Optional[str] = "Neutral"      # Placeholder
