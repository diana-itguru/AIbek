from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .. import models
from ..database import get_db

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class LoginData(BaseModel):
    username: str
    password: str

@router.post("/login/")
def login_user(data: LoginData, db: Session = Depends(get_db)):
    user=db.query(models.User).filter(models.User.username == data.username).first()
    if not user or not pwd_context.verify(data.password, user.password):
        raise HTTPException(status_code=400, detail="Неверное имя пользователя или пароль")

    return {"message":"Успешный вход", "user_id":user.id}