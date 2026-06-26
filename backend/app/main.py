from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db import init_db
from app.api.routes import projects, documents, pipeline

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB on startup
    init_db()
    yield
    # Cleanup on shutdown

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In prod, restrict this to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(projects.router, prefix=f"{settings.API_V1_STR}/projects", tags=["projects"])
app.include_router(documents.router, prefix=f"{settings.API_V1_STR}", tags=["documents"])
app.include_router(pipeline.router, prefix=f"{settings.API_V1_STR}/pipeline", tags=["pipeline"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "DueZero Backend API is running"}
