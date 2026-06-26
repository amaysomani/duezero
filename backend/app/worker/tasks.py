import time
import random
from app.worker.celery_app import celery_app
from app.db import engine
from sqlmodel import Session
from app.models.domain import Document, Finding

@celery_app.task(bind=True)
def run_pipeline(self, document_id: int):
    """
    Orchestrates the 9-step evidence-first AI pipeline.
    Currently mocked with delays to simulate LLM/OCR processing.
    """
    
    with Session(engine) as session:
        doc = session.get(Document, document_id)
        if not doc:
            return {"status": "error", "message": "Document not found"}
        
        # Step 2: OCR
        self.update_state(state="PROCESSING", meta={"step": "OCR", "progress": 10})
        doc.status = "processing"
        session.commit()
        time.sleep(2)
        
        # Step 3: Classification
        self.update_state(state="PROCESSING", meta={"step": "Classification", "progress": 30})
        doc.document_type = random.choice(["Corporate", "Employment", "Commercial", "IP"])
        doc.status = "classified"
        session.commit()
        time.sleep(1.5)
        
        # Step 4: Entity Extraction
        self.update_state(state="PROCESSING", meta={"step": "Entity Extraction", "progress": 40})
        time.sleep(2)
        
        # Step 5 & 6: Clause & Risk Detection
        self.update_state(state="PROCESSING", meta={"step": "Risk Detection", "progress": 60})
        
        # Mocking finding creation
        risks = [
            ("Termination", "Critical", "Unilateral termination without cause on 30 days notice."),
            ("Change of Control", "Major", "Consent required for change of control."),
            ("Governing Law", "Low", "Delaware jurisdiction."),
        ]
        
        for r_type, r_level, r_sum in risks:
            finding = Finding(
                document_id=doc.id,
                clause_type=r_type,
                risk_level=r_level,
                summary=r_sum,
                evidence_text=f"Mock extracted text from page {random.randint(1,10)}",
                page_number=random.randint(1, 10)
            )
            session.add(finding)
        
        doc.status = "parsed"
        session.commit()
        time.sleep(2)
        
        # Step 7: Cross Document Verification
        self.update_state(state="PROCESSING", meta={"step": "Cross-doc Verification", "progress": 80})
        time.sleep(1.5)
        
        # Step 8: Missing Documents (skipping actual logic for mock)
        
        # Step 9: Report Generator
        self.update_state(state="PROCESSING", meta={"step": "Generating Report", "progress": 95})
        doc.status = "completed"
        session.commit()
        time.sleep(1)

    return {"status": "success", "document_id": document_id}
