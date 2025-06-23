# app/api/routes/users.py
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from db.session import get_session
from models.user import User
from schemas.user import UserRole
# from app.api.deps import get_current_user
from typing import List

router = APIRouter()


@router.get("/me", response_model=User)
# def read_users_me(current_user: User = Depends(get_current_user)):
#     return current_user
def read_users_me():
    return "Hi"


@router.get("/team", response_model=List[User])
def get_team_members(
    # current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # if current_user.role != UserRole.MANAGER:
    #     return []

    employees = session.exec(
        select(User).where(User.role == UserRole.EMPLOYEE)
    ).all()
    return employees
