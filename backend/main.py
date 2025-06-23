from fastapi import FastAPI
from db.session import engine
from sqlmodel import SQLModel
from router import api_router

app = FastAPI(
    title="Feedback System",
    description="A simple feedback system API",
    version="1.0.0",
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    

app.include_router(
    api_router,
    prefix="/api",
)