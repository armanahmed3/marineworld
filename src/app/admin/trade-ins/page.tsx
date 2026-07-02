'use client'

import React, { useState, useEffect } from "react"
import { HiTrash } from 'react-icons/hi'

export default function TradeInsPage() {
  const [tradeIns, setTradeIns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/trade-ins')
      const data = await res.json()
      setTradeIns(data.tradeIns ?? [])
    } catch { console.error('Failed to fetch') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/trade-ins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) setTradeIns((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    } catch { console.error('Failed to update') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this trade-in submission?')) return
    try {
      const res = await fetch(`/api/trade-ins/${id}`, { method: 'DELETE' })
      if (res.ok) setTradeIns((prev) => prev.filter((t) => t.id !== id))
    } catch { console.error('Failed to delete') }
  }

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = { pending: '#f8941e', reviewing: '#3b82f6', accepted: '#22c55e', declined: '#EB2E25' }
    return (
      <span style={{ background: `${colors[status] || '#666'}20`, color: colors[status] || '#666', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' }}>
        {status}
      </span>
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Trade-In Submissions</h1>

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : tradeIns.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No trade-in submissions found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Phone</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Vehicle</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tradeIns.map((t, i) => (
                  <React.Fragment key={t.id}>
                    <tr
                      style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', color: '#ccc', cursor: 'pointer' }}
                      onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                    >
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600 }}>
                        {t.firstName} {t.lastName}
                      </td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{t.email}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{t.phone}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        {[t.year, t.make, t.model].filter(Boolean).join(' ') || '—'}
                      </td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }} onClick={(e) => e.stopPropagation()}>
                        <select
                          value={t.status}
                          onChange={(e) => updateStatus(t.id, e.target.value)}
                          style={{
                            background: '#0A0E1B', color: '#fff', border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer',
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="accepted">Accepted</option>
                          <option value="declined">Declined</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.04)' }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleDelete(t.id)} style={{ padding: '6px 10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          <HiTrash />
                        </button>
                      </td>
                    </tr>
                    {expandedId === t.id && (
                      <tr key={`exp-${t.id}`}>
                        <td colSpan={7} style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>VIN</div>
                              <div style={{ color: '#fff' }}>{t.vin || '—'}</div>
                            </div>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>Mileage</div>
                              <div style={{ color: '#fff' }}>{t.mileage ? `${t.mileage.toLocaleString()} mi` : '—'}</div>
                            </div>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>Condition</div>
                              <div style={{ color: '#fff' }}>{t.condition || '—'}</div>
                            </div>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>Notes</div>
                              <div style={{ color: '#fff', whiteSpace: 'pre-wrap' }}>{t.notes || '—'}</div>
                            </div>
                          </div>
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
