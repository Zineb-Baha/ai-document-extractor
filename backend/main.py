from fastapi import FastAPI
from routers.documents import router as documents_router

app = FastAPI(
    title="AI Document Extraction API",
    description="AI-powered document extraction platform",
    version="1.0.0"
)

app.include_router(documents_router)

@app.get("/api/health")
def health_check():
    return {
        "status": "UP",
        "message": "AI Document Extractor API is running"
    }