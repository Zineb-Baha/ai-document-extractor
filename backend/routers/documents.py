from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import uuid

router = APIRouter(
    prefix="/api/documents",
    tags=["Documents"]
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/png"
}


@router.get("/")
def get_documents():
    return {
        "documents": []
    }


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, JPG and PNG files are allowed"
        )

    document_id = str(uuid.uuid4())

    extension = Path(file.filename).suffix
    file_path = UPLOAD_DIR / f"{document_id}{extension}"

    content = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(content)

    return {
        "id": document_id,
        "fileName": file.filename,
        "contentType": file.content_type,
        "message": "Document uploaded successfully"
    }