from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.db import get_session
from app.models.domain import Project, ProjectRead, ProjectBase, ProjectWithDocuments

router = APIRouter()

@router.post("/", response_model=ProjectRead)
def create_project(project: ProjectBase, session: Session = Depends(get_session)):
    db_project = Project.model_validate(project)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project

@router.get("/", response_model=List[ProjectRead])
def read_projects(skip: int = 0, limit: int = 100, session: Session = Depends(get_session)):
    projects = session.exec(select(Project).offset(skip).limit(limit)).all()
    return projects

@router.get("/{project_id}", response_model=ProjectWithDocuments)
def read_project(project_id: int, session: Session = Depends(get_session)):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
