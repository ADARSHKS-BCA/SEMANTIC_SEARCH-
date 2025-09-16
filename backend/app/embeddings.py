# embeddings.py
"""embeddings.py
Lazy-loads a SentenceTransformer model and returns embeddings as lists.
"""
from typing import Optional

MODEL_NAME = "all-MiniLM-L6-v2"
_model = None

def _ensure_model():
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
        except Exception as e:
            # re-raise with clearer message
            raise RuntimeError("sentence-transformers is required but not installed: " + str(e))
        _model = SentenceTransformer(MODEL_NAME)

def get_embedding(text: str) -> list:
    """Return a Python list[float] embedding for the given text.

    The model is loaded on first use so server import doesn't block.
    """
    _ensure_model()
    vec = _model.encode(text, normalize_embeddings=True)
    return vec.tolist()
