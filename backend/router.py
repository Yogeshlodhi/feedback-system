from fastapi import APIRouter
from routes import auth, users, feedback

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["feedback"])