# schemas.py
from pydantic import BaseModel
from typing import Optional

class DocumentIn(BaseModel):
    text: str

class DocumentOut(BaseModel):
    status: str
    document_id: str

class SearchResult(BaseModel):
    text: str
    score: float
