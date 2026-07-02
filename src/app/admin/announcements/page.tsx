'use client'

import { useState, useEffect } from 'react'
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: '', content: '', active: true, startDate: '', endDate: '' })

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/announcements')
      const data = await res.json()
      setAnnouncements(data.announcements ?? [])
    } catch { console.error('Failed to fetch') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const resetForm = () => {
    setForm({ title: '', content: '', active: true, startDate: '', endDate: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const openEdit = (a: any) => {
    setForm({
      title: a.title || '',
      content: a.content || '',
      active: a.active,
      startDate: a.startDate ? a.startDate.slice(0, 10) : '',
      endDate: a.endDate ? a.endDate.slice(0, 10) : '',
    })
    setEditingId(a.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const body: any = { ...form }
      if (body.startDate) body.startDate = new Date(body.startDate).toISOString()
      else body.startDate = null
      if (body.endDate) body.endDate = new Date(body.endDate).toISOString()
      else body.endDate = null

      let res
      if (editingId) {
        res = await fetch(`/api/announcements/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } else {
        res = await fetch('/api/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      }
      if (res.ok) { resetForm(); fetchData() }
    } catch { console.error('Failed to save') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this announcement?')) return
    try {
      const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' })
      if (res.ok) setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    } catch { console.error('Failed to delete') }
  }

  const toggleActive = async (a: any) => {
    try {
      const res = await fetch(`/api/announcements/${a.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !a.active }),
      })
      if (res.ok) setAnnouncements((prev) => prev.map((x) => (x.id === a.id ? { ...x, active: !x.active } : x)))
    } catch { console.error('Failed to toggle') }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#0A0E1B',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px',
    color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Announcements</h1>
        <button onClick={() => { resetForm(); setShowForm(true) }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#f8941e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
          <HiPlus /> Add Announcement
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>{editingId ? 'Edit Announcement' : 'Add New Announcement'}</h3>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}><HiX /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Content *</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Start Date</label>
                <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>End Date</label>
                <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ccc', fontSize: '13px', fontWeight: 600 }}>
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} style={{ accentColor: '#f8941e' }} />
                Active
              </label>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={resetForm} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#ccc', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
              <button type="submit" style={{ padding: '8px 20px', background: '#f8941e', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
                {editingId ? 'Update' : 'Add'} Announcement
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888', background: '#1a1f35', borderRadius: '10px' }}>Loading...</div>
        ) : announcements.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888', background: '#1a1f35', borderRadius: '10px' }}>No announcements yet.</div>
        ) : (
          announcements.map((a) => (
            <div key={a.id} style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', opacity: a.active ? 1 : 0.5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: '#fff' }}>{a.title}</h3>
                  <div style={{ color: '#888', fontSize: '12px' }}>
                    {a.startDate && <span>From {new Date(a.startDate).toLocaleDateString()} </span>}
                    {a.endDate && <span>to {new Date(a.endDate).toLocaleDateString()}</span>}
                    {!a.startDate && !a.endDate && <span>No date range</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button onClick={() => toggleActive(a)} style={{ padding: '6px 12px', background: a.active ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)', color: a.active ? '#22c55e' : '#888', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    {a.active ? 'Active' : 'Inactive'}
                  </button>
                  <button onClick={() => openEdit(a)} style={{ padding: '6px 10px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><HiPencil /></button>
                  <button onClick={() => handleDelete(a.id)} style={{ padding: '6px 10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><HiTrash /></button>
                </div>
              </div>
              <div style={{ color: '#aaa', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{a.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
