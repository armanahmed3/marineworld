'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Tag, ArrowRight, Sparkles, Calendar, Percent, Gift } from 'lucide-react'
import Link from 'next/link'

interface Promotion {
  id: number
  title: string
  content: string
  tag: string
  icon: 'sparkles' | 'percent' | 'gift'
}

const fallbackPromotions: Promotion[] = [
  {
    id: 1,
    title: 'Spring Savings Event',
    content: 'Take advantage of our biggest spring sale of the year with incredible discounts on select new and pre-owned inventory. Limited time offer!',
    tag: 'Limited Time',
    icon: 'sparkles',
  },
  {
    id: 2,
    title: 'Mercury Rebates',
    content: 'Enjoy manufacturer rebates on select Mercury Marine outboard engines when you purchase a new boat from our inventory. Savings that make a splash!',
    tag: 'Rebate',
    icon: 'percent',
  },
  {
    id: 3,
    title: 'Trade-In Bonus',
    content: 'Get extra value on your trade-in when you upgrade to a new boat. We offer competitive valuations and special trade-in bonuses for a limited time.',
    tag: 'Bonus Offer',
    icon: 'gift',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const iconMap = {
  sparkles: Sparkles,
  percent: Percent,
  gift: Gift,
}

export default function PromotionsSection() {
  const [promotions, setPromotions] = useState<Promotion[]>(fallbackPromotions)

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await fetch('/api/announcements')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (data.announcements?.length > 0) {
          const mapped: Promotion[] = data.announcements.map((a: { id: number; title: string; content: string }, i: number) => ({
            id: a.id,
            title: a.title,
            content: a.content,
            tag: 'Announcement',
            icon: (['sparkles', 'percent', 'gift'] as const)[i % 3],
          }))
          setPromotions(mapped)
        }
      } catch {
        // keep fallback
      }
    }
    fetchPromotions()
  }, [])

  return (
    <section className="py-20 bg-[#0A0E1B] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EB2E25]/3 rounded-full blur-3xl pointer-events-none" />

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
            Latest Promotions & Offers
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base uppercase tracking-widest">
            Don&apos;t miss out on these great deals
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {promotions.map((promo) => {
            const Icon = iconMap[promo.icon]
            return (
              <motion.div
                key={promo.id}
                variants={itemVariants}
                className="group relative bg-[#0B1325] border border-white/5 rounded-xl overflow-hidden hover:border-[#EB2E25]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#EB2E25]/5 hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#EB2E25]/20 text-[#EB2E25] border border-[#EB2E25]/30 rounded-full">
                    {promo.tag}
                  </span>
                </div>

                <div className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-[#EB2E25]/10 flex items-center justify-center text-[#EB2E25] mb-5 group-hover:bg-[#EB2E25]/20 transition-all duration-300">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3 group-hover:text-[#EB2E25] transition-colors duration-300">
                    {promo.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {promo.content}
                  </p>

                  <Link
                    href="/inventory"
                    className="inline-flex items-center gap-2 text-[#EB2E25] font-bold text-sm uppercase tracking-wider group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EB2E25] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
