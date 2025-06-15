from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models
from .database import get_db, engine
from .db_utils import wait_for_db
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth
from .routers import login
from .routers import chat

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)  # Включаем режим отладки

app = FastAPI()

app.include_router(auth.router)
app.include_router(login.router)
app.include_router(chat.router)
@app.get("/")
def read_root():
    return {"message": "Привет, мир!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # можно ["*"] для dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if not wait_for_db():
    raise Exception("Не удалось подключиться к PostgreSQL")

models.Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Привет, мир!"}

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

app.include_router(auth.router)
