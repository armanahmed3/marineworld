'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PartsRequest() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', partInfo: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/parts-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ firstName: '', lastName: '', email: '', phone: '', partInfo: '', message: '' })
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
      <Link href="/parts" style={{ color: '#EB2E25', textDecoration: 'none', fontSize: '14px', fontWeight: 600, marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Parts</Link>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Parts Request</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Need a specific part? Fill out the form and our parts team will source it for you.</p>

      {status === 'success' ? (
        <div style={{ padding: '40px', textAlign: 'center', background: '#0B1325', borderRadius: '8px', border: '1px solid #1a2040' }}>
          <h2 style={{ color: '#EB2E25', fontSize: '24px', marginBottom: '12px' }}>Parts Request Submitted!</h2>
          <p style={{ color: '#ccc' }}>Thank you. Our parts department will contact you shortly with pricing and availability.</p>
          <Link href="/parts" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 32px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700 }}>Back to Parts</Link>
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
          <div>
            <label style={labelStyle}>Part Information *</label>
            <input name="partInfo" value={form.partInfo} onChange={handleChange} required placeholder="Part number, description, year/make/model of boat" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Additional Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Any additional details..." style={inputStyle} />
          </div>
          <button type="submit" disabled={status === 'loading'} style={{
            padding: '14px 32px', background: status === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
            borderRadius: '4px', fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            letterSpacing: '0.05em', fontFamily: "'Roboto Condensed', sans-serif",
          }}>
            {status === 'loading' ? 'Submitting...' : 'Submit Request'}
          </button>
          {status === 'error' && <p style={{ color: '#EB2E25', fontSize: '14px' }}>Error submitting request. Please call 903.705.0804.</p>}
        </form>
      )}
    </div>
  )
}
