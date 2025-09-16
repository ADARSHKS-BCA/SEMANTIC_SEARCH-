import React, { useState } from 'react'

export default function AddDocument() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text || !text.trim()) {
      setMessage('Please enter text before submitting')
      return
    }
    setSaving(true)
    setMessage('Saving...')
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const res = await fetch(`${API}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      let data = null
      try { data = await res.json() } catch {}

      if (!res.ok) {
        const serverMsg = data?.detail || data?.error || res.statusText
        throw new Error(serverMsg || `Server returned ${res.status}`)
      }

      setMessage(`Saved! id: ${data?.document_id || 'unknown'}`)
      setText('')
    } catch (err) {
      console.error('AddDocument error:', err)
      setMessage('Error: ' + (err.message || String(err)))
    }
    setSaving(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', borderRadius: '12px', backgroundColor: '#F3F4F6', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ marginBottom: '10px', color: '#1F2937' }}>Add Document</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', resize: 'none' }}
          placeholder="Type text here..."
        />
        <div style={{ marginTop: 12 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: '0.3s'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#1D4ED8')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#2563EB')}
          >
            {saving ? 'Saving...' : 'Add Document'}
          </button>
        </div>
      </form>
      <p style={{ marginTop: '10px', color: saving ? '#6B7280' : '#10B981' }}>{message}</p>
    </div>
  )
}
