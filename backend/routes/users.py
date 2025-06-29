# app/api/routes/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from db.session import get_session
from models.user import User
from models.team import Team
from models.feedback import Feedback
from schemas.user import UserRole, UserTeamResponse
from utils.deps import get_current_user
from utils.feedback import get_sentiment_trend
from typing import List

from collections import Counter

router = APIRouter()


#  Get the current user's information [ NOT UTILIZED YET ]
@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

# Get all team members for a manager
@router.get("/team", response_model=List[UserTeamResponse])
def get_team_members(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    if current_user.role != UserRole.MANAGER:
        raise HTTPException(status_code=403, detail="Only managers can view their team")

    team_entries = session.exec(
        select(Team).where(Team.manager_id == current_user.id)
    ).all()

    member_ids = [team.member_id for team in team_entries]

    if not member_ids:
        return []

    team_members = session.exec(
        select(User).where(User.id.in_(member_ids))
    ).all()
    
    
    team = []
    
    for member in team_members:
        feedbacks = session.exec(
            select(Feedback).where(Feedback.employee_id == member.id)
        ).all()
        
        feedback_count = len(feedbacks)
        
        sentiment_trend = "No Feedback"
        if feedback_count > 0:
            sentiment_trend = get_sentiment_trend(feedbacks)
        
        team.append(UserTeamResponse(
            member_id=member.id,
            username=member.username,
            feedback_count=feedback_count,
            position="Software Developer",  
            sentiment_trend=sentiment_trend 
        ))

    return team
