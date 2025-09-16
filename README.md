# Semantic Search API Project

A full-stack application that provides semantic search capabilities using FastAPI backend and React frontend.

## Features

- **Backend (FastAPI)**: 
  - Document storage with vector embeddings using ChromaDB
  - Semantic search using sentence transformers
  - RESTful API endpoints for document management and search

- **Frontend (React)**:
  - Clean, modern UI for adding documents
  - Real-time semantic search functionality
  - Responsive design with hover effects

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **ChromaDB** - Vector database for embeddings
- **Sentence Transformers** - For generating text embeddings
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
Api_project/
├── backend/
│   ├── app/
│   │   ├── db.py
│   │   ├── embeddings.py
│   │   ├── requirements.txt
│   │   └── schemas.py
│   └── main.py
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AddDocument.jsx
    │   │   └── Search.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    ├── package.json
    └── vite.config.js
```

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r app/requirements.txt
   ```

4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Endpoints

- `GET /` - Health check
- `POST /documents` - Add a new document
- `GET /search?query={query}` - Search documents semantically

## Usage

1. Start both backend and frontend servers
2. Open the frontend in your browser
3. Add documents using the "Add Document" section
4. Search for documents using the "Search Documents" section
5. View results with similarity scores

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
