'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiOutlineCube, HiOutlineUserGroup, HiOutlineStar, HiOutlineCalendar } from 'react-icons/hi'

interface StatCard {
  label: string
  value: number
  icon: React.ReactNode
  color: string
  href: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ inventory: 0, leads: 0, testimonials: 0, events: 0 })
  const [recentLeads, setRecentLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invRes, leadsRes, testRes, evtRes] = await Promise.all([
          fetch('/api/inventory'),
          fetch('/api/leads'),
          fetch('/api/testimonials?all=true'),
          fetch('/api/events'),
        ])
        const invData = await invRes.json()
        const leadsData = await leadsRes.json()
        const testData = await testRes.json()
        const evtData = await evtRes.json()

        setStats({
          inventory: invData.items?.length ?? 0,
          leads: leadsData.leads?.length ?? 0,
          testimonials: testData.testimonials?.length ?? 0,
          events: evtData.events?.length ?? 0,
        })
        setRecentLeads((leadsData.leads ?? []).slice(0, 5))
      } catch {
        console.error('Failed to fetch dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards: StatCard[] = [
    { label: 'Total Inventory', value: stats.inventory, icon: <HiOutlineCube />, color: '#f8941e', href: '/admin/inventory' },
    { label: 'Total Leads', value: stats.leads, icon: <HiOutlineUserGroup />, color: '#EB2E25', href: '/admin/leads' },
    { label: 'Testimonials', value: stats.testimonials, icon: <HiOutlineStar />, color: '#22c55e', href: '/admin/testimonials' },
    { label: 'Upcoming Events', value: stats.events, icon: <HiOutlineCalendar />, color: '#3b82f6', href: '/admin/events' },
  ]

  const getLeadTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      quote: '#f8941e',
      viewing: '#3b82f6',
      contact: '#22c55e',
    }
    return (
      <span
        style={{
          background: colors[type] || '#666',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        {type}
      </span>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 6px' }}>Dashboard</h1>
        <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
          Welcome to Marine World of Texas Admin
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '30px',
        }}
      >
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            style={{
              textDecoration: 'none',
              background: '#1a1f35',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                background: `${card.color}20`,
                color: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
              }}
            >
              {card.icon}
            </div>
            <div>
              <div style={{ color: '#888', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {card.label}
              </div>
              <div style={{ color: '#fff', fontSize: '28px', fontWeight: 700 }}>
                {loading ? '...' : card.value}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
        }}
      >
        <div
          style={{
            background: '#1a1f35',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            Recent Leads
          </div>
          {loading ? (
            <div style={{ padding: '20px', color: '#888' }}>Loading...</div>
          ) : recentLeads.length === 0 ? (
            <div style={{ padding: '20px', color: '#888' }}>No leads yet.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Type</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Name</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead: any, i: number) => (
                    <tr
                      key={lead.id}
                      style={{
                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                        color: '#ccc',
                      }}
                    >
                      <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        {getLeadTypeBadge(lead.type)}
                      </td>
                      <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        {lead.firstName} {lead.lastName}
                      </td>
                      <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span
                          style={{
                            color: lead.status === 'new' ? '#f8941e' : lead.status === 'read' ? '#3b82f6' : '#22c55e',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div
          style={{
            background: '#1a1f35',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '20px',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/admin/inventory/new"
              style={{
                display: 'block',
                padding: '12px 16px',
                background: '#f8941e',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                textAlign: 'center',
              }}
            >
              Add New Inventory
            </Link>
            <Link
              href="/admin/leads"
              style={{
                display: 'block',
                padding: '12px 16px',
                background: '#1a1f35',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              View All Leads
            </Link>
            <Link
              href="/admin/content"
              style={{
                display: 'block',
                padding: '12px 16px',
                background: '#1a1f35',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Manage Content
            </Link>
            <Link
              href="/admin/testimonials"
              style={{
                display: 'block',
                padding: '12px 16px',
                background: '#1a1f35',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Manage Testimonials
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
