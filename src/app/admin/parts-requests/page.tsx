'use client'

import React, { useState, useEffect } from "react"
import { HiTrash } from 'react-icons/hi'

export default function PartsRequestsPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/parts-requests')
      const data = await res.json()
      setRequests(data.requests ?? [])
    } catch { console.error('Failed to fetch') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/parts-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch { console.error('Failed to update') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this request?')) return
    try {
      const res = await fetch(`/api/parts-requests/${id}`, { method: 'DELETE' })
      if (res.ok) setRequests((prev) => prev.filter((r) => r.id !== id))
    } catch { console.error('Failed to delete') }
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Parts Requests</h1>

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : requests.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No parts requests found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Phone</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Part Info</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r, i) => (
                  <React.Fragment key={r.id}>
                    <tr
                      style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', color: '#ccc', cursor: 'pointer' }}
                      onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                    >
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600 }}>
                        {r.firstName} {r.lastName}
                      </td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{r.email}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{r.phone}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{r.partInfo || '—'}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }} onClick={(e) => e.stopPropagation()}>
                        <select
                          value={r.status}
                          onChange={(e) => updateStatus(r.id, e.target.value)}
                          style={{
                            background: '#0A0E1B', color: '#fff', border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer',
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.04)' }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleDelete(r.id)} style={{ padding: '6px 10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          <HiTrash />
                        </button>
                      </td>
                    </tr>
                    {expandedId === r.id && (
                      <tr key={`exp-${r.id}`}>
                        <td colSpan={7} style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ color: '#aaa', fontSize: '13px', marginBottom: '4px' }}>Part Info:</div>
                          <div style={{ color: '#fff', fontSize: '14px', marginBottom: '10px' }}>{r.partInfo || 'Not provided'}</div>
                          <div style={{ color: '#aaa', fontSize: '13px', marginBottom: '4px' }}>Message:</div>
                          <div style={{ color: '#fff', fontSize: '14px', whiteSpace: 'pre-wrap' }}>{r.message || 'No message'}</div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
