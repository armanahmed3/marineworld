'use client'

import { useState } from 'react'

export default function ManufacturerPromotions() {
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
        body: JSON.stringify({ ...form, type: 'promotion' }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #333',
    background: '#0A0E1B', color: '#fff', fontSize: '15px', fontFamily: "'Roboto Condensed', sans-serif",
  }
  const promotions = [
    { title: 'Mercury Marine Rebates', desc: 'Save big on select Mercury outboard engines with factory rebates. Up to $2,000 off select models through participating dealers.', valid: 'Valid through end of current month' },
    { title: 'Manufacturer Financing Offers', desc: 'Special low APR financing available on select new models from Malibu, Axis, Moomba, Supra and more. Rates as low as 3.99% for qualified buyers.', valid: 'Subject to credit approval' },
    { title: 'Season-End Clearance', desc: 'Take advantage of end-of-season pricing on remaining new inventory. Unbeatable deals on boats ready for immediate delivery.', valid: 'While supplies last' },
    { title: 'Trade-In Bonus', desc: 'Get an additional $1,000 - $3,000 on your trade-in when you purchase a new qualifying boat. Combine with other offers.', valid: 'Cannot be combined with other offers' },
  ]

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Manufacturer Promotions</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Current offers and savings from our manufacturers</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '50px' }}>
        {promotions.map((p, i) => (
          <div key={i} style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#EB2E25', fontSize: '24px' }}>⚡</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{p.title}</h3>
            </div>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>{p.desc}</p>
            <p style={{ color: '#999', fontSize: '12px', fontStyle: 'italic' }}>{p.valid}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#0B1325', padding: '40px', borderRadius: '8px', border: '1px solid #1a2040', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Questions About Promotions?</h2>
          <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.6 }}>
            Contact our sales team to learn more about current promotions and find the best deal on your next boat. 
            We&apos;re happy to explain all available offers and help you maximize your savings.
          </p>
          <p style={{ color: '#ccc', fontSize: '14px', marginTop: '16px' }}>
            Call us at <a href="tel:9037050804" style={{ color: '#EB2E25', textDecoration: 'none', fontWeight: 700 }}>903.705.0804</a>
          </p>
        </div>
        <div>
          {status === 'success' ? (
            <div style={{ padding: '20px', textAlign: 'center', background: '#0A0E1B', borderRadius: '6px' }}>
              <p style={{ color: '#EB2E25', fontWeight: 700, fontSize: '18px' }}>Thank You!</p>
              <p style={{ color: '#ccc', fontSize: '14px' }}>We&apos;ll be in touch with promotion details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Contact Us About Promotions</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name *" required style={inputStyle} />
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name *" required style={inputStyle} />
                </div>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required style={inputStyle} />
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone" style={inputStyle} />
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Which promotion are you interested in?" style={inputStyle} />
                <button type="submit" disabled={status === 'loading'} style={{
                  padding: '12px 28px', background: status === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
                  borderRadius: '4px', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: "'Roboto Condensed', sans-serif",
                }}>
                  {status === 'loading' ? 'Sending...' : 'Get Details'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
