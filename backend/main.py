from fastapi import FastAPI
from db.session import engine
from sqlmodel import SQLModel
from router import api_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Feedback System",
    description="A simple feedback system API",
    version="1.0.0",
)

origins = [
    "http://localhost:5173",
    "https://myfrontend.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    

app.include_router(
    api_router,
    prefix="/api",
)

@app.get("/")
def root():
    return {"message": "FastAPI backend is running"}
