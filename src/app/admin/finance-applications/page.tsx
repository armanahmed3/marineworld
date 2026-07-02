'use client'

import React, { useState, useEffect } from "react"
import { HiTrash } from 'react-icons/hi'

export default function FinanceApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/finance-applications')
      const data = await res.json()
      setApplications(data.applications ?? [])
    } catch { console.error('Failed to fetch') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/finance-applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
    } catch { console.error('Failed to update') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this application?')) return
    try {
      const res = await fetch(`/api/finance-applications/${id}`, { method: 'DELETE' })
      if (res.ok) setApplications((prev) => prev.filter((a) => a.id !== id))
    } catch { console.error('Failed to delete') }
  }

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = { pending: '#f8941e', approved: '#22c55e', denied: '#EB2E25', reviewing: '#3b82f6' }
    return (
      <span style={{ background: `${colors[status] || '#666'}20`, color: colors[status] || '#666', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' }}>
        {status}
      </span>
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Finance Applications</h1>

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : applications.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No finance applications found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Phone</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Amount</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a, i) => (
                  <React.Fragment key={a.id}>
                    <tr
                      style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', color: '#ccc', cursor: 'pointer' }}
                      onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
                    >
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600 }}>
                        {a.firstName} {a.lastName}
                      </td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{a.email}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{a.phone}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        {a.desiredAmount ? `$${a.desiredAmount.toLocaleString()}` : '—'}
                      </td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{new Date(a.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }} onClick={(e) => e.stopPropagation()}>
                        <select
                          value={a.status}
                          onChange={(e) => updateStatus(a.id, e.target.value)}
                          style={{
                            background: '#0A0E1B', color: '#fff', border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer',
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="approved">Approved</option>
                          <option value="denied">Denied</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.04)' }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleDelete(a.id)} style={{ padding: '6px 10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          <HiTrash />
                        </button>
                      </td>
                    </tr>
                    {expandedId === a.id && (
                      <tr key={`exp-${a.id}`}>
                        <td colSpan={7} style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>Address</div>
                              <div style={{ color: '#fff' }}>{a.address || '—'}</div>
                            </div>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>City, State, ZIP</div>
                              <div style={{ color: '#fff' }}>{[a.city, a.state, a.zip].filter(Boolean).join(', ') || '—'}</div>
                            </div>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>Employment Info</div>
                              <div style={{ color: '#fff' }}>{a.employmentInfo || '—'}</div>
                            </div>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>Annual Income</div>
                              <div style={{ color: '#fff' }}>{a.annualIncome ? `$${a.annualIncome.toLocaleString()}` : '—'}</div>
                            </div>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>Credit Score</div>
                              <div style={{ color: '#fff' }}>{a.creditScore || '—'}</div>
                            </div>
                            <div>
                              <div style={{ color: '#888', marginBottom: '2px' }}>Desired Amount</div>
                              <div style={{ color: '#fff' }}>{a.desiredAmount ? `$${a.desiredAmount.toLocaleString()}` : '—'}</div>
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
