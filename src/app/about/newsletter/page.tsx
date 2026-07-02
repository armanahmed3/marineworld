'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Newsletter Signup</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Stay up to date with the latest inventory, promotions, and events.</p>

      <div style={{ background: '#0B1325', padding: '40px', borderRadius: '8px', border: '1px solid #1a2040', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📬</div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Join Our Mailing List</h2>
        <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '24px' }}>
          Get the latest boat listings, special offers, and event invitations delivered to your inbox.
        </p>

        {status === 'success' ? (
          <div style={{ padding: '20px', background: '#0A0E1B', borderRadius: '6px' }}>
            <p style={{ color: '#EB2E25', fontWeight: 700, fontSize: '18px' }}>Subscribed!</p>
            <p style={{ color: '#ccc', fontSize: '14px' }}>Thank you for joining our newsletter. You&apos;ll hear from us soon.</p>
            <Link href="/" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 24px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700 }}>Back to Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '4px', border: '1px solid #333',
                  background: '#0A0E1B', color: '#fff', fontSize: '16px', textAlign: 'center',
                  fontFamily: "'Roboto Condensed', sans-serif",
                }}
              />
            </div>
            <button type="submit" disabled={status === 'loading'} style={{
              width: '100%', padding: '14px 32px', background: status === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
              borderRadius: '4px', fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              letterSpacing: '0.05em', fontFamily: "'Roboto Condensed', sans-serif",
            }}>
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
            {status === 'error' && <p style={{ color: '#EB2E25', fontSize: '14px', marginTop: '12px' }}>Error subscribing. Please try again.</p>}
          </form>
        )}
      </div>
    </div>
  )
}
