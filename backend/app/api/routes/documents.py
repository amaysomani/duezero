from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlmodel import Session, select
from app.db import get_session
from app.models.domain import Document, DocumentRead, Project
from typing import List

router = APIRouter()

@router.post("/project/{project_id}/documents", response_model=DocumentRead)
async def upload_document(
    project_id: int, 
    file: UploadFile = File(...), 
    session: Session = Depends(get_session)
):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    # In a real app, upload `file` to AWS S3 here and get the s3_key
    s3_key = f"s3://duezero-docs/{project_id}/{file.filename}"
    
    db_doc = Document(
        filename=file.filename,
        s3_key=s3_key,
        project_id=project_id,
        status="uploaded"
    )
    session.add(db_doc)
    session.commit()
    session.refresh(db_doc)
    
    return db_doc

@router.get("/project/{project_id}/documents", response_model=List[DocumentRead])
def list_documents(project_id: int, session: Session = Depends(get_session)):
    docs = session.exec(select(Document).where(Document.project_id == project_id)).all()
    return docs

@router.get("/documents/{document_id}")
def get_document_details(document_id: int, session: Session = Depends(get_session)):
    doc = session.get(Document, document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    return {
        "document": doc,
        "findings": doc.findings
    }
