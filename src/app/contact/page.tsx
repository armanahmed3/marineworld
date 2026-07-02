'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
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
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Contact Us</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>We&apos;d love to hear from you. Get in touch with our team.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Visit Our Dealership</h2>
            <div style={{ color: '#ccc', fontSize: '14px', lineHeight: 2 }}>
              <p><strong style={{ color: '#fff' }}>Address:</strong><br />1125 TX-110<br />Whitehouse, TX 75791</p>
              <p><strong style={{ color: '#fff' }}>Phone:</strong><br /><a href="tel:9037050804" style={{ color: '#EB2E25', textDecoration: 'none' }}>903.705.0804</a></p>
              <p><strong style={{ color: '#fff' }}>Hours:</strong><br />
                Mon - Fri: 9:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 3:00 PM<br />
                Sunday: Closed
              </p>
            </div>
            <Link href="/about/hours" style={{ display: 'inline-block', marginTop: '12px', padding: '10px 24px', border: '2px solid #EB2E25', color: '#EB2E25', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>
              Map &amp; Hours
            </Link>
          </div>

          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Quick Links</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'New Inventory', href: '/inventory/new' },
                { label: 'Pre-Owned Inventory', href: '/inventory/pre-owned' },
                { label: 'Service Department', href: '/service' },
                { label: 'Parts Department', href: '/parts' },
                { label: 'Financing', href: '/financing' },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: '8px' }}>
                  <Link href={link.href} style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Send Us a Message</h2>
            {status === 'success' ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ color: '#EB2E25', fontWeight: 700, fontSize: '18px' }}>Message Sent!</p>
                <p style={{ color: '#ccc', fontSize: '14px' }}>Thank you for contacting Marine World of Texas. We&apos;ll respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                  <label style={labelStyle}>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="How can we help you?" style={inputStyle} />
                </div>
                <button type="submit" disabled={status === 'loading'} style={{
                  padding: '14px 32px', background: status === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
                  borderRadius: '4px', fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.05em', fontFamily: "'Roboto Condensed', sans-serif",
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
