'use client'

import { useState, useEffect } from 'react'
import { HiSave } from 'react-icons/hi'

export default function ContentPage() {
  const [snippets, setSnippets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<number | null>(null)
  const [messages, setMessages] = useState<Record<number, string>>({})

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content')
      const data = await res.json()
      setSnippets(data.snippets ?? [])
    } catch {
      console.error('Failed to fetch content')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchContent() }, [])

  const handleChange = (id: number, field: string, value: string) => {
    setSnippets((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleSave = async (snippet: any) => {
    setSavingId(snippet.id)
    setMessages((prev) => ({ ...prev, [snippet.id]: '' }))
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: snippet.key, title: snippet.title, content: snippet.content }),
      })
      if (res.ok) {
        setMessages((prev) => ({ ...prev, [snippet.id]: 'Saved!' }))
        setTimeout(() => setMessages((prev) => ({ ...prev, [snippet.id]: '' })), 2000)
      } else {
        setMessages((prev) => ({ ...prev, [snippet.id]: 'Error saving' }))
      }
    } catch {
      setMessages((prev) => ({ ...prev, [snippet.id]: 'Error saving' }))
    } finally {
      setSavingId(null)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    background: '#0A0E1B',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Content Snippets</h1>

      {snippets.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#888', background: '#1a1f35', borderRadius: '10px' }}>
          No content snippets found.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              style={{
                background: '#1a1f35',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '20px',
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#888', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Key</label>
                <input value={snippet.key} readOnly style={{ ...inputStyle, color: '#666', cursor: 'not-allowed', opacity: 0.7 }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Title</label>
                <input value={snippet.title || ''} onChange={(e) => handleChange(snippet.id, 'title', e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Content</label>
                <textarea
                  value={snippet.content}
                  onChange={(e) => handleChange(snippet.id, 'content', e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '13px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                {messages[snippet.id] && (
                  <span style={{ color: messages[snippet.id] === 'Saved!' ? '#22c55e' : '#EB2E25', fontSize: '13px', fontWeight: 600 }}>
                    {messages[snippet.id]}
                  </span>
                )}
                <button
                  onClick={() => handleSave(snippet)}
                  disabled={savingId === snippet.id}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 20px',
                    background: savingId === snippet.id ? '#666' : '#f8941e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: savingId === snippet.id ? 'not-allowed' : 'pointer',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                >
                  <HiSave /> {savingId === snippet.id ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
