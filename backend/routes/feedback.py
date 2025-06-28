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
from api.deps import get_current_user
from schemas.feedback import FeedbackCreate, FeedbackRead, FeedbackUpdate, FeedbackCreateRequest
# from schemas.user import 

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

    # class Config:
    #     orm_mode = True

class EmployeeWithFeedbackOut(BaseModel):
    id: UUID
    username: str
    email: str
    feedbacks: list[FeedbackOut]

    # class Config:
    #     orm_mode = True
    
class SubmittedFeedbackResponse(BaseModel):
    employee_id: UUID
    employee_name: str
    submitted_at: datetime
    strengths: Optional[str]
    behavior: Optional[str]
    area_to_improve: Optional[str]
    acknowledged: bool
    feedback_type: str


@router.get("/submitted", response_model=List[SubmittedFeedbackResponse])
def get_team_feedbacks_by_manager(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    if current_user.role != UserRole.MANAGER:
        raise HTTPException(status_code=403, detail="Only managers can view submitted feedbacks")

    feedbacks = session.exec(
        select(Feedback).where(Feedback.manager_id == current_user.id)
    ).all()

    response = []
    for fb in feedbacks:
        employee = session.get(User, fb.employee_id)
        # print(f"Processing feedback for employee: {employee}")
        
        # print(f"Feedback details: {fb}")
        
        response.append(SubmittedFeedbackResponse(
            employee_id=employee.id,
            employee_name=employee.username,
            submitted_at=fb.created_at.date(),
            strengths=fb.strengths,
            behavior=fb.behavior,
            area_to_improve=fb.area_to_improve,
            acknowledged=fb.acknowledged,
            feedback_type=fb.feedback_type.value
        ))

    return response


@router.post("/submit")
def submit_feedback(
    feedback_data: FeedbackCreateRequest,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Only MANAGERS can submit feedback
    if current_user.role != UserRole.MANAGER:
        raise HTTPException(status_code=403, detail="Only managers can submit feedback")

    # Check if the employee is in the manager's team
    team_entry = session.exec(
        select(Team).where(
            (Team.manager_id == current_user.id) &
            (Team.member_id == feedback_data.employee_id)
        )
    ).first()

    if not team_entry:
        raise HTTPException(status_code=403, detail="You can only give feedback to your team members")

    # Submit feedback
    new_feedback = Feedback(
        employee_id=feedback_data.employee_id,
        manager_id=current_user.id,
        strengths=feedback_data.strengths,
        behavior=feedback_data.behavior,
        area_to_improve=feedback_data.area_to_improve,
        feedback_type=feedback_data.feedback_type,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        acknowledged=False
    )

    session.add(new_feedback)
    session.commit()
    session.refresh(new_feedback)

    return {"message": "Feedback submitted successfully", "feedback_id": new_feedback.id}


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
