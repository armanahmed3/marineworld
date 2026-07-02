'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Service() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/service-requests', {
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
  const services = [
    { title: 'Engine Repair', desc: 'Full diagnostic and repair services for Mercury, MerCruiser, Suzuki, and other major marine engines.' },
    { title: 'Winterization', desc: 'Protect your boat during the off-season with our comprehensive winterization services including fogging, fluid changes, and storage prep.' },
    { title: 'Boat Detailing', desc: 'Professional interior and exterior detailing to keep your boat looking like new. Waxing, buffing, upholstery cleaning and more.' },
    { title: 'Ceramic Coating', desc: 'Premium ceramic coating application for long-lasting protection against UV rays, water spots, and environmental contaminants.' },
    { title: 'Electrical Systems', desc: 'Troubleshooting and repair of all marine electrical systems including batteries, wiring, navigation lights, and electronics.' },
    { title: 'Storage', desc: 'Secure indoor and outdoor storage options available. Climate-controlled storage for your peace of mind.' },
  ]

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Service Department</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Expert marine service and repair by certified technicians</p>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ background: '#0B1325', padding: '24px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
          <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7 }}>
            Our state-of-the-art service center is staffed by factory-trained and certified technicians who know your boat inside and out. 
            From routine maintenance to major repairs, we handle it all. As an authorized Mercury Marine service center, 
            we have the specialized tools and expertise to keep your Mercury outboard or MerCruiser engine running at peak performance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: '#0B1325', padding: '24px', borderRadius: '8px', border: '1px solid #1a2040' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#EB2E25', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: '#ccc', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Link href="/service/request" style={{ display: 'inline-block', padding: '14px 36px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '16px' }}>
          Schedule Service
        </Link>
        <a href="tel:9037050804" style={{ display: 'inline-block', padding: '14px 36px', border: '2px solid #fff', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Call 903.705.0804
        </a>
      </div>

      <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px', textAlign: 'center' }}>Quick Service Inquiry</h2>
        {status === 'success' ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#EB2E25', fontWeight: 700, fontSize: '18px' }}>Inquiry Sent!</p>
            <p style={{ color: '#ccc' }}>Our service team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name *" required style={inputStyle} />
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name *" required style={inputStyle} />
            </div>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required style={inputStyle} />
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone" style={inputStyle} />
            <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Describe the service you need..." style={inputStyle} />
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
  )
}
