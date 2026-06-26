from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.db import get_session
from app.models.domain import Document
from app.worker.tasks import run_pipeline

router = APIRouter()

@router.post("/trigger/{document_id}")
def trigger_pipeline(document_id: int, session: Session = Depends(get_session)):
    doc = session.get(Document, document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Trigger Celery task asynchronously
    task = run_pipeline.delay(document_id)
    
    return {"message": "Pipeline triggered", "task_id": task.id}

@router.get("/status/{task_id}")
def get_pipeline_status(task_id: str):
    from app.worker.celery_app import celery_app
    task_result = celery_app.AsyncResult(task_id)
    
    response = {
        "task_id": task_id,
        "status": task_result.status,
    }
    
    if task_result.status == "PROCESSING":
        response["meta"] = task_result.info
    elif task_result.status == "SUCCESS":
        response["result"] = task_result.result
    elif task_result.status == "FAILURE":
        response["error"] = str(task_result.info)
        
    return response
