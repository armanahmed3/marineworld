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
    <header className="header-main">
      <div className="header-top-row">
        <div className="header-logo">
          <Link href="/" title="Marine World of Texas">
            <img
              alt="Marine World of Texas"
              src="/images/marineworldoftexas-logo.png"
              className="site-logo-img"
            />
          </Link>
        </div>

        <div className="header-right-actions">
          <div className="header-social-top">
            <a href="https://www.facebook.com/Marineworldoftexas" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebook />
            </a>
            <a href="https://x.com/MarineWorldTX" target="_blank" rel="noopener noreferrer" title="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/marineworldoftexas/" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@marineworldoftexas" target="_blank" rel="noopener noreferrer" title="YouTube">
              <FaYoutube />
            </a>
          </div>

          <a className="header-phone" href="tel:9037050804" title="Call Marine World of Texas">
            903.705.0804
          </a>

          <Link className="header-map-btn" href="/about/hours">
            Map &amp; Hours
          </Link>

          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <nav id="main-nav">
        <ul className="navbar-nav">
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0
            const active = item.href === '/' ? pathname === '/' : isChildActive(item.children || [{ href: item.href }])

            return (
              <li
                key={item.label}
                className="nav-item-li"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`nav-item-link ${active ? 'active' : ''}`}
                >
                  {item.label}
                  {hasChildren && <span className="arrow">▼</span>}
                </Link>
                {hasChildren && (
                  <ul
                    className={`dropdown-menu ${openDropdown === item.label ? 'is-open' : ''}`}
                  >
                    {item.children!.map((child) => (
                      <li key={child.label}>
                        <Link href={child.href} className="dropdown-child-link">
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
        <div className="mobile-menu-overlay">
          <button
            className="mobile-menu-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close Menu"
          >
            <HiX />
          </button>
          
          <ul className="mobile-nav-list">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const isMobileOpen = mobileDropdownOpen === item.label

              return (
                <li key={item.label} className="mobile-nav-item">
                  <div className="mobile-nav-row">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="mobile-nav-link"
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => setMobileDropdownOpen(isMobileOpen ? null : item.label)}
                        className="mobile-dropdown-toggle"
                        aria-label="Toggle submenu"
                      >
                        {isMobileOpen ? '▲' : '▼'}
                      </button>
                    )}
                  </div>
                  {hasChildren && isMobileOpen && (
                    <ul className="mobile-submenu-list">
                      {item.children!.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="mobile-submenu-link"
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

          <div className="mobile-menu-footer">
            <Link
              href="/about/hours"
              onClick={() => setMobileOpen(false)}
              className="mobile-map-btn"
            >
              Map &amp; Hours
            </Link>
            <a href="tel:9037050804" className="mobile-call-btn">
              Call 903.705.0804
            </a>
          </div>
        </div>
      )}

      <style>{`
        .header-main {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 80%, transparent 100%);
          padding: 16px 40px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .header-top-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .site-logo-img {
          height: auto;
          width: auto;
          max-height: 60px;
          display: block;
        }
        .header-right-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .header-social-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-social-top a {
          color: #fff;
          font-size: 18px;
          transition: color 0.2s;
        }
        .header-social-top a:hover {
          color: #EB2E25;
        }
        .header-phone {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: -0.02em;
          font-family: 'Roboto Condensed', sans-serif;
        }
        .header-map-btn {
          border: 2px solid #fff;
          border-radius: 50px;
          padding: 8px 24px;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.05em;
          font-family: 'Roboto Condensed', sans-serif;
          transition: all 0.3s ease;
        }
        .header-map-btn:hover {
          background: #fff;
          color: #000;
        }
        .navbar-toggle {
          display: none;
          background: #EB2E25;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          box-shadow: 0 2px 10px rgba(235, 46, 37, 0.4);
        }
        #main-nav {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-item-li {
          position: relative;
        }
        .nav-item-link {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          padding: 10px 22px;
          display: block;
          text-decoration: none;
          font-family: 'Roboto Condensed', sans-serif;
          transition: background 0.2s;
        }
        .nav-item-link.active {
          background: #EB2E25;
        }
        .nav-item-link .arrow {
          font-size: 10px;
          margin-left: 5px;
        }
        .dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: #ef5b54;
          list-style: none;
          margin: 0;
          padding: 0;
          min-width: 250px;
          z-index: 1000;
        }
        .dropdown-menu.is-open {
          display: block;
        }
        .dropdown-child-link {
          color: #fff;
          padding: 8px 20px;
          display: block;
          text-decoration: none;
          font-size: 14px;
          font-family: 'Roboto Condensed', sans-serif;
          line-height: 30px;
        }
        .dropdown-child-link:hover {
          background: rgba(0,0,0,0.15);
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 14, 27, 0.98);
          z-index: 200;
          padding: 70px 20px 30px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .mobile-menu-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #EB2E25;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
        }
        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .mobile-nav-item {
          margin-bottom: 4px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .mobile-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mobile-nav-link {
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          padding: 12px 0;
          text-decoration: none;
          font-family: 'Roboto Condensed', sans-serif;
          flex: 1;
        }
        .mobile-dropdown-toggle {
          background: none;
          border: none;
          color: #EB2E25;
          font-size: 14px;
          cursor: pointer;
          padding: 12px;
        }
        .mobile-submenu-list {
          list-style: none;
          margin: 0;
          padding: 0 0 12px 16px;
        }
        .mobile-submenu-link {
          color: #ccc;
          font-size: 15px;
          padding: 8px 0;
          display: block;
          text-decoration: none;
          font-family: 'Roboto Condensed', sans-serif;
        }
        .mobile-menu-footer {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mobile-map-btn {
          border: 2px solid #fff;
          color: #fff;
          text-align: center;
          padding: 12px;
          border-radius: 6px;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
        }
        .mobile-call-btn {
          background: #EB2E25;
          color: #fff;
          text-align: center;
          padding: 12px;
          border-radius: 6px;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
        }

        @media (max-width: 991px) {
          .header-social-top { display: none !important; }
        }
        @media (max-width: 768px) {
          .header-main {
            padding: 10px 14px !important;
            background: rgba(10, 14, 27, 0.96) !important;
          }
          .header-logo {
            flex: 0 0 auto !important;
            margin-right: auto !important;
          }
          .site-logo-img {
            max-height: 34px !important;
          }
          .header-right-actions {
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            gap: 6px !important;
            margin-left: auto !important;
          }
          .header-phone {
            font-size: 13px !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            background: rgba(255, 255, 255, 0.12) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            padding: 4px 10px !important;
            border-radius: 20px !important;
            white-space: nowrap !important;
            margin-left: auto !important;
          }
          .navbar-toggle {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 38px !important;
            height: 38px !important;
            padding: 0 !important;
            background: #EB2E25 !important;
            color: #ffffff !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 8px rgba(235, 46, 37, 0.5) !important;
            flex-shrink: 0 !important;
          }
          #main-nav {
            display: none !important;
          }
        }
        @media (max-width: 580px) {
          .header-map-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
      <div className="h-[65px] md:h-[151px]" />
    </>
  )
}
