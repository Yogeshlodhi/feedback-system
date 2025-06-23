from sqlmodel import SQLModel, Field, UniqueConstraint
from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

class Team(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    manager_id: UUID = Field(foreign_key="user.id", nullable=False)
    member_id: UUID = Field(foreign_key="user.id", nullable=False)

    __table_args__ = (
        UniqueConstraint("member_id", name="uq_team_member"),
    )
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)