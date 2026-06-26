from typing import Optional, List, Dict
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone
import json

class ProjectBase(SQLModel):
    name: str
    description: Optional[str] = None
    status: str = "active" # active, completed, archived

class Project(ProjectBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    documents: List["Document"] = Relationship(back_populates="project")

class DocumentBase(SQLModel):
    filename: str
    s3_key: Optional[str] = None
    status: str = "uploaded" # uploaded, processing, parsed, classified, verified, completed
    document_type: Optional[str] = None # e.g. Corporate, Employment
    project_id: int = Field(foreign_key="project.id")

class Document(DocumentBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    uploaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    project: Optional[Project] = Relationship(back_populates="documents")
    findings: List["Finding"] = Relationship(back_populates="document")

class FindingBase(SQLModel):
    document_id: int = Field(foreign_key="document.id")
    clause_type: str # e.g., Termination, Change of Control
    risk_level: str # Critical, Major, Moderate, Low
    summary: str
    evidence_text: str
    page_number: Optional[int] = None

class Finding(FindingBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    document: Optional[Document] = Relationship(back_populates="findings")

# Pydantic schemas for API responses
class ProjectRead(ProjectBase):
    id: int
    created_at: datetime

class DocumentRead(DocumentBase):
    id: int
    uploaded_at: datetime

class FindingRead(FindingBase):
    id: int

class ProjectWithDocuments(ProjectRead):
    documents: List[DocumentRead] = []
