from sqlmodel import create_engine, Session, SQLModel
from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL, 
    echo=True, 
    connect_args={"check_same_thread": False} # only needed for sqlite
)

def init_db():
    from app.models.domain import Project, Document, Finding
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
