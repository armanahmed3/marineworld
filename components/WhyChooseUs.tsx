'use client'

import { motion } from 'framer-motion'
import { Wrench, Ship, DollarSign, Heart } from 'lucide-react'

const features = [
  {
    icon: Wrench,
    title: 'Expert Service',
    description: 'Certified Mercury technicians with decades of experience keeping your boat in top condition.',
  },
  {
    icon: Ship,
    title: 'Best Selection',
    description: 'Wide selection of new and pre-owned boats from the most trusted marine brands.',
  },
  {
    icon: DollarSign,
    title: 'Financing Options',
    description: 'Flexible financing options for every budget with competitive rates and quick approvals.',
  },
  {
    icon: Heart,
    title: 'Customer Satisfaction',
    description: 'Thousands of satisfied customers across Texas trust us for their boating needs.',
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

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#0B1325] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#EB2E25]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#EB2E25]/5 rounded-full blur-3xl" />

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
            Why Choose <span className="text-[#EB2E25]">Marine World of Texas</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base uppercase tracking-widest">
            Excellence in every aspect of marine sales and service
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative bg-[#0A0E1B] border border-white/5 rounded-xl p-8 flex gap-6 hover:border-[#EB2E25]/30 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#EB2E25] group-hover:h-full transition-all duration-500" />

                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#EB2E25]/10 flex items-center justify-center text-[#EB2E25] group-hover:bg-[#EB2E25]/20 transition-all duration-300 group-hover:scale-110">
                  <Icon size={26} />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#EB2E25] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-[#EB2E25]/0 group-hover:border-[#EB2E25]/20 transition-all duration-500 rounded-br-xl" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
