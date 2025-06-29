from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from db.session import get_session
from models.user import User
from models.team import Team
from schemas.user import TokenResponse, UserCreate, LoginRequest
from utils.security import create_access_token, hash_password, verify_password


router = APIRouter()

@router.get("/health")
def health_check():
    """
    Health check endpoint to verify if the service is running.
    This endpoint returns a simple message indicating the service is up and running.
    """
    return {"message": "Service is running"}


@router.post("/signup", response_model=TokenResponse)
def signup(user_in: UserCreate, session: Session = Depends(get_session)):
    """
    Register a new user in the system.
    This endpoint allows users to create a new account by providing their username, email, and password
    
    """
    
    user = session.exec(
        select(User).where(User.email == user_in.email)
    ).first()
    
    if user:
        raise HTTPException(
            status_code=400,
            detail="User already exists",
        )
    
    new_user = User(
        username=user_in.username,
        email=user_in.email,
        role=user_in.role,
        password=hash_password(user_in.password)  
    )
    
    session.add(new_user)
    session.commit()    
    session.refresh(new_user)
    
    access_token = create_access_token(data={"sub": str(new_user.id), "role": new_user.role})
    
    return TokenResponse(access_token=access_token, user=new_user)


@router.post("/login", response_model=TokenResponse)
def login(user_in: LoginRequest, session: Session = Depends(get_session)):
    """
    Log in using email and password (via JSON body).
    """
    user = session.exec(
        select(User).where(User.email == user_in.email)
    ).first()

    if not user or not verify_password(user_in.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    access_token = create_access_token(data={"sub": str(user.id), "role": user.role})
    return TokenResponse(access_token=access_token, user=user)