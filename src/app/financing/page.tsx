import Link from 'next/link'

export default function Financing() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Financing</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Flexible financing options to get you on the water</p>

      <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Why Finance With Marine World of Texas?</h2>
        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7 }}>
          Our finance team works with a network of top marine lenders to find you the best rates and terms. 
          Whether you&apos;re a first-time buyer or a seasoned boater, we make the financing process simple and transparent.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {[
          { title: 'Competitive Rates', desc: 'We work with multiple lenders to secure the most competitive interest rates and terms for your situation.' },
          { title: 'Flexible Terms', desc: 'Choose from a variety of loan terms ranging from 24 to 180 months to fit your budget.' },
          { title: 'Quick Approval', desc: 'Our streamlined application process means you can get approved quickly and get out on the water sooner.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#0B1325', padding: '24px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#EB2E25', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#ccc', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>What You Need to Apply</h2>
        <ul style={{ color: '#ccc', fontSize: '14px', lineHeight: 2, paddingLeft: '20px' }}>
          <li>Valid driver&apos;s license or government ID</li>
          <li>Proof of income (pay stubs, tax returns, or bank statements)</li>
          <li>Credit history information</li>
          <li>Employment history and contact information</li>
          <li>Information about the boat you&apos;re interested in</li>
        </ul>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/financing/pre-qualified" style={{ display: 'inline-block', padding: '14px 36px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '16px' }}>
          Get Pre-Qualified
        </Link>
        <a href="tel:9037050804" style={{ display: 'inline-block', padding: '14px 36px', border: '2px solid #fff', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Call 903.705.0804
        </a>
      </div>
    </div>
  )
}
