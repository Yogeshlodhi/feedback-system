from typing import Optional, List
from sqlmodel import SQLModel
from enum import Enum
from pydantic import BaseModel


class UserRole(str, Enum):
    MANAGER="manager"
    EMPLOYEE="employee"
    
class UserBase(SQLModel):
    username: str
    email: str
    role: UserRole = UserRole.EMPLOYEE

class UserCreate(UserBase):
    password: str


class TokenResponse(SQLModel):
    access_token: str
    # token_type: str
    user: UserBase
    
class LoginRequest(BaseModel):
    email: str
    password: str