'use client'

import { motion } from 'framer-motion'

const brands = [
  { name: 'Godfrey Pontoons', tagline: 'Premium Pontoon Boats' },
  { name: 'Hurricane Deck Boats', tagline: 'Deck Boat Excellence' },
  { name: 'Mercury Marine', tagline: 'Outboard Engines' },
  { name: 'Malibu Boats', tagline: 'Wake & Surf Boats' },
  { name: 'Polaris Slingshot', tagline: '3-Wheel Motorcycles' },
  { name: 'Marlon Trailers', tagline: 'Boat Trailers' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function BrandsShowcase() {
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
            The Brands We Carry
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base uppercase tracking-widest">
            Trusted names in marine excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              className="group relative bg-[#0B1325] border border-white/10 rounded-lg p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:border-[#EB2E25]/50 hover:bg-[#0B1325]/80 hover:shadow-lg hover:shadow-[#EB2E25]/5 hover:-translate-y-1"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center mb-4 group-hover:from-[#EB2E25]/10 group-hover:to-[#EB2E25]/5 transition-all duration-300">
                <span className="text-[#EB2E25] text-2xl font-black">✦</span>
              </div>
              <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider group-hover:text-[#EB2E25] transition-colors duration-300">
                {brand.name}
              </h3>
              <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">
                {brand.tagline}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EB2E25] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
