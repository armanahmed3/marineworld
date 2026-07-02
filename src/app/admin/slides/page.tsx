'use client'

import { useState, useEffect } from 'react'
import { HiPlus, HiPencil, HiTrash, HiChevronUp, HiChevronDown, HiX } from 'react-icons/hi'

export default function SlidesPage() {
  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: '', subtitle: '', imageUrl: '', linkUrl: '', sortOrder: 0, active: true })

  const fetchSlides = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/slides?all=true')
      const data = await res.json()
      setSlides(data.slides ?? [])
    } catch { console.error('Failed to fetch slides') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchSlides() }, [])

  const resetForm = () => {
    setForm({ title: '', subtitle: '', imageUrl: '', linkUrl: '', sortOrder: 0, active: true })
    setEditingId(null)
    setShowForm(false)
  }

  const openEdit = (slide: any) => {
    setForm({ title: slide.title || '', subtitle: slide.subtitle || '', imageUrl: slide.imageUrl || '', linkUrl: slide.linkUrl || '', sortOrder: slide.sortOrder || 0, active: slide.active })
    setEditingId(slide.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/slides/${editingId}` : '/api/slides'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        resetForm()
        fetchSlides()
      }
    } catch { console.error('Failed to save slide') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this slide?')) return
    try {
      const res = await fetch(`/api/slides/${id}`, { method: 'DELETE' })
      if (res.ok) setSlides((prev) => prev.filter((s) => s.id !== id))
    } catch { console.error('Failed to delete') }
  }

  const toggleActive = async (slide: any) => {
    try {
      const res = await fetch(`/api/slides/${slide.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !slide.active }),
      })
      if (res.ok) {
        setSlides((prev) => prev.map((s) => (s.id === slide.id ? { ...s, active: !s.active } : s)))
      }
    } catch { console.error('Failed to toggle') }
  }

  const moveSlide = async (id: number, direction: 'up' | 'down') => {
    const idx = slides.findIndex((s) => s.id === id)
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === slides.length - 1) return
    const newSlides = [...slides]
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    const tempOrder = newSlides[idx].sortOrder
    newSlides[idx].sortOrder = newSlides[swapIdx].sortOrder
    newSlides[swapIdx].sortOrder = tempOrder
    try {
      await Promise.all([
        fetch(`/api/slides/${newSlides[idx].id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: newSlides[idx].sortOrder }),
        }),
        fetch(`/api/slides/${newSlides[swapIdx].id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: newSlides[swapIdx].sortOrder }),
        }),
      ])
      fetchSlides()
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
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Slideshow</h1>
        <button onClick={() => { resetForm(); setShowForm(true) }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#f8941e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
          <HiPlus /> Add Slide
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>{editingId ? 'Edit Slide' : 'Add New Slide'}</h3>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}><HiX /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Subtitle</label>
                <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Image URL *</label>
              <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} required style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Link URL</label>
                <input value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} style={inputStyle} />
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
                {editingId ? 'Update' : 'Add'} Slide
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : slides.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No slides yet.</div>
        ) : (
          <div>
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  opacity: slide.active ? 1 : 0.5,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button onClick={() => moveSlide(slide.id, 'up')} disabled={i === 0} style={{ padding: '2px 6px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '3px', color: i === 0 ? '#444' : '#fff', cursor: i === 0 ? 'not-allowed' : 'pointer', fontSize: '12px', lineHeight: 1 }}>
                    <HiChevronUp />
                  </button>
                  <button onClick={() => moveSlide(slide.id, 'down')} disabled={i === slides.length - 1} style={{ padding: '2px 6px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '3px', color: i === slides.length - 1 ? '#444' : '#fff', cursor: i === slides.length - 1 ? 'not-allowed' : 'pointer', fontSize: '12px', lineHeight: 1 }}>
                    <HiChevronDown />
                  </button>
                </div>
                <div style={{ width: '80px', height: '50px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: '#0A0E1B' }}>
                  {slide.imageUrl ? (
                    <img src={slide.imageUrl} alt={slide.title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '10px' }}>No img</div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{slide.title || 'Untitled'}</div>
                  <div style={{ color: '#888', fontSize: '12px' }}>Order: {slide.sortOrder}</div>
                </div>
                <button onClick={() => toggleActive(slide)} style={{ padding: '6px 12px', background: slide.active ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.1)', color: slide.active ? '#22c55e' : '#888', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                  {slide.active ? 'Active' : 'Inactive'}
                </button>
                <button onClick={() => openEdit(slide)} style={{ padding: '6px 10px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  <HiPencil />
                </button>
                <button onClick={() => handleDelete(slide.id)} style={{ padding: '6px 10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  <HiTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
