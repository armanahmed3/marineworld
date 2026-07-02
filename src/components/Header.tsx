'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Inventory',
    href: '/inventory/showroom',
    children: [
      { label: 'Showroom', href: '/inventory/showroom' },
      { label: 'All Inventory', href: '/inventory/all' },
      { label: 'New Inventory', href: '/inventory/new' },
      { label: 'Pre-Owned Inventory', href: '/inventory/pre-owned' },
      { label: 'Get a Quote', href: '/get-quote' },
      { label: 'Value Your Trade', href: '/value-your-trade' },
      { label: 'Warranty', href: '/warranty' },
      { label: 'Schedule a Viewing', href: '/schedule-viewing' },
      { label: 'Manufacturer Promotions', href: '/manufacturer-promotions' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    label: 'Parts & Service',
    href: '/parts',
    children: [
      { label: 'Parts Department', href: '/parts' },
      { label: 'Parts Request', href: '/parts/request' },
      { label: 'Service Department', href: '/service' },
      { label: 'Service Appointments', href: '/service/request' },
      { label: 'View Accessories', href: '/parts/accessories' },
      { label: 'View OEM Parts', href: '/parts/oem' },
    ],
  },
  {
    label: 'Financing',
    href: '/financing',
    children: [
      { label: 'Get Prequalified', href: '/financing/pre-qualified' },
      { label: 'Apply For Financing', href: '/financing' },
    ],
  },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Map & Hours', href: '/about/hours' },
      { label: 'Employment', href: '/about/careers' },
      { label: 'Event Calendar', href: '/about/events' },
      { label: 'Newsletter Signup', href: '/about/newsletter' },
      { label: 'Read Testimonials', href: '/about/testimonials' },
      { label: 'Submit a Testimonial', href: '/about/survey' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  const isChildActive = (children: { href: string }[]) =>
    children.some((c) => pathname === c.href || pathname.startsWith(c.href))

  return (
    <>
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        padding: '20px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="header-logo" style={{ flex: '0 0 auto' }}>
          <Link href="/" title="Marine World of Texas">
            <img
              alt="Marine World of Texas"
              src="/images/marineworldoftexas-logo.png"
              style={{ height: 'auto', width: 'auto', maxHeight: '60px', display: 'block' }}
            />
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            className="header-social-top"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <a href="https://www.facebook.com/Marineworldoftexas" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '18px' }}>
              <FaFacebook />
            </a>
            <a href="https://x.com/MarineWorldTX" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '18px' }}>
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/marineworldoftexas/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '18px' }}>
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@marineworldoftexas" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '18px' }}>
              <FaYoutube />
            </a>
          </div>
          <a
            className="header-phone"
            href="tel:9037050804"
            style={{
              color: '#fff',
              fontSize: '24px',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              fontFamily: "'Roboto Condensed', sans-serif",
            }}
          >
            903.705.0804
          </a>
          <Link
            className="header-map-btn"
            href="/about/hours"
            style={{
              border: '2px solid #fff',
              borderRadius: '50px',
              padding: '8px 24px',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              fontFamily: "'Roboto Condensed', sans-serif",
              transition: 'all 0.3s ease',
            }}
          >
            Map &amp; Hours
          </Link>
          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <nav
        id="main-nav"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul
          className="navbar-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0
            const active = item.href === '/' ? pathname === '/' : isChildActive(item.children || [{ href: item.href }])

            return (
              <li
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  style={{
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: 700,
                    padding: '10px 22px',
                    display: 'block',
                    textDecoration: 'none',
                    fontFamily: "'Roboto Condensed', sans-serif",
                    background: active ? '#EB2E25' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  {item.label}
                  {hasChildren && (
                    <span className="arrow" style={{ fontSize: '10px', marginLeft: '5px' }}>
                      ▼
                    </span>
                  )}
                </Link>
                {hasChildren && (
                  <ul
                    className="dropdown-menu"
                    style={{
                      display: openDropdown === item.label ? 'block' : 'none',
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: '#ef5b54',
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      minWidth: '250px',
                      zIndex: 1000,
                    }}
                  >
                    {item.children!.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          style={{
                            color: '#fff',
                            padding: '8px 20px',
                            display: 'block',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontFamily: "'Roboto Condensed', sans-serif",
                            lineHeight: '30px',
                          }}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 14, 27, 0.98)',
            zIndex: 200,
            padding: '80px 20px 20px',
            overflowY: 'auto',
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          >
            <HiX />
          </button>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const isMobileOpen = mobileDropdownOpen === item.label

              return (
                <li key={item.label} style={{ marginBottom: '4px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        color: '#fff',
                        fontSize: '18px',
                        fontWeight: 700,
                        padding: '12px 0',
                        textDecoration: 'none',
                        fontFamily: "'Roboto Condensed', sans-serif",
                        flex: 1,
                      }}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => setMobileDropdownOpen(isMobileOpen ? null : item.label)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#fff',
                          fontSize: '14px',
                          cursor: 'pointer',
                          padding: '12px',
                        }}
                      >
                        {isMobileOpen ? '▲' : '▼'}
                      </button>
                    )}
                  </div>
                  {hasChildren && isMobileOpen && (
                    <ul style={{ listStyle: 'none', margin: 0, padding: '0 0 8px 16px' }}>
                      {item.children!.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              color: '#ccc',
                              fontSize: '15px',
                              padding: '8px 0',
                              display: 'block',
                              textDecoration: 'none',
                              fontFamily: "'Roboto Condensed', sans-serif",
                            }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          header { padding: 15px 20px 10px !important; }
          .header-phone { font-size: 20px !important; }
          .navbar-toggle { display: block !important; }
          #main-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          header { padding: 10px 15px !important; gap: 8px !important; }
          .header-phone { font-size: 16px !important; }
          .header-map-btn { font-size: 10px !important; padding: 5px 14px !important; }
        }
      `}</style>
    </header>
      <div style={{ height: '151px' }} />
    </>
  )
}
