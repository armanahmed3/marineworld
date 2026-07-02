'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  return (
    <footer id="footer">
      <div className="footer-container footer-container--top">
        <div
          className="footer-row footer-row--top"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: '50px 50px 30px',
            borderRadius: '12px',
            backgroundColor: 'rgba(0,0,0,0.72)',
          }}
        >
          {/* Visit Us */}
          <div className="footer-column footer-column--contact" style={{ paddingTop: '20px' }}>
            <h4
              className="footer-column__header"
              style={{
                marginBottom: '26px',
                fontSize: '36px',
                color: '#ffffff',
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 700,
                marginTop: 0,
              }}
            >
              Visit Us
            </h4>
            <ul
              className="footer-column__list"
              style={{ listStyle: 'none', margin: 0, padding: 0 }}
            >
              <li style={{ color: '#fff', fontSize: '14px', fontWeight: 300, marginBottom: '10px' }}>
                1125 TX-110
              </li>
              <li style={{ color: '#fff', fontSize: '14px', fontWeight: 300, marginBottom: '10px' }}>
                Whitehouse, <abbr title="Texas">TX</abbr> 75791
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a
                  className="footer-phone__link"
                  href="tel:9037050804"
                  title="Call Marine World of Texas"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                  }}
                >
                  903.705.0804
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link
                  href="/about/hours"
                  title="Map, Directions, & Hours for Marine World of Texas in Whitehouse, TX"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 300,
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  Map &amp; Directions
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link
                  href="/contact"
                  title="Contact Marine World of Texas in Whitehouse, TX"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 300,
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-column footer-column--links" style={{ paddingTop: '20px' }}>
            <h4
              className="footer-column__header"
              style={{
                marginBottom: '26px',
                fontSize: '36px',
                color: '#ffffff',
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 700,
                marginTop: 0,
              }}
            >
              Quick Links
            </h4>
            <ul
              className="footer-column__list"
              style={{ listStyle: 'none', margin: 0, padding: 0 }}
            >
              <li style={{ color: '#fff', fontSize: '14px', fontWeight: 300, marginBottom: '10px' }}>
                <Link
                  href="/inventory/new"
                  title="New Boats for sale in Whitehouse, TX"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  New Boats
                </Link>
              </li>
              <li style={{ color: '#fff', fontSize: '14px', fontWeight: 300, marginBottom: '10px' }}>
                <Link
                  href="/inventory/pre-owned"
                  title="Used Boats for sale in Whitehouse, TX"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  Used Boats
                </Link>
              </li>
              <li style={{ color: '#fff', fontSize: '14px', fontWeight: 300, marginBottom: '10px' }}>
                <Link
                  href="/service"
                  title="Service in Whitehouse, TX"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  Service
                </Link>
              </li>
              <li style={{ color: '#fff', fontSize: '14px', fontWeight: 300, marginBottom: '10px' }}>
                <Link
                  href="/parts"
                  title="Parts in Whitehouse, TX"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  Parts
                </Link>
              </li>
              <li style={{ color: '#fff', fontSize: '14px', fontWeight: 300, marginBottom: '10px' }}>
                <Link
                  href="/service"
                  title="Ceramic Coating in Whitehouse, TX"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  Ceramic Coating
                </Link>
              </li>
              <li style={{ color: '#fff', fontSize: '14px', fontWeight: 300, marginBottom: '10px' }}>
                <Link
                  href="/service"
                  title="Winterization in Whitehouse, TX"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  Winterization
                </Link>
              </li>
              <li style={{ color: '#fff', fontSize: '14px', fontWeight: 300, marginBottom: '10px' }}>
                <Link
                  href="/about/events"
                  title="Events Calendar for Marine World of Texas in Whitehouse, TX"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo & Social */}
          <div className="footer-column footer-column--extras" style={{ paddingTop: '20px' }}>
            <div className="footer-logo">
              <Link href="/">
                <img
                  src="/images/marineworldoftexas-logo.png"
                  alt="Marine World of Texas is a Boats dealer in Whitehouse, TX"
                  style={{ maxWidth: '100%', marginBottom: '20px' }}
                />
              </Link>
            </div>
            <ul
              className="social-block-footer"
              style={{ listStyle: 'none', margin: '0 0 20px', padding: 0 }}
            >
              <li style={{ display: 'inline', marginRight: '10px' }}>
                <a
                  href="https://www.facebook.com/Marineworldoftexas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-facebook"
                  title="Marine World of Texas on Facebook"
                  style={{ color: '#fff', fontSize: '20px' }}
                >
                  <FaFacebook />
                </a>
              </li>
              <li style={{ display: 'inline', marginRight: '10px' }}>
                <a
                  href="https://www.instagram.com/marineworldoftexas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-instagram"
                  title="Marine World of Texas on Instagram"
                  style={{ color: '#fff', fontSize: '20px' }}
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
            <div
              className="footer-bottom__elem footer-bottom__elem--ds-logo"
              style={{ marginBottom: '10px' }}
            >
              <a
                href="https://texaswebcoders.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', fontSize: '13px', textDecoration: 'none' }}
              >
                Powered by Texas Web Coders
              </a>
            </div>
            <div
              className="footer-bottom__elem footer-bottom__elem--links"
              style={{ marginBottom: '10px' }}
            >
              <span style={{ marginRight: '15px' }}>
                <a
                  href="/policy"
                  style={{ color: '#fff', fontSize: '13px', textDecoration: 'none' }}
                >
                  Policy
                </a>
              </span>
              <span style={{ marginRight: '15px' }}>
                <a
                  href="/privacy"
                  style={{ color: '#fff', fontSize: '13px', textDecoration: 'none' }}
                >
                  Privacy
                </a>
              </span>
              <span style={{ marginRight: '15px' }}>
                <a
                  href="/terms"
                  style={{ color: '#fff', fontSize: '13px', textDecoration: 'none' }}
                >
                  Terms
                </a>
              </span>
              <span style={{ marginRight: '15px' }}>
                <a
                  href="/accessibility"
                  style={{ color: '#fff', fontSize: '13px', textDecoration: 'none' }}
                >
                  Accessibility
                </a>
              </span>
              <span style={{ marginRight: '15px' }}>
                <Link
                  href="/sitemap"
                  style={{ color: '#fff', fontSize: '13px', textDecoration: 'none' }}
                >
                  Site Map
                </Link>
              </span>
            </div>
            <div
              className="footer-bottom__elem footer-bottom__elem--copyright"
              style={{ marginBottom: '10px' }}
            >
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: 300 }}>
                Copyright &copy; 2026 Texas Web Coders &nbsp;
              </span>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: 300 }}>
                All Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
