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
from utils.deps import get_current_user
from schemas.feedback import FeedbackRead, FeedbackUpdate, FeedbackCreateRequest, SubmittedFeedbackResponse, MyFeedbackResponse, AcknowledgeResponse
from datetime import datetime


router = APIRouter()


# Get all feedbacks submitted by a specific manager
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
        
        # print("Feedback Details:", fb.id)
        
        response.append(SubmittedFeedbackResponse(
            feedback_id=fb.id,
            employee_id=employee.id,
            employee_name=employee.username,
            employee_email=employee.email,
            submitted_at=fb.created_at.date(),
            strengths=fb.strengths,
            behavior=fb.behavior,
            area_to_improve=fb.area_to_improve,
            acknowledged=fb.acknowledged,
            feedback_type=fb.feedback_type.value
        ))

    return response


# Submit feedback for an employee
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


# Give aknowledgment to a feedback
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


# Update / Edit a feedback
# @router.patch("/{feedback_id}", response_model=FeedbackRead)
@router.patch("/{feedback_id}")
def update_feedback(
    feedback_id: UUID,
    data: FeedbackUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    feedback = session.get(Feedback, feedback_id)

    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")

    # Only the manager who submitted the feedback can edit it
    if current_user.id != feedback.manager_id:
        raise HTTPException(status_code=403, detail="You can only update feedback you submitted")

    # Update only provided fields
    for field, value in data.dict(exclude_unset=True).items():
        setattr(feedback, field, value)

    session.add(feedback)
    session.commit()
    session.refresh(feedback)

    return feedback

#  Get Feedbacks Timeline for a specific employee
@router.get("/timeline", response_model=List[FeedbackRead])  
def get_feedback_timeline(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    employee_id = current_user.id
    
    if not employee_id:
        raise HTTPException(status_code=404, detail="Employee not found")    

    feedbacks = session.exec(
        select(Feedback).where(Feedback.employee_id == employee_id).order_by(Feedback.created_at.desc())
    ).all()
    
    print("Feedbacks:", feedbacks)

    return feedbacks


# Get all feedbacks received for the current employee
@router.get("/my_feedbacks", response_model=List[MyFeedbackResponse])  
def get_my_feedbacks(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    feedbacks = session.exec(
        select(Feedback)
        .where(Feedback.employee_id == current_user.id)
        .order_by(Feedback.created_at.desc())
    ).all()

    if not feedbacks:
        return []

    response = []
    for fb in feedbacks:
        print("Feedback ID:", fb)
        manager = session.get(User, fb.manager_id)
        response.append(
            MyFeedbackResponse(
            feedback_id=fb.id,
            from_manager=manager.username,
            strengths=fb.strengths or "No strengths mentioned",
            behavior=fb.behavior or "No behavior mentioned",
            area_to_improve=fb.area_to_improve or "No improvement area mentioned",
            feedback_type=fb.feedback_type.value,
            received_on=fb.created_at,
            acknowledged=fb.acknowledged
        ))

    return response



# Acknowledge feedback by employee
@router.patch("/acknowledge/{feedback_id}")
def acknowledge_feedback(
    feedback_id: UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    feedback = session.get(Feedback, feedback_id)

    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")

    if feedback.employee_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to acknowledge this feedback")

    if feedback.acknowledged:
        return {"message": "Feedback already acknowledged"}
    

    feedback.acknowledged = True
    
    session.add(feedback)
    session.commit()
    session.refresh(feedback)

    return {"message": "Feedback acknowledged successfully"}