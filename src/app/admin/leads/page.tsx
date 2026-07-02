'use client'

import React, { useState, useEffect } from 'react'
import { HiTrash, HiChevronDown, HiChevronUp } from 'react-icons/hi'

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      setLeads(data.leads ?? [])
    } catch {
      console.error('Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLeads() }, [])

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
      }
    } catch {
      console.error('Failed to update status')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this lead?')) return
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' })
      if (res.ok) setLeads((prev) => prev.filter((l) => l.id !== id))
    } catch {
      console.error('Failed to delete')
    }
  }

  const filtered = filterType === 'all' ? leads : leads.filter((l) => l.type === filterType)

  const typeBadge = (type: string) => {
    const colors: Record<string, string> = { quote: '#f8941e', viewing: '#3b82f6', contact: '#22c55e' }
    return (
      <span style={{ background: `${colors[type] || '#666'}20`, color: colors[type] || '#666', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
        {type}
      </span>
    )
  }

  const statusBadge = (status: string) => (
    <span
      style={{
        color: status === 'new' ? '#f8941e' : status === 'read' ? '#3b82f6' : '#22c55e',
        fontWeight: 600,
        fontSize: '12px',
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  )

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Leads</h1>

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ color: '#888', fontSize: '13px' }}>Filter by type:</span>
          {['all', 'quote', 'viewing', 'contact'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                padding: '6px 14px',
                background: filterType === t ? '#f8941e' : '#0A0E1B',
                color: '#fff',
                border: filterType === t ? 'none' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: filterType === t ? 700 : 400,
                textTransform: 'capitalize',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No leads found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Type</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Phone</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <React.Fragment key={`lead-${lead.id}`}>
                    <tr
                      style={{
                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                        color: '#ccc',
                        cursor: 'pointer',
                      }}
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                    >
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{typeBadge(lead.type)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600 }}>
                        {lead.firstName} {lead.lastName}
                      </td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{lead.email || '—'}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{lead.phone || '—'}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{statusBadge(lead.status)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }} onClick={(e) => e.stopPropagation()}>
                          {lead.status === 'new' && (
                            <button onClick={() => updateStatus(lead.id, 'read')} style={{ padding: '6px 10px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>Mark Read</button>
                          )}
                          {lead.status !== 'resolved' && (
                            <button onClick={() => updateStatus(lead.id, 'resolved')} style={{ padding: '6px 10px', background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>Resolve</button>
                          )}
                          <button onClick={() => handleDelete(lead.id)} style={{ padding: '6px 10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                            <HiTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === lead.id && (
                      <tr key={`exp-${lead.id}`}>
                        <td colSpan={7} style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ color: '#aaa', fontSize: '13px', marginBottom: '4px' }}>Message:</div>
                          <div style={{ color: '#fff', fontSize: '14px', whiteSpace: 'pre-wrap' }}>{lead.message || 'No message'}</div>
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
