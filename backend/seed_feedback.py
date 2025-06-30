from datetime import datetime
from uuid import uuid4
import random

from sqlmodel import Session
from db.init_db import engine  # Adjust this to your DB connection
from models.feedback import Feedback
from models.team import Team
from schemas.feedback import FeedbackType

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

def seed_feedback():
    with Session(engine) as session:
        teams = session.exec(Team).all()
        
        for team in teams:
            feedback = Feedback(
                id=uuid4(),
                employee_id=team.member_id,
                manager_id=team.manager_id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
                strengths=random.choice(strength_examples),
                behavior=random.choice(behavior_examples),
                area_to_improve=random.choice(improvement_examples),
                feedback_type=random.choice(list(FeedbackType)),
                acknowledged=random.choice([True, False])
            )
            session.add(feedback)
        
        session.commit()
        print(f"✅ Seeded {len(teams)} feedback records")

if __name__ == "__main__":
    seed_feedback()
