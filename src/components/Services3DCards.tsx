'use client'

import { motion } from 'framer-motion'
import { Ship, Wrench, Package, Anchor, BadgeDollarSign, Warehouse } from 'lucide-react'
import Link from 'next/link'

interface Service {
  icon: typeof Ship
  title: string
  subtitle: string
  description: string
  href: string
}

const services: Service[] = [
  {
    icon: Ship,
    title: 'New Boat Sales',
    subtitle: 'Factory-fresh vessels from top brands',
    description: 'Browse our extensive selection of new boats from the industry\'s most trusted manufacturers. From pontoons to deck boats, we have the perfect vessel for your lifestyle.',
    href: '/inventory/new',
  },
  {
    icon: Anchor,
    title: 'Pre-Owned Sales',
    subtitle: 'Quality used boats at great values',
    description: 'Every pre-owned boat in our inventory undergoes a rigorous inspection process. Find exceptional value on a wide range of used boats with our certified pre-owned program.',
    href: '/inventory/pre-owned',
  },
  {
    icon: Package,
    title: 'Parts Department',
    subtitle: 'OEM and aftermarket marine parts',
    description: 'Our fully stocked parts department carries a comprehensive selection of OEM and aftermarket parts for all major marine brands. Expert advice from our knowledgeable staff.',
    href: '/parts',
  },
  {
    icon: Wrench,
    title: 'Service & Repair',
    subtitle: 'Certified Mercury technicians on staff',
    description: 'Our state-of-the-art service center is staffed by factory-trained Mercury technicians. From routine maintenance to major repairs, we keep your boat running at its best.',
    href: '/service',
  },
  {
    icon: BadgeDollarSign,
    title: 'Financing',
    subtitle: 'Flexible options for every budget',
    description: 'Our finance team works with multiple lenders to secure the best rates and terms for your purchase. We make boat ownership affordable with customized financing solutions.',
    href: '/financing',
  },
  {
    icon: Warehouse,
    title: 'Boat Storage',
    subtitle: 'Secure indoor and outdoor storage',
    description: 'Protect your investment with our secure boat storage facilities. We offer both indoor and outdoor options with flexible terms to accommodate your seasonal needs.',
    href: '/service',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function Services3DCards() {
  return (
    <section className="py-20 bg-[#0B1325] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#EB2E25]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#EB2E25]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block w-16 h-0.5 bg-[#EB2E25] mb-4" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-wider">
            Our Services
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base uppercase tracking-widest">
            Everything you need, all in one place
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative w-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                  style={{ transformStyle: 'preserve-3d', minHeight: '340px' }}
                >
                  <div
                    className="absolute inset-0 rounded-xl bg-[#0A0E1B] border border-white/5 p-8 flex flex-col"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="w-14 h-14 rounded-lg bg-[#EB2E25]/10 flex items-center justify-center text-[#EB2E25] mb-6 group-hover:bg-[#EB2E25]/20 transition-all duration-300 group-hover:scale-110">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[#EB2E25] text-sm font-semibold uppercase tracking-widest mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1">
                      {service.description.length > 100
                        ? service.description.substring(0, 100) + '...'
                        : service.description}
                    </p>
                    <div className="mt-4 text-gray-500 text-xs uppercase tracking-widest">
                      Hover to learn more
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 rounded-xl bg-[#0A0E1B] border border-[#EB2E25]/30 p-8 flex flex-col"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-[#EB2E25] uppercase tracking-wider mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      className="inline-flex items-center justify-center gap-2 bg-[#EB2E25] hover:bg-red-700 text-white px-5 py-3 rounded font-bold text-sm uppercase tracking-wider transition-all mt-4"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
