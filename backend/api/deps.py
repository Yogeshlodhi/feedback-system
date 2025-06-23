# app/api/deps.py

from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from db.session import get_session
from models.user import User
from utils.security import decode_access_token
from typing import Optional

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session)
) -> User:
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
