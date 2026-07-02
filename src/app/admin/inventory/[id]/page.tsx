'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { HiPlus, HiX, HiTrash } from 'react-icons/hi'

export default function EditInventoryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    year: '',
    make: '',
    model: '',
    category: '',
    type: '',
    condition: '',
    price: '',
    salePrice: '',
    description: '',
    vin: '',
    stockNumber: '',
    status: 'available',
    featured: false,
  })
  const [imageUrls, setImageUrls] = useState<string[]>([''])

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/inventory/${id}`)
        if (!res.ok) { router.push('/admin/inventory'); return }
        const data = await res.json()
        const item = data.item
        setForm({
          title: item.title || '',
          year: item.year?.toString() || '',
          make: item.make || '',
          model: item.model || '',
          category: item.category || '',
          type: item.type || '',
          condition: item.condition || '',
          price: item.price?.toString() || '',
          salePrice: item.salePrice?.toString() || '',
          description: item.description || '',
          vin: item.vin || '',
          stockNumber: item.stockNumber || '',
          status: item.status || 'available',
          featured: item.featured || false,
        })
        setImageUrls(item.images?.length > 0 ? item.images.map((img: any) => img.url) : [''])
      } catch {
        router.push('/admin/inventory')
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const addImageUrl = () => setImageUrls((prev) => [...prev, ''])
  const removeImageUrl = (i: number) => setImageUrls((prev) => prev.filter((_, idx) => idx !== i))
  const updateImageUrl = (i: number, val: string) => setImageUrls((prev) => prev.map((u, idx) => (idx === i ? val : u)))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const body: Record<string, any> = {
        ...form,
        year: form.year ? parseInt(form.year) : null,
        price: form.price ? parseFloat(form.price) : null,
        salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
      }
      const images = imageUrls.filter((u) => u.trim())
      if (images.length > 0) {
        body.images = images.map((url, idx) => ({ url, sortOrder: idx }))
      }
      const res = await fetch(`/api/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        router.push('/admin/inventory')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to update')
      }
    } catch {
      setError('Connection error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: 'DELETE' })
      if (res.ok) router.push('/admin/inventory')
    } catch {
      setError('Failed to delete')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    background: '#0A0E1B',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#ccc',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '6px',
  }

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Edit Inventory</h1>
        <button
          onClick={handleDelete}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            background: 'rgba(235,46,37,0.15)',
            color: '#EB2E25',
            border: '1px solid rgba(235,46,37,0.3)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          <HiTrash /> Delete Item
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '24px' }}>
          {error && (
            <div style={{ background: 'rgba(235,46,37,0.15)', border: '1px solid #EB2E25', color: '#f48882', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div><label style={labelStyle}>Year</label><input name="year" type="number" value={form.year} onChange={handleChange} style={inputStyle} /></div>
            <div><label style={labelStyle}>Make</label><input name="make" value={form.make} onChange={handleChange} style={inputStyle} /></div>
            <div><label style={labelStyle}>Model</label><input name="model" value={form.model} onChange={handleChange} style={inputStyle} /></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div><label style={labelStyle}>Category</label><input name="category" value={form.category} onChange={handleChange} style={inputStyle} /></div>
            <div><label style={labelStyle}>Type</label><input name="type" value={form.type} onChange={handleChange} style={inputStyle} /></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Condition</label>
              <select name="condition" value={form.condition} onChange={handleChange} style={inputStyle}>
                <option value="">Select...</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="certified">Certified Pre-Owned</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div><label style={labelStyle}>Price</label><input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} style={inputStyle} /></div>
            <div><label style={labelStyle}>Sale Price</label><input name="salePrice" type="number" step="0.01" value={form.salePrice} onChange={handleChange} style={inputStyle} /></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div><label style={labelStyle}>VIN</label><input name="vin" value={form.vin} onChange={handleChange} style={inputStyle} /></div>
            <div><label style={labelStyle}>Stock Number</label><input name="stockNumber" value={form.stockNumber} onChange={handleChange} style={inputStyle} /></div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} style={{ accentColor: '#f8941e' }} />
              Featured Item
            </label>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Image URLs</label>
            {imageUrls.map((url, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input value={url} onChange={(e) => updateImageUrl(i, e.target.value)} placeholder="https://example.com/image.jpg" style={{ ...inputStyle, flex: 1 }} />
                {imageUrls.length > 1 && (
                  <button type="button" onClick={() => removeImageUrl(i)} style={{ padding: '10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><HiX /></button>
                )}
              </div>
            ))}
            <button type="button" onClick={addImageUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'transparent', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '6px', color: '#aaa', cursor: 'pointer', fontSize: '13px' }}>
              <HiPlus /> Add Image URL
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => router.back()} style={{ padding: '10px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#ccc', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '10px 24px', background: saving ? '#666' : '#f8941e', border: 'none', borderRadius: '6px', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 700 }}>
              {saving ? 'Saving...' : 'Update Inventory'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
