from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# URL подключения к PostgreSQL
SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:postgres@db:5432/mydatabase"

# Создание движка SQLAlchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Фабрика сессий
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей
Base = declarative_base()

# Генератор сессий для зависимостей FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()