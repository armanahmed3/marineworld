'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Hero3D from '@/components/Hero3D'
import StatsSection from '@/components/StatsSection'
import BrandsShowcase from '@/components/BrandsShowcase'
import WhyChooseUs from '@/components/WhyChooseUs'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import PromotionsSection from '@/components/PromotionsSection'
import InteractiveMap from '@/components/InteractiveMap'
import AmbientParticlesWrapper from '@/components/AmbientParticles'
import FloatingOrbsWrapper from '@/components/FloatingOrbs'
import SectionTransition from '@/components/SectionTransition'
import Inventory3DShowcase from '@/components/Inventory3DShowcase'
import Services3DCards from '@/components/Services3DCards'
import TeamSection from '@/components/TeamSection'
import TimelineSection from '@/components/TimelineSection'
import EventsSection from '@/components/EventsSection'

const ctas1 = [
  { first: 'Shop', second: 'New\nInventory', href: '/inventory/new', bg: '/images/marineworldoftexas-cta1.jpg' },
  { first: 'Shop', second: 'Pre-owned\nInventory', href: '/inventory/pre-owned', bg: '/images/marineworldoftexas-cta2.jpg' },
  { first: 'Service', second: 'Department', href: '/service', bg: '/images/marineworldoftexas-cta3.jpg' },
  { first: 'Get', second: 'Financing', href: '/financing', bg: '/images/marineworldoftexas-cta4.jpg' },
]

const ctas2 = [
  { first: 'Boat', second: 'Detailing', href: '/service', bg: '/images/marineworldoftexas-subcta1.jpg' },
  { first: 'Boat', second: 'Storage &\nWinterization', href: '/service', bg: '/images/marineworldoftexas-subcta2.jpg' },
  { first: 'OEM', second: 'Parts\nDepartment', href: '/parts', bg: '/images/marineworldoftexas-subcta3.jpg' },
  { first: 'Boat', second: 'Ceramic\nCoating', href: '/service', bg: '/images/marineworldoftexas-subcta4.jpg' },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function HomePage() {
  return (
    <>
      <AmbientParticlesWrapper />
      <FloatingOrbsWrapper />

      <div style={{ marginTop: '-151px', marginBottom: '-151px' }}>
        <Hero3D />
      </div>

      <main className="main-home">
        <SectionTransition>
          <StatsSection />
        </SectionTransition>

        <SectionTransition>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={sectionVariants}
            className="index-ctas index-ctas--1"
          >
            <ul>
              {ctas1.map((cta, i) => (
                <li key={i}>
                  <Link
                    href={cta.href}
                    title={cta.second.replace('\n', ' ')}
                    style={{
                      backgroundImage: `url(${cta.bg})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  >
                    <span className="first-line">{cta.first}</span>
                    <span className="second-line">
                      {cta.second.split('\n').map((line, j) => (
                        <span key={j}>{line}<br /></span>
                      ))}
                    </span>
                    <span className="cta-arrow" style={{ position: 'relative', zIndex: 2, marginTop: '16px', fontSize: '12px', color: '#fff' }}>▼</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </SectionTransition>

        <SectionTransition>
          <Inventory3DShowcase />
        </SectionTransition>

        <SectionTransition>
          <BrandsShowcase />
        </SectionTransition>

        <SectionTransition>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={sectionVariants}
            className="home-row"
          >
            <div>
              <div className="mercury-outboards-wrapper">
                <h3>Authorized</h3>
                <h2>Mercury Outboards</h2>
                <div className="img-wrapper">
                  <img
                    src="/images/marineworldoftexas-type-mercury.png"
                    alt="Mercury Marine® Outboards in Whitehouse, TX"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
                <ul>
                  <li><Link href="/parts">Parts</Link></li>
                  <li><Link href="/service">Service</Link></li>
                  <li><Link href="/inventory">Sales</Link></li>
                </ul>
              </div>
              <div className="welcome-wrapper">
                <h1>Welcome To <span>Marine World of Texas</span></h1>
                <div className="welcome-text">
                  We strive to do all we can to get you the boat that you&apos;re looking for. As your trusted New and pre-owned boat dealership in your area, we pride ourselves on being a cut above the rest with our unrelenting commitment to customer service. With many boat shopping options available, we differentiate ourselves by understanding our local boat-buying community and satisfying its needs; helping valued local customers like you, find the boat that&apos;s the &quot;right fit&quot;. Our sales team can help you get acquainted with our wide range of inventory, and help you narrow down your choices to find your perfect RIDE!
                  <br /><br />
                  To learn more about our dealership and how we can help with your next boat purchase, please call or stop by in person. We look forward to meeting you.
                </div>
              </div>
            </div>
          </motion.div>
        </SectionTransition>

        <SectionTransition>
          <WhyChooseUs />
        </SectionTransition>

        <SectionTransition>
          <Services3DCards />
        </SectionTransition>

        <SectionTransition>
          <TeamSection />
        </SectionTransition>

        <SectionTransition>
          <TimelineSection />
        </SectionTransition>

        <SectionTransition>
          <EventsSection />
        </SectionTransition>

        <SectionTransition>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={sectionVariants}
            className="index-ctas index-ctas--2"
          >
            <ul>
              {ctas2.map((cta, i) => (
                <li key={i}>
                  <Link
                    href={cta.href}
                    style={{
                      backgroundImage: `url(${cta.bg})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  >
                    <span className="first-line">{cta.first}</span>
                    <span className="second-line">
                      {cta.second.split('\n').map((line, j) => (
                        <span key={j}>{line}<br /></span>
                      ))}
                    </span>
                    <span className="cta-arrow">▼</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </SectionTransition>

        <SectionTransition>
          <TestimonialsCarousel />
        </SectionTransition>

        <SectionTransition>
          <PromotionsSection />
        </SectionTransition>

        <SectionTransition>
          <InteractiveMap />
        </SectionTransition>
      </main>
    </>
  )
}
