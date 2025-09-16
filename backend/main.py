from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uuid
from typing import List
import chromadb
from sentence_transformers import SentenceTransformer
from fastapi.middleware.cors import CORSMiddleware

# Initialize app first
app = FastAPI()

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database and model
client = chromadb.Client()
collection = client.get_or_create_collection(name="documents")
model = SentenceTransformer('all-MiniLM-L6-v2')

# Pydantic model for request body
class Document(BaseModel):
    text: str

class SearchResult(BaseModel):
    text: str
    score: float

@app.get("/")
def root():
    return {"message": "Semantic Search API is running!"}

@app.post("/documents")
def add_document(doc: Document):
    vector = model.encode(doc.text).tolist()
    doc_id = str(uuid.uuid4())
    collection.add(
        documents=[doc.text],
        ids=[doc_id],
        embeddings=[vector]
    )
    return {"status": "success", "document_id": doc_id}

@app.get("/search", response_model=List[SearchResult])
def search(query: str):
    query_vector = model.encode(query).tolist()
    results = collection.query(
        query_embeddings=[query_vector],
        n_results=1
    )
    if not results['ids'][0]:
        raise HTTPException(status_code=404, detail="No documents found.")
    return [{
        "text": results['documents'][0][0],
        "score": results['distances'][0][0]
    }]
