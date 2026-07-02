import Link from 'next/link'

export default function OemParts() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Link href="/parts" style={{ color: '#EB2E25', textDecoration: 'none', fontSize: '14px', fontWeight: 600, marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Parts</Link>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>OEM Parts</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Genuine OEM parts from leading marine manufacturers</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '30px' }}>
        {[
          { brand: 'Mercury Marine', desc: 'Genuine Mercury outboard and MerCruiser sterndrive parts, filters, oil, and maintenance kits.' },
          { brand: 'Malibu Boats', desc: 'Factory OEM parts for Malibu wakeboard and surf boats including ballast systems, towers, and more.' },
          { brand: 'Axis Wake', desc: 'Authentic Axis Wake Research parts and accessories from the factory.' },
          { brand: 'Moomba', desc: 'OEM Moomba boat parts including replacement upholstery, bimini tops, and engine components.' },
          { brand: 'Supra', desc: 'Factory Supra Boats parts for all models including SE and SA series.' },
          { brand: 'Suzuki Marine', desc: 'Genuine Suzuki Marine outboard parts, oil filters, spark plugs, and maintenance parts.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#0B1325', padding: '24px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#EB2E25', marginBottom: '8px' }}>{item.brand}</h3>
            <p style={{ color: '#ccc', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Need a Specific Part?</h2>
        <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '20px' }}>
          Our parts team can source any OEM part you need. Contact us with your boat&apos;s year, make, model, and part number.
        </p>
        <Link href="/parts/request" style={{ display: 'inline-block', padding: '14px 36px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase' }}>
          Request a Part
        </Link>
      </div>
    </div>
  )
}
