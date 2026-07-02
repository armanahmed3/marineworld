'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ValueYourTrade() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    year: '', make: '', model: '', vin: '', mileage: '', condition: '', notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/trade-ins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ firstName: '', lastName: '', email: '', phone: '', year: '', make: '', model: '', vin: '', mileage: '', condition: '', notes: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #333',
    background: '#0A0E1B', color: '#fff', fontSize: '15px', fontFamily: "'Roboto Condensed', sans-serif",
  }
  const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 600, color: '#ccc' }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Value Your Trade</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Get an estimated value for your current boat. Fill out the form and we&apos;ll contact you.</p>

      {status === 'success' ? (
        <div style={{ padding: '40px', textAlign: 'center', background: '#0B1325', borderRadius: '8px', border: '1px solid #1a2040' }}>
          <h2 style={{ color: '#EB2E25', fontSize: '24px', marginBottom: '12px' }}>Trade-In Submitted!</h2>
          <p style={{ color: '#ccc' }}>Thank you for your submission. Our team will evaluate your trade and contact you with an estimated value.</p>
          <Link href="/inventory" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 32px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700 }}>Browse Inventory</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>First Name *</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last Name *</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Year *</label>
              <input name="year" value={form.year} onChange={handleChange} required placeholder="e.g., 2020" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Make *</label>
              <input name="make" value={form.make} onChange={handleChange} required placeholder="e.g., Malibu" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Model *</label>
              <input name="model" value={form.model} onChange={handleChange} required placeholder="e.g., 24 MXZ" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>VIN / Hull ID</label>
              <input name="vin" value={form.vin} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Hours / Mileage</label>
              <input name="mileage" value={form.mileage} onChange={handleChange} placeholder="e.g., 200 hours" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Condition *</label>
              <select name="condition" value={form.condition} onChange={handleChange} required style={inputStyle}>
                <option value="">Select...</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} placeholder="Any additional details about your boat..." style={inputStyle} />
          </div>
          <button type="submit" disabled={status === 'loading'} style={{
            padding: '14px 32px', background: status === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
            borderRadius: '4px', fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            letterSpacing: '0.05em', fontFamily: "'Roboto Condensed', sans-serif",
          }}>
            {status === 'loading' ? 'Submitting...' : 'Submit Trade'}
          </button>
          {status === 'error' && <p style={{ color: '#EB2E25', fontSize: '14px' }}>An error occurred. Please try again or call 903.705.0804.</p>}
        </form>
      )}
    </div>
  )
}
