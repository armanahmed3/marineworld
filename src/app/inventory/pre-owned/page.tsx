'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface InventoryItem {
  id: string
  title: string
  year: number
  make: string
  model: string
  price: number | null
  condition: string
  images: string[]
}

export default function PreOwnedInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/inventory?condition=pre-owned')
      .then((r) => r.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : data.items || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = items.filter((item) => {
    if (!search) return true
    const q = search.toLowerCase()
    return item.title?.toLowerCase().includes(q) || item.make?.toLowerCase().includes(q) || item.model?.toLowerCase().includes(q)
  })

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Pre-Owned Inventory</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Quality pre-owned boats at great prices</p>

      <input
        type="text"
        placeholder="Search by make or model..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%', maxWidth: '500px', padding: '12px 16px', borderRadius: '4px',
          border: '1px solid #333', background: '#0A0E1B', color: '#fff', fontSize: '15px', marginBottom: '30px',
        }}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>Loading pre-owned inventory...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
          <p style={{ fontSize: '18px' }}>No pre-owned inventory currently available.</p>
          <p>Please check back soon or contact us for upcoming listings.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ background: '#0B1325', border: '1px solid #1a2040', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#EB2E25' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1a2040' }}>
              <div style={{ height: '200px', background: '#1a2040', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {item.images?.[0] ? <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ color: '#555', fontSize: '14px' }}>No Image</span>}
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{item.title || `${item.year} ${item.make} ${item.model}`}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', padding: '3px 8px', borderRadius: '3px', background: '#333', color: '#fff', whiteSpace: 'nowrap', marginLeft: '8px' }}>Pre-Owned</span>
                </div>
                <p style={{ color: '#999', fontSize: '14px', margin: '0 0 12px' }}>{item.year} {item.make} {item.model}</p>
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', margin: '0 0 16px' }}>{item.price ? `$${item.price.toLocaleString()}` : 'Call for Price'}</p>
                <Link href={`/inventory/${item.id}`} style={{ display: 'inline-block', padding: '10px 24px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
