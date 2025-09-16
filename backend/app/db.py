# db.py
import os

# Try to use chromadb if available; otherwise provide a lightweight in-memory
# fallback collection so the API can be tested without installing chromadb.
try:
    import chromadb
    from chromadb.config import Settings

    PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db")
    client = chromadb.Client(Settings(
        chroma_db_impl="duckdb+parquet",
        persist_directory=PERSIST_DIR
    ))

    COLLECTION_NAME = "documents"

    def get_collection():
        if COLLECTION_NAME in [c.name for c in client.list_collections()]:
            return client.get_collection(COLLECTION_NAME)
        return client.create_collection(name=COLLECTION_NAME)

except Exception:
    # Minimal in-memory fallback implementation
    COLLECTION_NAME = "documents"

    class InMemoryCollection:
        def __init__(self, name):
            self.name = name
            self._docs = []
            self._embeddings = []
            self._metadatas = []
            self._ids = []

        def add(self, documents, embeddings, ids=None, metadatas=None):
            for i, doc in enumerate(documents):
                emb = embeddings[i]
                self._docs.append(doc)
                self._embeddings.append(emb)
                self._ids.append(ids[i] if ids else str(len(self._ids)))
                self._metadatas.append(metadatas[i] if metadatas else {})

        def persist(self):
            # no-op for in-memory
            return

        def query(self, query_embeddings, n_results=5, include=None):
            # return a dict with lists as chromadb would: distances, metadatas, documents, ids
            q = query_embeddings[0]
            # assume embeddings are lists of floats and normalized if the model normalized them
            def dot(a, b):
                return sum(x * y for x, y in zip(a, b))

            scores = []
            for emb in self._embeddings:
                try:
                    sim = dot(q, emb)
                except Exception:
                    sim = 0.0
                # convert similarity to a distance-like number (1 - sim)
                dist = 1.0 - sim
                scores.append(dist)

            # get top n_results by smallest distance
            idxs = sorted(range(len(scores)), key=lambda i: scores[i])[:n_results]
            distances = [scores[i] for i in idxs]
            metadatas = [self._metadatas[i] for i in idxs]
            documents = [self._docs[i] for i in idxs]
            ids = [self._ids[i] for i in idxs]

            return {
                'distances': [distances],
                'metadatas': [metadatas],
                'documents': [documents],
                'ids': [ids]
            }

    class InMemoryClient:
        def __init__(self):
            self._collections = {}

        def list_collections(self):
            return [type('C', (), {'name': name}) for name in self._collections.keys()]

        def get_collection(self, name):
            return self._collections.get(name)

        def create_collection(self, name):
            col = InMemoryCollection(name)
            self._collections[name] = col
            return col

    client = InMemoryClient()

    def get_collection():
        if COLLECTION_NAME in [c.name for c in client.list_collections()]:
            return client.get_collection(COLLECTION_NAME)
        return client.create_collection(name=COLLECTION_NAME)
