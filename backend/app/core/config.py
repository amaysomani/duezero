from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "DueZero API"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "sqlite:///./duezero.db"
    
    # Redis / Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"
    
    # LLM Settings (Mocked for now if empty)
    OPENAI_API_KEY: Optional[str] = None
    
    class Config:
        env_file = ".env"

settings = Settings()
