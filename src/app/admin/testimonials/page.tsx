'use client'

import { useState, useEffect } from 'react'
import { HiTrash, HiStar } from 'react-icons/hi'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/testimonials?all=true')
      const data = await res.json()
      setTestimonials(data.testimonials ?? [])
    } catch { console.error('Failed to fetch testimonials') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchTestimonials() }, [])

  const toggleApproved = async (t: any) => {
    try {
      const res = await fetch(`/api/testimonials/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !t.approved }),
      })
      if (res.ok) setTestimonials((prev) => prev.map((x) => (x.id === t.id ? { ...x, approved: !x.approved } : x)))
    } catch { console.error('Failed to toggle') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      if (res.ok) setTestimonials((prev) => prev.filter((t) => t.id !== id))
    } catch { console.error('Failed to delete') }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <HiStar key={i} style={{ color: i < rating ? '#f8941e' : '#444', fontSize: '14px' }} />
    ))
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Testimonials</h1>

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : testimonials.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No testimonials found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Title</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Content</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Rating</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Approved</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t, i) => (
                  <tr key={t.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', color: '#ccc', verticalAlign: 'top' }}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600 }}>{t.name}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{t.title || '—'}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', maxWidth: '300px' }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#aaa' }}>{t.content}</div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1px' }}>{renderStars(t.rating)}</div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <button
                        onClick={() => toggleApproved(t)}
                        style={{
                          padding: '4px 12px',
                          background: t.approved ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)',
                          color: t.approved ? '#22c55e' : '#888',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {t.approved ? 'Approved' : 'Pending'}
                      </button>
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <button onClick={() => handleDelete(t.id)} style={{ padding: '6px 10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
