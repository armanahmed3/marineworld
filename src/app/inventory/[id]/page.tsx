'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
  description?: string
  vin?: string
  mileage?: string
  engine?: string
  hull?: string
}

export default function InventoryDetail() {
  const params = useParams()
  const [item, setItem] = useState<InventoryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    if (!params.id) return
    fetch(`/api/inventory/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setItem(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center', color: '#999' }}>
        Loading inventory details...
      </div>
    )
  }

  if (!item) {
    return (
      <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Inventory Not Found</h1>
        <p style={{ color: '#999', marginBottom: '24px' }}>The requested inventory item could not be found.</p>
        <Link href="/inventory" style={{ display: 'inline-block', padding: '12px 32px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
          Back to Inventory
        </Link>
      </div>
    )
  }

  const images = item.images?.length > 0 ? item.images : ['/images/marineworldoftexas-slideshow-bg.jpg']

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Link href="/inventory" style={{ color: '#EB2E25', textDecoration: 'none', fontSize: '14px', fontWeight: 600, marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Inventory</Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '20px' }}>
        <div>
          <div style={{ width: '100%', height: '400px', background: '#1a2040', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
            <img src={images[activeImg]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer',
                  border: activeImg === i ? '2px solid #EB2E25' : '2px solid transparent', padding: 0, background: '#1a2040', flexShrink: 0,
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px' }}>{item.title || `${item.year} ${item.make} ${item.model}`}</h1>
          <span style={{
            display: 'inline-block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', padding: '4px 10px',
            borderRadius: '3px', background: item.condition === 'new' ? '#EB2E25' : '#555', color: '#fff', marginBottom: '16px',
          }}>
            {item.condition === 'new' ? 'New' : 'Pre-Owned'}
          </span>
          <p style={{ fontSize: '28px', fontWeight: 700, color: '#EB2E25', margin: '0 0 20px' }}>
            {item.price ? `$${item.price.toLocaleString()}` : 'Call for Price'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px', padding: '16px', background: '#0A0E1B', borderRadius: '6px' }}>
            <div><span style={{ color: '#999', fontSize: '13px' }}>Year</span><p style={{ margin: '2px 0', fontSize: '15px', fontWeight: 600 }}>{item.year}</p></div>
            <div><span style={{ color: '#999', fontSize: '13px' }}>Make</span><p style={{ margin: '2px 0', fontSize: '15px', fontWeight: 600 }}>{item.make}</p></div>
            <div><span style={{ color: '#999', fontSize: '13px' }}>Model</span><p style={{ margin: '2px 0', fontSize: '15px', fontWeight: 600 }}>{item.model}</p></div>
            <div><span style={{ color: '#999', fontSize: '13px' }}>Condition</span><p style={{ margin: '2px 0', fontSize: '15px', fontWeight: 600, textTransform: 'capitalize' }}>{item.condition}</p></div>
            {item.vin && <div><span style={{ color: '#999', fontSize: '13px' }}>VIN</span><p style={{ margin: '2px 0', fontSize: '15px', fontWeight: 600 }}>{item.vin}</p></div>}
            {item.mileage && <div><span style={{ color: '#999', fontSize: '13px' }}>Hours</span><p style={{ margin: '2px 0', fontSize: '15px', fontWeight: 600 }}>{item.mileage}</p></div>}
            {item.engine && <div><span style={{ color: '#999', fontSize: '13px' }}>Engine</span><p style={{ margin: '2px 0', fontSize: '15px', fontWeight: 600 }}>{item.engine}</p></div>}
            {item.hull && <div><span style={{ color: '#999', fontSize: '13px' }}>Hull</span><p style={{ margin: '2px 0', fontSize: '15px', fontWeight: 600 }}>{item.hull}</p></div>}
          </div>

          {item.description && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px' }}>Description</h3>
              <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/get-quote" style={{ padding: '12px 28px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>
              Get a Quote
            </Link>
            <Link href="/schedule-viewing" style={{ padding: '12px 28px', border: '2px solid #EB2E25', color: '#EB2E25', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>
              Schedule Viewing
            </Link>
            <Link href="/value-your-trade" style={{ padding: '12px 28px', border: '2px solid #fff', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>
              Value Your Trade
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
