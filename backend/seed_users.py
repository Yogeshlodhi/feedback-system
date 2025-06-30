from sqlmodel import Session
from models.user import User
# from db import engine
from db.init_db import engine
from utils.security import hash_password
from schemas.user import UserRole, UserPosition
from datetime import datetime

dummy_users = [
    {
        "username": "Harper Evans",
        "email": "harper.evans@example.com",
        "password": "harper123",
        "role": "employee",
        "position": "Data Analyst"
    },
    {
        "username": "Ethan Brooks",
        "email": "ethan.brooks@example.com",
        "password": "ethan123",
        "role": "employee",
        "position": "Software Developer"
    },
    {
        "username": "Chloe Anderson",
        "email": "chloe.anderson@example.com",
        "password": "chloe123",
        "role": "employee",
        "position": "QA Engineer"
    },
    {
        "username": "Lucas Parker",
        "email": "lucas.parker@example.com",
        "password": "lucas123",
        "role": "employee",
        "position": "Designer"
    },
    {
        "username": "Grace Martinez",
        "email": "grace.martinez@example.com",
        "password": "grace123",
        "role": "employee",
        "position": "Software Developer"
    },
    {
        "username": "Henry Nguyen",
        "email": "henry.nguyen@example.com",
        "password": "henry123",
        "role": "employee",
        "position": "Data Analyst"
    },
    {
        "username": "Aria Rivera",
        "email": "aria.rivera@example.com",
        "password": "aria123",
        "role": "employee",
        "position": "QA Engineer"
    },
    {
        "username": "Jack Murphy",
        "email": "jack.murphy@example.com",
        "password": "jack123",
        "role": "employee",
        "position": "Software Developer"
    },
    {
        "username": "Lily Hughes",
        "email": "lily.hughes@example.com",
        "password": "lily123",
        "role": "employee",
        "position": "Designer"
    },
    {
        "username": "Mason Lopez",
        "email": "mason.lopez@example.com",
        "password": "mason123",
        "role": "employee",
        "position": "QA Engineer"
    },
    {
        "username": "Zoe Wright",
        "email": "zoe.wright@example.com",
        "password": "zoe123",
        "role": "employee",
        "position": "Data Analyst"
    },
    {
        "username": "Benjamin Torres",
        "email": "benjamin.torres@example.com",
        "password": "benjamin123",
        "role": "employee",
        "position": "Software Developer"
    },
    {
        "username": "Ella Foster",
        "email": "ella.foster@example.com",
        "password": "ella123",
        "role": "employee",
        "position": "QA Engineer"
    },
    {
        "username": "Alexander Price",
        "email": "alexander.price@example.com",
        "password": "alex123",
        "role": "employee",
        "position": "Designer"
    },
    {
        "username": "Scarlett Bell",
        "email": "scarlett.bell@example.com",
        "password": "scarlett123",
        "role": "employee",
        "position": "Software Developer"
    }
    
    # {
    #     "username": "Alice Johnson",
    #     "email": "alice.johnson@example.com",
    #     "password": "alice123",
    #     "role": UserRole.EMPLOYEE,
    #     "position": UserPosition.DATA_ANALYST
    # },
    # {
    #     "username": "Mark Lee",
    #     "email": "mark.lee@example.com",
    #     "password": "mark123",
    #     "role": UserRole.MANAGER,
    #     "position": UserPosition.MANAGER
    # },
    # {
    #     "username": "Sara Kim",
    #     "email": "sara.kim@example.com",
    #     "password": "sara123",
    #     "role": UserRole.EMPLOYEE,
    #     "position": UserPosition.QA_ENGINEER
    # },
    # {
    #     "username": "John Doe",
    #     "email": "john.doe@example.com",
    #     "password": "john123",
    #     "role": UserRole.MANAGER,
    #     "position": UserPosition.DESIGNER
    # },
    # {
    #     "username": "Emily Carter",
    #     "email": "emily.carter@example.com",
    #     "password": "emily123",
    #     "role": "employee",
    #     "position": "Software Developer"
    # },
    # {
    #     "username": "Daniel Smith",
    #     "email": "daniel.smith@example.com",
    #     "password": "daniel123",
    #     "role": "employee",
    #     "position": "QA Engineer"
    # },
    # {
    #     "username": "Olivia Brown",
    #     "email": "olivia.brown@example.com",
    #     "password": "olivia123",
    #     "role": "manager",
    #     "position": "Manager"
    # },
    # {
    #     "username": "Michael Scott",
    #     "email": "michael.scott@example.com",
    #     "password": "dundermifflin",
    #     "role": "manager",
    #     "position": "Manager"
    # },
    # {
    #     "username": "Rachel Green",
    #     "email": "rachel.green@example.com",
    #     "password": "rachel123",
    #     "role": "employee",
    #     "position": "Designer"
    # },
    # {
    #     "username": "James Patel",
    #     "email": "james.patel@example.com",
    #     "password": "james123",
    #     "role": "employee",
    #     "position": "Data Analyst"
    # },
    # {
    #     "username": "Priya Sharma",
    #     "email": "priya.sharma@example.com",
    #     "password": "priya123",
    #     "role": "employee",
    #     "position": "Software Developer"
    # },
    # {
    #     "username": "Liam Wilson",
    #     "email": "liam.wilson@example.com",
    #     "password": "liam123",
    #     "role": "manager",
    #     "position": "Manager"
    # },
    # {
    #     "username": "Ava Thomas",
    #     "email": "ava.thomas@example.com",
    #     "password": "ava123",
    #     "role": "employee",
    #     "position": "QA Engineer"
    # },
    # {
    #     "username": "Noah Davis",
    #     "email": "noah.davis@example.com",
    #     "password": "noah123",
    #     "role": "employee",
    #     "position": "Software Developer"
    # },
]

def insert_users():
    with Session(engine) as session:
        for user_data in dummy_users:
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                password=hash_password(user_data["password"]),
                role=user_data["role"],
                position=user_data["position"],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            session.add(user)
        session.commit()
        print("✅ Dummy users inserted successfully.")

if __name__ == "__main__":
    insert_users()