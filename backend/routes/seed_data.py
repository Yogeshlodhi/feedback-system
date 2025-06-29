# routes/seed.py
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from db.init_db import engine, get_session
from models.user import User
from models.team import Team
from models.feedback import Feedback
from schemas.user import UserRole
from schemas.feedback import FeedbackType
from utils.security import hash_password
from datetime import datetime
from uuid import uuid4
import random

router = APIRouter()

dummy_users = [
    {
        "username": "Alice Johnson", "email": "alice.johnson@example.com", "password": "alice123",
        "role": "employee", "position": "Data Analyst"
    },
    {
        "username": "Yogesh Kumar", "email": "yogeshkumar051202@gmail.com", "password": "yogesh123",
        "role": "employee", "position": "Software Developer"
    },
    {
        "username": "Yogesh Lodhi", "email": "yogeshlodhi1208@gmail.com", "password": "yogesh123",
        "role": "manager", "position": "Manager"
    },
    {
        "username": "Mark Lee", "email": "mark.lee@example.com", "password": "mark123",
        "role": "manager", "position": "Manager"
    },
    {
        "username": "Sara Kim", "email": "sara.kim@example.com", "password": "sara123",
        "role": "employee", "position": "QA Engineer"
    },
    {
        "username": "John Doe", "email": "john.doe@example.com", "password": "john123",
        "role": "manager", "position": "Designer"
    },
    {
        "username": "Emily Carter", "email": "emily.carter@example.com", "password": "emily123",
        "role": "employee", "position": "Software Developer"
    },
    {
        "username": "Daniel Smith", "email": "daniel.smith@example.com", "password": "daniel123",
        "role": "employee", "position": "QA Engineer"
    },
    {
        "username": "Olivia Brown", "email": "olivia.brown@example.com", "password": "olivia123",
        "role": "manager", "position": "Manager"
    },
    {
        "username": "Michael Scott", "email": "michael.scott@example.com", "password": "dundermifflin",
        "role": "manager", "position": "Manager"
    },
    {
        "username": "Rachel Green", "email": "rachel.green@example.com", "password": "rachel123",
        "role": "employee", "position": "Designer"
    },
    {
        "username": "James Patel", "email": "james.patel@example.com", "password": "james123",
        "role": "employee", "position": "Data Analyst"
    },
    {
        "username": "Priya Sharma", "email": "priya.sharma@example.com", "password": "priya123",
        "role": "employee", "position": "Software Developer"
    },
    {
        "username": "Liam Wilson", "email": "liam.wilson@example.com", "password": "liam123",
        "role": "manager", "position": "Manager"
    },
    {
        "username": "Ava Thomas", "email": "ava.thomas@example.com", "password": "ava123",
        "role": "employee", "position": "QA Engineer"
    },
    {
        "username": "Noah Davis", "email": "noah.davis@example.com", "password": "noah123",
        "role": "employee", "position": "Software Developer"
    },
]

strength_examples = [
    "Great problem-solving skills", "Strong communication", "Team player",
    "Proactive attitude", "Excellent time management"
]

behavior_examples = [
    "Always punctual", "Supportive during crunch time", "Maintains professionalism",
    "Goes the extra mile", "Collaborates well"
]

improvement_examples = [
    "Could improve documentation", "Needs to ask for help sooner",
    "Improve focus during meetings", "Better time estimation on tasks",
    "Needs to contribute more in standups"
]

@router.post("/seed/all")
def seed_all(session: Session = Depends(get_session)):
    # Clear old data (optional, if needed)
    session.exec("DELETE FROM feedback")
    session.exec("DELETE FROM team")
    session.exec("DELETE FROM user")
    session.commit()

    # Insert users
    user_objs = []
    for user in dummy_users:
        user_obj = User(
            username=user["username"],
            email=user["email"],
            password=hash_password(user["password"]),
            role=UserRole(user["role"]),
            position=user["position"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        session.add(user_obj)
        user_objs.append(user_obj)
    session.commit()

    # Fetch users again with IDs populated
    users = session.exec(select(User)).all()
    managers = [u for u in users if u.role == UserRole.MANAGER]
    employees = [u for u in users if u.role == UserRole.EMPLOYEE]

    # Create teams (assign each employee to a random manager)
    for emp in employees:
        manager = random.choice(managers)
        team = Team(
            manager_id=manager.id,
            member_id=emp.id,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        session.add(team)
    session.commit()

    # Create feedback for each team
    teams = session.exec(select(Team)).all()
    for team in teams:
        feedback = Feedback(
            id=uuid4(),
            employee_id=team.member_id,
            manager_id=team.manager_id,
            feedback_type=random.choice(list(FeedbackType)),
            strengths=random.choice(strength_examples),
            behavior=random.choice(behavior_examples),
            area_to_improve=random.choice(improvement_examples),
            acknowledged=random.choice([True, False]),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        session.add(feedback)

    session.commit()
    return {"message": "✅ All users, teams, and feedback records seeded successfully."}
