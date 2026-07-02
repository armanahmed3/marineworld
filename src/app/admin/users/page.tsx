'use client'

import { useState, useEffect } from 'react'
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ username: '', password: '', email: '', role: 'admin' })
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data.users ?? [])
    } catch { console.error('Failed to fetch users') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchUsers() }, [])

  const resetForm = () => {
    setForm({ username: '', password: '', email: '', role: 'admin' })
    setEditingId(null)
    setShowForm(false)
    setError('')
  }

  const openEdit = (u: any) => {
    setForm({ username: u.username, password: '', email: u.email || '', role: u.role })
    setEditingId(u.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const body: any = { ...form }
      if (editingId && !body.password) delete body.password
      let res
      if (editingId) {
        res = await fetch(`/api/users/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } else {
        res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      }
      if (res.ok) { resetForm(); fetchUsers() }
      else { const d = await res.json(); setError(d.error || 'Failed to save') }
    } catch { setError('Connection error') }
  }

  const handleDelete = async (id: number, username: string) => {
    if (username === 'admin') { alert('The admin user cannot be deleted.'); return }
    if (!confirm(`Delete user "${username}"?`)) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (res.ok) setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch { console.error('Failed to delete') }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#0A0E1B',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px',
    color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Users</h1>
        <button onClick={() => { resetForm(); setShowForm(true) }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#f8941e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
          <HiPlus /> Add User
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>{editingId ? 'Edit User' : 'Add New User'}</h3>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}><HiX /></button>
          </div>
          <form onSubmit={handleSubmit}>
            {error && <div style={{ background: 'rgba(235,46,37,0.15)', border: '1px solid #EB2E25', color: '#f48882', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>Username *</label>
                <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required={!editingId} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{editingId ? 'Password (leave blank to keep)' : 'Password *'}</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required={!editingId} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={inputStyle}>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={resetForm} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#ccc', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
              <button type="submit" style={{ padding: '8px 20px', background: '#f8941e', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
                {editingId ? 'Update' : 'Add'} User
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : users.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No users found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Username</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Role</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Created</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', color: '#ccc' }}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600 }}>
                      {u.username}
                      {u.username === 'admin' && <span style={{ color: '#f8941e', fontSize: '10px', marginLeft: '6px', fontWeight: 700 }}>ROOT</span>}
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{u.email || '—'}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ background: 'rgba(248,148,30,0.15)', color: '#f8941e', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' }}>{u.role}</span>
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button onClick={() => openEdit(u)} style={{ padding: '6px 10px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><HiPencil /></button>
                        <button onClick={() => handleDelete(u.id, u.username)} disabled={u.username === 'admin'} style={{ padding: '6px 10px', background: u.username === 'admin' ? 'rgba(255,255,255,0.05)' : 'rgba(235,46,37,0.15)', color: u.username === 'admin' ? '#555' : '#EB2E25', border: 'none', borderRadius: '4px', cursor: u.username === 'admin' ? 'not-allowed' : 'pointer' }}>
                          <HiTrash />
                        </button>
                      </div>
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
