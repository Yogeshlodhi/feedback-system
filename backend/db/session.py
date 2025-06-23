from sqlmodel import Session, SQLModel, create_engine
from settings import settings

engine = create_engine(settings.database_url, echo=True)

def get_session():
    with Session(engine) as session:
        yield session