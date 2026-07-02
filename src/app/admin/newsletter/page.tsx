'use client'

import { useState, useEffect } from 'react'
import { HiTrash, HiDownload } from 'react-icons/hi'

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter')
      const data = await res.json()
      setSubscribers(data.subscribers ?? [])
    } catch { console.error('Failed to fetch') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this subscriber?')) return
    try {
      const res = await fetch(`/api/newsletter/${id}`, { method: 'DELETE' })
      if (res.ok) setSubscribers((prev) => prev.filter((s) => s.id !== id))
    } catch { console.error('Failed to delete') }
  }

  const exportCSV = () => {
    const headers = ['Email', 'Name', 'Subscribed Date', 'Status']
    const rows = subscribers.map((s) => [
      s.email,
      s.name || '',
      new Date(s.createdAt).toLocaleDateString(),
      s.active ? 'Active' : 'Inactive',
    ])
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'newsletter-subscribers.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Newsletter Subscribers</h1>
        <button
          onClick={exportCSV}
          disabled={subscribers.length === 0}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            background: subscribers.length === 0 ? '#444' : '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: subscribers.length === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 700,
            fontSize: '14px',
          }}
        >
          <HiDownload /> Export CSV
        </button>
      </div>

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : subscribers.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No subscribers yet.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Subscribed Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s, i) => (
                  <tr key={s.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', color: '#ccc' }}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600 }}>{s.email}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{s.name || '—'}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: s.active ? '#22c55e' : '#888', fontWeight: 600, fontSize: '12px' }}>
                        {s.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <button onClick={() => handleDelete(s.id)} style={{ padding: '6px 10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        <HiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
