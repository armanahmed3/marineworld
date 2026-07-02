import Link from 'next/link'

export default function Accessories() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Link href="/parts" style={{ color: '#EB2E25', textDecoration: 'none', fontSize: '14px', fontWeight: 600, marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Parts</Link>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Marine Accessories</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Upgrade your boat with premium accessories and gear</p>

      <div style={{ background: '#0B1325', padding: '40px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Accessories Coming Soon</h2>
        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7 }}>
          We are building our online accessories catalog. In the meantime, please visit our dealership or contact our parts department 
          to explore our full range of marine accessories including:
        </p>
        <ul style={{ color: '#ccc', fontSize: '14px', lineHeight: 2, paddingLeft: '20px', marginTop: '12px' }}>
          <li>Boat covers and mooring covers</li>
          <li>Bimini tops and shade systems</li>
          <li>Marine electronics and GPS</li>
          <li>Audio systems and speakers</li>
          <li>Propellers and impellers</li>
          <li>Dock lines, fenders, and hardware</li>
          <li>Life jackets and safety gear</li>
          <li>Cleaning and maintenance products</li>
        </ul>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/parts/request" style={{ display: 'inline-block', padding: '14px 36px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase' }}>
          Request Accessories
        </Link>
      </div>
    </div>
  )
}
