# app/api/routes/feedback.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from typing import List, Optional
from uuid import UUID

from db.session import get_session
from models.feedback import Feedback
from models.user import User
from models.team import Team
from schemas.user import UserRole
# from app.api.deps import get_current_user
from schemas.feedback import FeedbackCreate, FeedbackRead, FeedbackUpdate

from pydantic import BaseModel
from schemas.feedback import FeedbackType
from datetime import datetime


router = APIRouter()

class FeedbackOut(BaseModel):
    id: UUID
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    feedback_type: FeedbackType
    acknowledged: bool
    created_at: datetime

    class Config:
        orm_mode = True

class EmployeeWithFeedbackOut(BaseModel):
    id: UUID
    username: str
    email: str
    feedbacks: list[FeedbackOut]

    class Config:
        orm_mode = True


@router.get("/team/{manager_id}", response_model=List[EmployeeWithFeedbackOut])
def get_team_feedbacks_by_manager(manager_id: UUID, session: Session = Depends(get_session)):
    query = (
        select(User)
        .join(Team, Team.member_id == User.id)
        .options(selectinload(User.feedbacks))  # eager load feedbacks
        .where(Team.manager_id == manager_id)
    )

    users = session.exec(query).all()
    print("Users : ", users)

    # Optional: Filter each user's feedbacks to only show feedbacks from this manager
    for user in users:
        user.feedbacks = [fb for fb in user.feedbacks if fb.manager_id == manager_id]

    return users


@router.post("/", response_model=FeedbackRead)
def submit_feedback(
    data: FeedbackCreate,
    session: Session = Depends(get_session),
    # current_user: User = Depends(get_current_user)
):
    # if current_user.role != Role.MANAGER:
    #     raise HTTPException(status_code=403, detail="Only managers can give feedback")

    feedback = Feedback(
        strengths=data.strengths,
        behaviour=data.behavior,
        areas_to_improve=data.areas_to_improve,
        feedback_type=data.feedback_type,
        employee_id=data.employee_id,
        # manager_id=current_user.id
    )
    session.add(feedback)
    session.commit()
    session.refresh(feedback)
    return feedback


@router.get("/me", response_model=List[FeedbackRead])
def get_my_feedback(
    session: Session = Depends(get_session),
    # current_user: User = Depends(get_current_user)
):
    # if current_user.role != UserRole.EMPLOYEE:
    #     raise HTTPException(status_code=403, detail="Only employees can see feedback")

    # feedbacks = session.exec(
    #     select(Feedback).where(Feedback.employee_id == current_user.id)
    # ).all()
    
    # return feedbacks
    return []


@router.patch("/{feedback_id}/acknowledge", response_model=FeedbackRead)
def acknowledge_feedback(
    feedback_id: UUID,
    session: Session = Depends(get_session),
    # current_user: User = Depends(get_current_user)
):
    feedback = session.get(Feedback, feedback_id)

    # if not feedback or feedback.employee_id != current_user.id:
    #     raise HTTPException(status_code=404, detail="Feedback not found")

    feedback.acknowledged = True
    session.add(feedback)
    session.commit()
    session.refresh(feedback)
    return feedback


@router.patch("/{feedback_id}", response_model=FeedbackRead)
def update_feedback(
    feedback_id: UUID,
    data: FeedbackUpdate,
    session: Session = Depends(get_session),
    # current_user: User = Depends(get_current_user)
):
    feedback = session.get(Feedback, feedback_id)

    # if not feedback or feedback.manager_id != current_user.id:
    #     raise HTTPException(status_code=403, detail="Not allowed to edit")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(feedback, field, value)

    session.add(feedback)
    session.commit()
    session.refresh(feedback)
    return feedback
