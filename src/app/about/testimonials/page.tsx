'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  id: string
  name: string
  content: string
  rating?: number
  createdAt?: string
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', content: '', rating: 5 })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetch('/api/testimonials?approved=true')
      .then((r) => r.json())
      .then((data) => {
        setTestimonials(Array.isArray(data) ? data : data.testimonials || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setFormStatus('success')
        setForm({ name: '', email: '', content: '', rating: 5 })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #333',
    background: '#0A0E1B', color: '#fff', fontSize: '15px', fontFamily: "'Roboto Condensed', sans-serif",
  }
  const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 600, color: '#ccc' }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Testimonials</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Hear from our satisfied customers</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', textAlign: 'center' }}>
              <p style={{ color: '#ccc', fontSize: '14px' }}>No testimonials yet. Be the first to leave one!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {testimonials.map((t) => (
                <div key={t.id} style={{ background: '#0B1325', padding: '24px', borderRadius: '8px', border: '1px solid #1a2040' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ color: '#EB2E25', fontSize: '15px' }}>{t.name}</strong>
                    {t.rating && <span style={{ color: '#FFD700', fontSize: '14px' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>}
                  </div>
                  <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>&ldquo;{t.content}&rdquo;</p>
                  {t.createdAt && <p style={{ color: '#666', fontSize: '12px', marginTop: '8px', marginBottom: 0 }}>{new Date(t.createdAt).toLocaleDateString()}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Leave a Review</h2>
            <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '20px' }}>
              We value your feedback. Share your experience with Marine World of Texas.
            </p>
            {formStatus === 'success' ? (
              <div style={{ padding: '20px', textAlign: 'center', background: '#0A0E1B', borderRadius: '6px' }}>
                <p style={{ color: '#EB2E25', fontWeight: 700, fontSize: '18px' }}>Thank You!</p>
                <p style={{ color: '#ccc', fontSize: '14px' }}>Your testimonial has been submitted and is pending approval.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Rating</label>
                  <select name="rating" value={form.rating} onChange={handleChange} style={inputStyle}>
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Your Review *</label>
                  <textarea name="content" value={form.content} onChange={handleChange} required rows={4} placeholder="Tell us about your experience..." style={inputStyle} />
                </div>
                <button type="submit" disabled={formStatus === 'loading'} style={{
                  padding: '12px 28px', background: formStatus === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
                  borderRadius: '4px', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: "'Roboto Condensed', sans-serif",
                }}>
                  {formStatus === 'loading' ? 'Submitting...' : 'Submit Review'}
                </button>
                {formStatus === 'error' && <p style={{ color: '#EB2E25', fontSize: '14px' }}>Error submitting review. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
