# app/db/init_db.py
from db.session import engine
from sqlmodel import SQLModel
from models.user import User  # import all models
from models.feedback import Feedback

def init_db():
    SQLModel.metadata.create_all(engine)
