'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HiMenu, HiX } from 'react-icons/hi'
import {
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlinePhotograph,
  HiOutlineStar,
  HiOutlineSpeakerphone,
  HiOutlineCalendar,
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlineMail,
  HiOutlineClipboard,
  HiOutlineCog,
  HiOutlineCurrencyDollar,
  HiOutlineSwitchHorizontal,
  HiOutlineLogout,
  HiOutlineExternalLink,
} from 'react-icons/hi'

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: HiOutlineHome },
  { label: 'Inventory', href: '/admin/inventory', icon: HiOutlineCube },
  { label: 'Leads', href: '/admin/leads', icon: HiOutlineUserGroup },
  { label: 'Content', href: '/admin/content', icon: HiOutlineDocumentText },
  { label: 'Slideshows', href: '/admin/slides', icon: HiOutlinePhotograph },
  { label: 'Testimonials', href: '/admin/testimonials', icon: HiOutlineStar },
  { label: 'Announcements', href: '/admin/announcements', icon: HiOutlineSpeakerphone },
  { label: 'Events', href: '/admin/events', icon: HiOutlineCalendar },
  { label: 'Staff', href: '/admin/staff', icon: HiOutlineBriefcase },
  { label: 'Users', href: '/admin/users', icon: HiOutlineUsers },
  { label: 'Surveys', href: '/admin/surveys', icon: HiOutlineClipboardList },
  { label: 'Newsletter', href: '/admin/newsletter', icon: HiOutlineMail },
  { label: 'Service Requests', href: '/admin/service-requests', icon: HiOutlineCog },
  { label: 'Parts Requests', href: '/admin/parts-requests', icon: HiOutlineClipboard },
  { label: 'Finance Apps', href: '/admin/finance-applications', icon: HiOutlineCurrencyDollar },
  { label: 'Trade-Ins', href: '/admin/trade-ins', icon: HiOutlineSwitchHorizontal },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/admin/login') return null

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 300,
          background: '#0A0E1B',
          border: '1px solid #EB2E25',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '20px',
          padding: '6px 10px',
          cursor: 'pointer',
          display: 'none',
        }}
      >
        {collapsed ? <HiX /> : <HiMenu />}
      </button>

      <aside
        style={{
          width: collapsed ? '0' : '260px',
          minWidth: collapsed ? '0' : '260px',
          background: '#0A0E1B',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          transition: 'width 0.3s, min-width 0.3s',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
          }}
        >
          <img
            src="/images/marineworldoftexas-logo.png"
            alt="Marine World of Texas"
            style={{ maxHeight: '40px', maxWidth: '100%' }}
          />
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {menuItems.map((item) => {
              const Icon = item.icon
              const active =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 20px',
                      color: active ? '#EB2E25' : '#ccc',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: "'Roboto Condensed', sans-serif",
                      fontWeight: active ? 700 : 400,
                      background: active ? 'rgba(235,46,37,0.1)' : 'transparent',
                      borderLeft: active ? '3px solid #EB2E25' : '3px solid transparent',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Icon style={{ fontSize: '18px', flexShrink: 0 }} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '10px 0',
          }}
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              color: '#ccc',
              textDecoration: 'none',
              fontSize: '14px',
              fontFamily: "'Roboto Condensed', sans-serif",
            }}
          >
            <HiOutlineExternalLink style={{ fontSize: '18px' }} />
            <span>View Site</span>
          </a>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              color: '#ccc',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: "'Roboto Condensed', sans-serif",
              width: '100%',
              textAlign: 'left',
            }}
          >
            <HiOutlineLogout style={{ fontSize: '18px' }} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          aside { position: fixed !important; left: 0; top: 0; z-index: 250; }
          button { display: block !important; }
        }
      `}</style>
    </>
  )
}
