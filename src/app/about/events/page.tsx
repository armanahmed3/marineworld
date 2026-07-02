'use client'

import { useState, useEffect } from 'react'

interface Event {
  id: string
  title: string
  description?: string
  date?: string
  location?: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : data.events || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Event Calendar</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>Upcoming events at Marine World of Texas</p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>Loading events...</div>
      ) : events.length === 0 ? (
        <div style={{ background: '#0B1325', padding: '40px', borderRadius: '8px', border: '1px solid #1a2040', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>No Upcoming Events</h2>
          <p style={{ color: '#ccc', fontSize: '14px' }}>
            There are no events scheduled at this time. Check back soon for boat shows, sales events, and community gatherings.
          </p>
          <p style={{ color: '#ccc', fontSize: '14px', marginTop: '16px' }}>
            Follow us on <a href="https://www.facebook.com/Marineworldoftexas" target="_blank" rel="noopener noreferrer" style={{ color: '#EB2E25' }}>Facebook</a> and{' '}
            <a href="https://www.instagram.com/marineworldoftexas/" target="_blank" rel="noopener noreferrer" style={{ color: '#EB2E25' }}>Instagram</a> for announcements.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {events.map((event) => (
            <div key={event.id} style={{ background: '#0B1325', padding: '24px', borderRadius: '8px', border: '1px solid #1a2040' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#fff' }}>{event.title}</h3>
                {event.date && (
                  <span style={{ fontSize: '13px', color: '#EB2E25', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                )}
              </div>
              {event.description && <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.6, margin: '0 0 8px' }}>{event.description}</p>}
              {event.location && <p style={{ color: '#999', fontSize: '13px', margin: 0 }}>📍 {event.location}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
