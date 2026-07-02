export default function Hours() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Hours &amp; Location</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Find us in Whitehouse, TX</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <div style={{ width: '100%', height: '350px', background: '#0B1325', borderRadius: '8px', border: '1px solid #1a2040', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>🗺️</div>
              <p>Map Placeholder</p>
              <p style={{ fontSize: '13px', color: '#777' }}>1125 TX-110, Whitehouse, TX 75791</p>
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Location</h2>
            <p style={{ color: '#ccc', fontSize: '15px', marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Marine World of Texas</strong></p>
            <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '20px' }}>
              1125 TX-110<br />
              Whitehouse, TX 75791
            </p>
            <a href="tel:9037050804" style={{ color: '#EB2E25', textDecoration: 'none', fontSize: '18px', fontWeight: 700 }}>903.705.0804</a>
          </div>

          <div style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '16px' }}>Store Hours</h2>
            <div style={{ color: '#ccc', fontSize: '14px', lineHeight: 2.2 }}>
              {[
                { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Saturday', hours: '9:00 AM - 3:00 PM' },
                { day: 'Sunday', hours: 'Closed', highlight: true },
              ].map((d) => (
                <div key={d.day} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a2040', padding: '4px 0' }}>
                  <span>{d.day}</span>
                  <span style={d.highlight ? { color: '#EB2E25', fontWeight: 600 } : { color: '#fff' }}>{d.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
