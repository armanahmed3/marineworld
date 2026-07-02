'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Parts() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
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
        setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' })
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
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Parts Department</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Genuine OEM parts and accessories for all major boat brands</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Genuine OEM Parts</h2>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7 }}>
              Marine World of Texas carries a comprehensive inventory of genuine OEM parts for all major marine manufacturers. 
              From engine components to electrical systems, we have the parts you need to keep your boat running at its best.
            </p>
          </div>

          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Parts &amp; Accessories</h2>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7 }}>
              In addition to OEM parts, we offer a wide selection of marine accessories including:
            </p>
            <ul style={{ color: '#ccc', fontSize: '14px', lineHeight: 2, paddingLeft: '20px' }}>
              <li>Navigation and electronics</li>
              <li>Boat covers and bimini tops</li>
              <li>Propellers and impellers</li>
              <li>Oil, lubricants, and maintenance supplies</li>
              <li>Safety equipment and life jackets</li>
              <li>Trailer parts and accessories</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/parts/request" style={{ padding: '12px 28px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>
              Request Parts
            </Link>
            <Link href="/parts/accessories" style={{ padding: '12px 28px', border: '2px solid #EB2E25', color: '#EB2E25', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>
              View Accessories
            </Link>
            <Link href="/parts/oem" style={{ padding: '12px 28px', border: '2px solid #fff', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>
              OEM Parts
            </Link>
          </div>
        </div>

        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Quick Parts Inquiry</h2>
            {status === 'success' ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ color: '#EB2E25', fontWeight: 700, fontSize: '18px' }}>Inquiry Sent!</p>
                <p style={{ color: '#ccc', fontSize: '14px' }}>Our parts team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>First *</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last *</label>
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
                  <label style={labelStyle}>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="What parts are you looking for?" style={inputStyle} />
                </div>
                <button type="submit" disabled={status === 'loading'} style={{
                  padding: '12px 28px', background: status === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
                  borderRadius: '4px', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: "'Roboto Condensed', sans-serif",
                }}>
                  {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
