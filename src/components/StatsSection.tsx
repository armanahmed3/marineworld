'use client'

import { motion } from 'framer-motion'
import { Anchor, Ship, Heart, Award } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

const stats = [
  { icon: Anchor, end: 30, suffix: '+', label: 'Years in Business' },
  { icon: Ship, end: 5000, suffix: '+', label: 'Boats Sold' },
  { icon: Heart, end: 4500, suffix: '+', label: 'Happy Customers' },
  { icon: Award, end: 12, suffix: '+', label: 'Brands Carried' },
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

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#0A0E1B]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block w-16 h-0.5 bg-[#EB2E25] mb-4" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-wider">
            Marine World of Texas <span className="text-[#EB2E25]">by the Numbers</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="relative bg-[#0B1325] border border-white/5 rounded-xl p-8 text-center group hover:border-[#EB2E25]/30 transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EB2E25]/10 text-[#EB2E25] mb-5 group-hover:bg-[#EB2E25]/20 transition-all duration-300 group-hover:scale-110">
                  <Icon size={28} />
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="w-10 h-0.5 bg-[#EB2E25] mx-auto mb-3" />
                <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
