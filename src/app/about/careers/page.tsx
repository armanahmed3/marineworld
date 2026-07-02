'use client'

import { useState } from 'react'

export default function Careers() {
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
        body: JSON.stringify({ ...form, subject: 'Employment Inquiry' }),
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

  return (
    <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Careers</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Join the Marine World of Texas team</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Join Our Team</h2>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7 }}>
              Marine World of Texas is always looking for talented, motivated individuals to join our team. 
              We offer competitive compensation, a positive work environment, and opportunities for growth.
            </p>
          </div>

          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Current Openings</h2>
            <p style={{ color: '#999', fontSize: '14px', fontStyle: 'italic' }}>
              No current openings listed. Please check back or send us your resume for future consideration.
            </p>
            <div style={{ marginTop: '16px' }}>
              <p style={{ color: '#ccc', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>We are typically looking for:</p>
              <ul style={{ color: '#ccc', fontSize: '14px', lineHeight: 2, paddingLeft: '20px' }}>
                <li>Sales Consultants</li>
                <li>Service Technicians</li>
                <li>Parts Specialists</li>
                <li>Detailers</li>
                <li>Administrative Staff</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Apply Now</h2>
            <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '20px' }}>
              Send us your information and resume and we&apos;ll keep it on file for when positions become available.
            </p>
            {status === 'success' ? (
              <div style={{ padding: '20px', textAlign: 'center', background: '#0A0E1B', borderRadius: '6px' }}>
                <p style={{ color: '#EB2E25', fontWeight: 700, fontSize: '18px' }}>Application Received!</p>
                <p style={{ color: '#ccc', fontSize: '14px' }}>Thank you for your interest in joining our team.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name *" required style={inputStyle} />
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name *" required style={inputStyle} />
                </div>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required style={inputStyle} />
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone" style={inputStyle} />
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about yourself, your experience, and why you&apos;d like to join our team..." style={inputStyle} />
                <p style={{ color: '#777', fontSize: '12px' }}>Please include information about your relevant experience and the position you&apos;re interested in.</p>
                <button type="submit" disabled={status === 'loading'} style={{
                  padding: '12px 28px', background: status === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
                  borderRadius: '4px', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: "'Roboto Condensed', sans-serif",
                }}>
                  {status === 'loading' ? 'Sending...' : 'Submit Application'}
                </button>
                {status === 'error' && <p style={{ color: '#EB2E25', fontSize: '14px' }}>Error submitting application. Please call 903.705.0804.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
