# app/api/routes/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from db.session import get_session
from models.user import User
from models.team import Team
from models.feedback import Feedback
from schemas.user import UserRole, UserTeamResponse
from api.deps import get_current_user
from typing import List

router = APIRouter()


@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


# @router.get("/team", response_model=List[User])
@router.get("/team", response_model=List[UserTeamResponse])
def get_team_members(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    if current_user.role != UserRole.MANAGER:
        raise HTTPException(status_code=403, detail="Only managers can view their team")

    # Get the member IDs for this manager
    team_entries = session.exec(
        select(Team).where(Team.manager_id == current_user.id)
    ).all()

    member_ids = [team.member_id for team in team_entries]

    if not member_ids:
        return []

    # Fetch user objects of those members
    team_members = session.exec(
        select(User).where(User.id.in_(member_ids))
    ).all()
    
    
    team = []
    
    for member in team_members:
        feedbacks = session.exec(
            select(Feedback).where(Feedback.employee_id == member.id)
        ).all()
        # print(f"Feedbacks for {member}")
        feedback_count = len(feedbacks)
        
        team.append(UserTeamResponse(
            member_id=member.id,
            username=member.username,
            feedback_count=feedback_count,
            position="Software Developer",  # Placeholder, replace with actual logic if needed
            sentiment_trend="Neutral"  # Placeholder, replace with actual logic if needed
        ))

    return team

# @router.get("/team", response_model=List[User])
# def get_team_members(
#     current_user: User = Depends(get_current_user),
#     session: Session = Depends(get_session)
# ):
#     if current_user.role != UserRole.MANAGER:
#         return []

#     employees = session.exec(
#         select(User).where(User.role == UserRole.EMPLOYEE)
#     ).all()
    
#     return employees
