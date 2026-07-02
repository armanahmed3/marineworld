'use client'

import Link from 'next/link'

export default function AdminNotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '72px', fontWeight: 900, color: '#f8941e', margin: '0 0 10px' }}>404</h1>
      <p style={{ fontSize: '18px', color: '#aaa', margin: '0 0 30px' }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/admin"
        style={{
          display: 'inline-block',
          padding: '10px 24px',
          background: '#f8941e',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 700,
          fontSize: '14px',
        }}
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
