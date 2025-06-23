from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from db.session import get_session
from models.user import User
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
        # password=user_in.password  # In a real application, ensure to hash the password
        password=hash_password(user_in.password)  # Placeholder for hashed password
    )
    
    session.add(new_user)
    session.commit()    
    session.refresh(new_user)
    
    # fix the create_access_token function to accept a user ID and role
    # This function should create a JWT token with the user's ID and role
    access_token = create_access_token(data={"sub": str(new_user.id), "role": new_user.role})
    
    return TokenResponse(access_token=access_token, token_type="bearer")


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
    return TokenResponse(access_token=access_token, token_type="bearer")

# @router.post("/login", response_model=TokenResponse)
# def login(user_in: UserCreate, session: Session = Depends(get_session)):
#     """
#     Authenticate a user and return an access token.
#     This endpoint allows users to log in by providing their username and password.
#     """
    
#     user = session.exec(
#         select(User).where(User.email == user_in.email)
#     ).first()
    
#     if not user or user.password != user_in.password:  # In a real application, ensure to verify the hashed password
#         raise HTTPException(
#             # status_code= status.HTTP_401_UNAUTHORIZED,
#             status_code= 401,
#             detail="Invalid username or password",
#         )
        
#     access_token = create_access_token(data={"sub": str(user.id), "role": user.role})   
    
#     return TokenResponse(access_token=access_token, token_type="bearer")