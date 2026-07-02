'use client'

import { useState, useEffect } from 'react'
import { HiPlus, HiPencil, HiTrash, HiChevronUp, HiChevronDown, HiX } from 'react-icons/hi'

export default function StaffPage() {
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', title: '', bio: '', imageUrl: '', email: '', phone: '', sortOrder: 0, active: true })

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/staff')
      const data = await res.json()
      setStaff(data.staff ?? [])
    } catch { console.error('Failed to fetch') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const resetForm = () => {
    setForm({ name: '', title: '', bio: '', imageUrl: '', email: '', phone: '', sortOrder: 0, active: true })
    setEditingId(null)
    setShowForm(false)
  }

  const openEdit = (m: any) => {
    setForm({
      name: m.name || '', title: m.title || '', bio: m.bio || '',
      imageUrl: m.imageUrl || '', email: m.email || '', phone: m.phone || '',
      sortOrder: m.sortOrder || 0, active: m.active,
    })
    setEditingId(m.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let res
      if (editingId) {
        res = await fetch(`/api/staff/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else {
        res = await fetch('/api/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      if (res.ok) { resetForm(); fetchData() }
    } catch { console.error('Failed to save') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this staff member?')) return
    try {
      const res = await fetch(`/api/staff/${id}`, { method: 'DELETE' })
      if (res.ok) setStaff((prev) => prev.filter((m) => m.id !== id))
    } catch { console.error('Failed to delete') }
  }

  const moveMember = async (id: number, direction: 'up' | 'down') => {
    const idx = staff.findIndex((m) => m.id === id)
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === staff.length - 1) return
    const newList = [...staff]
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    const tempOrder = newList[idx].sortOrder
    newList[idx].sortOrder = newList[swapIdx].sortOrder
    newList[swapIdx].sortOrder = tempOrder
    try {
      await Promise.all([
        fetch(`/api/staff/${newList[idx].id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: newList[idx].sortOrder }),
        }),
        fetch(`/api/staff/${newList[swapIdx].id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: newList[swapIdx].sortOrder }),
        }),
      ])
      fetchData()
    } catch { console.error('Failed to reorder') }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#0A0E1B',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px',
    color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Staff</h1>
        <button onClick={() => { resetForm(); setShowForm(true) }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#f8941e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
          <HiPlus /> Add Staff
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>{editingId ? 'Edit Staff' : 'Add New Staff'}</h3>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}><HiX /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Image URL</label>
                <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ccc', fontSize: '13px', fontWeight: 600, marginTop: '24px' }}>
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} style={{ accentColor: '#f8941e' }} />
                  Active
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={resetForm} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#ccc', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
              <button type="submit" style={{ padding: '8px 20px', background: '#f8941e', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
                {editingId ? 'Update' : 'Add'} Staff
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : staff.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No staff members found.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', padding: '20px' }}>
            {staff.map((m, i) => (
              <div
                key={m.id}
                style={{
                  background: '#0A0E1B',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '20px',
                  textAlign: 'center',
                  opacity: m.active ? 1 : 0.5,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '12px' }}>
                  <button onClick={() => moveMember(m.id, 'up')} disabled={i === 0} style={{ padding: '2px 6px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '3px', color: i === 0 ? '#444' : '#fff', cursor: i === 0 ? 'not-allowed' : 'pointer', fontSize: '12px' }}>
                    <HiChevronUp />
                  </button>
                  <button onClick={() => moveMember(m.id, 'down')} disabled={i === staff.length - 1} style={{ padding: '2px 6px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '3px', color: i === staff.length - 1 ? '#444' : '#fff', cursor: i === staff.length - 1 ? 'not-allowed' : 'pointer', fontSize: '12px' }}>
                    <HiChevronDown />
                  </button>
                </div>
                <div
                  style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    margin: '0 auto 12px', overflow: 'hidden', background: '#1a1f35',
                  }}
                >
                  {m.imageUrl ? (
                    <img src={m.imageUrl} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '28px', fontWeight: 700 }}>
                      {m.name?.charAt(0) || '?'}
                    </div>
                  )}
                </div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>{m.name}</div>
                <div style={{ color: '#888', fontSize: '13px', marginBottom: '12px' }}>{m.title || '—'}</div>
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                  <button onClick={() => openEdit(m)} style={{ padding: '6px 12px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    <HiPencil style={{ marginRight: '4px' }} /> Edit
                  </button>
                  <button onClick={() => handleDelete(m.id)} style={{ padding: '6px 12px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    <HiTrash style={{ marginRight: '4px' }} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
