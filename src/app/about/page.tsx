export default function About() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>About Marine World of Texas</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Your trusted boat dealership in Whitehouse, TX</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Our Story</h2>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.8 }}>
              Marine World of Texas has been serving the East Texas community for years, providing top-quality boats, 
              parts, and service from our location in Whitehouse, TX. We are proud to be an authorized dealer for 
              Malibu Boats, Axis Wake Research, Moomba Boats, Supra Boats, Godfrey Pontoons, Hurricane, and Suzuki Marine.
            </p>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.8, marginTop: '12px' }}>
              As a Mercury Marine authorized dealer, we offer the full line of Mercury outboard and MerCruiser engines, 
              along with factory-certified service and genuine OEM parts.
            </p>
          </div>

          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Our Brands</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {['Malibu', 'Axis', 'Moomba', 'Supra', 'Godfrey', 'Hurricane', 'Mercury', 'Suzuki'].map((brand) => (
                <div key={brand} style={{ padding: '12px', background: '#0A0E1B', borderRadius: '4px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Why Choose Us?</h2>
            <ul style={{ color: '#ccc', fontSize: '14px', lineHeight: 2.2, paddingLeft: '20px' }}>
              <li>Authorized dealer for top boat brands</li>
              <li>Mercury Marine certified service center</li>
              <li>Large inventory of new and pre-owned boats</li>
              <li>Factory-trained service technicians</li>
              <li>Genuine OEM parts department</li>
              <li>Flexible financing options</li>
              <li>Conveniently located in Whitehouse, TX</li>
            </ul>
          </div>

          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>Visit Us</h2>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.8 }}>
              <strong style={{ color: '#fff' }}>Address:</strong><br />
              1125 TX-110, Whitehouse, TX 75791
            </p>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.8 }}>
              <strong style={{ color: '#fff' }}>Phone:</strong><br />
              <a href="tel:9037050804" style={{ color: '#EB2E25', textDecoration: 'none' }}>903.705.0804</a>
            </p>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.8 }}>
              <strong style={{ color: '#fff' }}>Hours:</strong><br />
              Mon - Fri: 9:00 AM - 6:00 PM<br />
              Saturday: 9:00 AM - 3:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
