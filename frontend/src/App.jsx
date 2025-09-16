import { useState } from "react";
import axios from "axios";

function App() {
  const [docText, setDocText] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const addDocument = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/documents", {
        text: docText,
      });
      alert("Document added! ID: " + response.data.document_id);
      setDocText("");
    } catch (error) {
      console.error(error);
      alert("Error adding document");
    }
  };

  const searchDocuments = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/search", {
        params: { query },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
      alert("Error searching documents");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4B5563", marginBottom: "30px" }}>Semantic Search App</h1>

      {/* Add Document */}
      <div style={{ marginBottom: "40px", padding: "20px", borderRadius: "12px", backgroundColor: "#F3F4F6", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        <h2 style={{ color: "#1F2937", marginBottom: "10px" }}>Add Document</h2>
        <textarea
          value={docText}
          onChange={(e) => setDocText(e.target.value)}
          placeholder="Enter text to store"
          rows="5"
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #D1D5DB", resize: "none" }}
        />
        <br />
        <button
          onClick={addDocument}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1D4ED8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
        >
          Add Document
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "40px", padding: "20px", borderRadius: "12px", backgroundColor: "#F3F4F6", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        <h2 style={{ color: "#1F2937", marginBottom: "10px" }}>Search Documents</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #D1D5DB" }}
        />
        <br />
        <button
          onClick={searchDocuments}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#10B981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#10B981")}
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div style={{ padding: "20px", borderRadius: "12px", backgroundColor: "#F9FAFB", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        <h2 style={{ color: "#1F2937", marginBottom: "10px" }}>Results</h2>
        {searchResults.length === 0 ? (
          <p style={{ color: "#6B7280" }}>No results yet</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {searchResults.map((result, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <div><b>Text:</b> {result.text}</div>
                <div><b>Score:</b> {result.score.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
