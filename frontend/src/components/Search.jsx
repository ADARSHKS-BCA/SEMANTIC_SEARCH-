import React, { useState } from 'react'

export default function Search() {
  const [q, setQ] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    setLoading(true)
    setResults(null)
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const res = await fetch(`${API}/search?query=${encodeURIComponent(q)}&k=5`)
      const data = await res.json()
      setResults(data)
    } catch (err) {
      setResults([{ text: 'Error: ' + err.message, score: 0 }])
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', borderRadius: '12px', backgroundColor: '#F3F4F6', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ marginBottom: '10px', color: '#1F2937' }}>Search</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Enter query..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#10B981', color: 'white', cursor: 'pointer' }}>Search</button>
      </form>

      {loading && <p style={{ color: '#6B7280' }}>Searching…</p>}
      {results && (
        <div>
          <h3 style={{ color: '#1F2937', marginBottom: '10px' }}>Results</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {results.map((r) => (
              <li key={r.id || r.text} style={{ marginBottom: 12, padding: 10, borderRadius: 8, backgroundColor: '#ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                <div><strong>Score:</strong> {r.score}</div>
                <div>{r.text}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
