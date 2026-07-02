'use client'

import { motion } from 'framer-motion'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

const events: TimelineEvent[] = [
  {
    year: '2005',
    title: 'Founded in Whitehouse, TX',
    description: 'Marine World of Texas opened its doors with a commitment to providing exceptional boats and customer service to the East Texas community.',
  },
  {
    year: '2008',
    title: 'Authorized Mercury Dealer',
    description: 'Became an authorized Mercury Marine dealer, offering world-class outboard engines backed by factory-trained technicians.',
  },
  {
    year: '2012',
    title: 'Showroom Expansion',
    description: 'Expanded our showroom to 10,000 square feet, allowing us to display a wider selection of new and pre-owned boats.',
  },
  {
    year: '2016',
    title: 'Full-Service Parts Department',
    description: 'Launched our comprehensive parts department, stocking OEM and aftermarket parts for all major marine brands.',
  },
  {
    year: '2020',
    title: 'Premium Brand Additions',
    description: 'Added Godfrey Pontoons and Hurricane Deck Boats to our lineup, expanding our offerings to include the most sought-after marine brands.',
  },
  {
    year: '2024',
    title: 'Serving Thousands of Customers',
    description: 'Continuing our legacy of excellence, serving thousands of satisfied customers across Texas with sales, service, and parts.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const leftItemVariants = {
  hidden: { opacity: 0, x: -60, rotateY: 10 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const rightItemVariants = {
  hidden: { opacity: 0, x: 60, rotateY: -10 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function TimelineSection() {
  return (
    <section className="py-20 bg-[#0B1325] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/5" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block w-16 h-0.5 bg-[#EB2E25] mb-4" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-wider">
            Our Journey
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base uppercase tracking-widest">
            Two decades of marine excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative"
        >
          <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-[#EB2E25]/30 hidden md:block" />

          {events.map((event, i) => {
            const isLeft = i % 2 === 0
            const variants = isLeft ? leftItemVariants : rightItemVariants

            return (
              <motion.div
                key={event.year}
                variants={variants}
                className={`relative flex items-start mb-12 md:mb-16 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
                style={{ perspective: '1200px' }}
              >
                <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} w-full md:w-auto`}>
                  <div
                    className="bg-[#0A0E1B] border border-white/5 rounded-xl p-6 md:p-8 hover:border-[#EB2E25]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#EB2E25]/5"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#EB2E25]">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-12 flex-shrink-0 relative z-10">
                  <div className="w-4 h-4 rounded-full bg-[#EB2E25] border-4 border-[#0B1325] shadow-lg shadow-[#EB2E25]/30" />
                </div>

                <div className="flex-1 md:flex hidden" />

                <div className="md:hidden flex items-center gap-3 my-3">
                  <div className="w-3 h-3 rounded-full bg-[#EB2E25] flex-shrink-0" />
                  <div className="h-0.5 flex-1 bg-[#EB2E25]/20" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
