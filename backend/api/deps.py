# app/api/deps.py

from sqlmodel import Session, select
from db.session import get_session
from models.user import User
from utils.security import decode_access_token
from typing import Optional
from fastapi import Depends, HTTPException, status, Header
from typing import Optional
from utils.security import decode_access_token


def get_current_user(
    authorization: str = Header(...),  # Reads the "Authorization" header
    session: Session = Depends(get_session)
) -> User:
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format"
        )

    token = authorization.split(" ")[1]
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id: Optional[str] = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = session.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user