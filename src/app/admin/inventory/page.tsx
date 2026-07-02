'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiPlus, HiPencil, HiTrash, HiSearch } from 'react-icons/hi'

export default function InventoryListPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const perPage = 10

  const fetchItems = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      const res = await fetch(`/api/inventory?${params}`)
      const data = await res.json()
      setItems(data.items ?? [])
    } catch {
      console.error('Failed to fetch inventory')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id))
      }
    } catch {
      console.error('Failed to delete')
    }
    setDeleteId(null)
  }

  const filtered = items.filter((i) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      i.title?.toLowerCase().includes(q) ||
      i.make?.toLowerCase().includes(q) ||
      i.model?.toLowerCase().includes(q)
    )
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Inventory</h1>
        <Link
          href="/admin/inventory/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            background: '#f8941e',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '14px',
          }}
        >
          <HiPlus /> Add New Inventory
        </Link>
      </div>

      <div
        style={{
          background: '#1a1f35',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ position: 'relative', maxWidth: '320px' }}>
            <HiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            <input
              type="text"
              placeholder="Search inventory..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                background: '#0A0E1B',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : paged.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No inventory items found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Image</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Title</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Year/Make/Model</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Price</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Featured</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((item, i) => (
                  <tr
                    key={item.id}
                    style={{
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                      color: '#ccc',
                      verticalAlign: 'middle',
                    }}
                  >
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0].url}
                          alt={item.title}
                          style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '48px',
                            height: '36px',
                            background: '#0A0E1B',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#555',
                            fontSize: '10px',
                          }}
                        >
                          No img
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600 }}>
                      {item.title || 'Untitled'}
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      {[item.year, item.make, item.model].filter(Boolean).join(' ') || '—'}
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      {item.price ? `$${item.price.toLocaleString()}` : '—'}
                      {item.salePrice && (
                        <span style={{ color: '#22c55e', fontSize: '11px', display: 'block' }}>
                          Sale: ${item.salePrice.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span
                        style={{
                          background:
                            item.status === 'available' ? 'rgba(34,197,94,0.15)' :
                            item.status === 'sold' ? 'rgba(235,46,37,0.15)' :
                            'rgba(248,148,30,0.15)',
                          color:
                            item.status === 'available' ? '#22c55e' :
                            item.status === 'sold' ? '#EB2E25' : '#f8941e',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      {item.featured ? (
                        <span style={{ color: '#f8941e', fontSize: '16px' }}>★</span>
                      ) : (
                        <span style={{ color: '#444', fontSize: '16px' }}>☆</span>
                      )}
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <Link
                          href={`/admin/inventory/${item.id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            background: 'rgba(59,130,246,0.15)',
                            color: '#3b82f6',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}
                        >
                          <HiPencil /> Edit
                        </Link>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            background: 'rgba(235,46,37,0.15)',
                            color: '#EB2E25',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          <HiTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  padding: '6px 14px',
                  background: p === page ? '#f8941e' : '#0A0E1B',
                  color: '#fff',
                  border: p === page ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: p === page ? 700 : 400,
                  fontSize: '13px',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setDeleteId(null)}
        >
          <div
            style={{
              background: '#1a1f35',
              borderRadius: '10px',
              padding: '24px',
              maxWidth: '400px',
              width: '90%',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '18px' }}>Confirm Delete</h3>
            <p style={{ color: '#aaa', fontSize: '14px', margin: '0 0 20px' }}>
              Are you sure you want to delete this inventory item? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  padding: '8px 20px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  color: '#ccc',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                style={{
                  padding: '8px 20px',
                  background: '#EB2E25',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
