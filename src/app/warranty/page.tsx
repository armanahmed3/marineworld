'use client'

import { useState } from 'react'

export default function Warranty() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'warranty' }),
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
    <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Warranty</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Protect your investment with our comprehensive warranty coverage</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Manufacturer Warranty</h2>
            <p style={{ color: '#ccc', lineHeight: 1.7, fontSize: '14px' }}>
              All new boats purchased from Marine World of Texas come with the full manufacturer warranty. 
              Coverage varies by manufacturer but typically includes hull structural integrity, 
              engine and drivetrain components, and electrical systems for a specified period.
            </p>
          </div>

          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Extended Warranty Options</h2>
            <p style={{ color: '#ccc', lineHeight: 1.7, fontSize: '14px' }}>
              We offer extended warranty plans that can provide coverage beyond the standard manufacturer warranty. 
              Our extended service contracts cover major systems including the engine, transmission, 
              electrical components, and more. Ask our finance team about available plans.
            </p>
          </div>

          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Mercury Marine Warranty</h2>
            <p style={{ color: '#ccc', lineHeight: 1.7, fontSize: '14px' }}>
              As an authorized Mercury Marine dealer, all Mercury outboards and MerCruiser engines 
              come with Mercury&apos;s industry-leading warranty coverage. This includes:
            </p>
            <ul style={{ color: '#ccc', fontSize: '14px', lineHeight: 2, paddingLeft: '20px' }}>
              <li>3-year corrosion warranty</li>
              <li>5-year limited powertrain warranty</li>
              <li>1-year recreational use warranty</li>
              <li>24/7 Mercury Product Protection</li>
            </ul>
          </div>
        </div>

        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Warranty Questions?</h2>
            <p style={{ color: '#ccc', marginBottom: '20px', fontSize: '14px' }}>
              Have questions about your warranty coverage? Fill out the form and our service team will get back to you.
            </p>
            {status === 'success' ? (
              <div style={{ padding: '20px', textAlign: 'center', background: '#0A0E1B', borderRadius: '6px' }}>
                <p style={{ color: '#EB2E25', fontWeight: 700 }}>Message Sent!</p>
                <p style={{ color: '#ccc', fontSize: '14px' }}>Our team will respond to your warranty inquiry shortly.</p>
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
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Describe your warranty question..." style={inputStyle} />
                </div>
                <button type="submit" disabled={status === 'loading'} style={{
                  padding: '12px 28px', background: status === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
                  borderRadius: '4px', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: "'Roboto Condensed', sans-serif",
                }}>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'error' && <p style={{ color: '#EB2E25', fontSize: '14px' }}>Error sending message. Please call 903.705.0804.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
