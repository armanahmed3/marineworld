'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Ship, Eye } from 'lucide-react'
import Link from 'next/link'

interface InventoryItem {
  id: number
  title: string
  year: number
  make: string
  model: string
  price: string
  type: string
  image: string
}

const fallbackInventory: InventoryItem[] = [
  { id: 1, title: '2024 Godfrey Pontoons Sweetwater 2286', year: 2024, make: 'Godfrey Pontoons', model: 'Sweetwater 2286', price: '$39,995', type: 'pontoon', image: '' },
  { id: 2, title: '2024 Hurricane Deck Boat SunDeck 2200', year: 2024, make: 'Hurricane', model: 'SunDeck 2200', price: '$49,995', type: 'deck', image: '' },
  { id: 3, title: '2025 Malibu Boats 23 LSV', year: 2025, make: 'Malibu', model: '23 LSV', price: '$129,995', type: 'wake', image: '' },
  { id: 4, title: '2023 Godfrey Pontoons AquaPatio 2486', year: 2023, make: 'Godfrey Pontoons', model: 'AquaPatio 2486', price: '$34,995', type: 'pontoon', image: '' },
  { id: 5, title: '2024 Hurricane Deck Boat SunDeck 2500', year: 2024, make: 'Hurricane', model: 'SunDeck 2500', price: '$59,995', type: 'deck', image: '' },
]

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -400 : 400,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? -15 : 15,
  }),
}

export default function Inventory3DShowcase() {
  const [inventory, setInventory] = useState<InventoryItem[]>(fallbackInventory)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch('/api/inventory?featured=true')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (data.items?.length > 0) {
          setInventory(data.items.map((item: InventoryItem) => ({
            id: item.id,
            title: item.title,
            year: item.year,
            make: item.make,
            model: item.model,
            price: item.price,
            type: item.type,
            image: item.image || '',
          })))
        }
      } catch {
        // keep fallback
      }
    }
    fetchInventory()
  }, [])

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    goTo((current + 1) % inventory.length)
  }, [current, inventory.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + inventory.length) % inventory.length)
  }, [current, inventory.length, goTo])

  useEffect(() => {
    autoRef.current = setInterval(next, 4000)
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
    }
  }, [next])

  const item = inventory[current]
  if (!item) return null

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pontoon': return 'from-blue-900/80 to-blue-950/80'
      case 'deck': return 'from-teal-900/80 to-teal-950/80'
      case 'wake': return 'from-red-900/80 to-red-950/80'
      default: return 'from-gray-900/80 to-gray-950/80'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'pontoon': return 'Pontoon'
      case 'deck': return 'Deck Boat'
      case 'wake': return 'Wake Boat'
      default: return 'Boat'
    }
  }

  return (
    <section className="py-20 bg-[#0A0E1B] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EB2E25]/5 via-transparent to-[#EB2E25]/5" />

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
            Featured Inventory
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base uppercase tracking-widest">
            Premium boats ready for your next adventure
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center" style={{ perspective: '1200px', minHeight: '480px' }}>
          <button
            onClick={prev}
            className="absolute left-0 md:-left-4 z-20 w-12 h-12 rounded-full bg-[#0B1325]/80 border border-white/10 flex items-center justify-center text-white hover:bg-[#EB2E25] hover:border-[#EB2E25] transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous item"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="w-full max-w-lg mx-auto" style={{ transformStyle: 'preserve-3d' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={item.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group cursor-pointer"
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="bg-[#0B1325] border border-white/10 rounded-xl overflow-hidden hover:border-[#EB2E25]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#EB2E25]/10">
                  <div className={`relative h-56 md:h-64 bg-gradient-to-br ${getTypeColor(item.type)} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-[#0A0E1B]/30" />
                    <Ship size={64} className="text-white/20 group-hover:text-white/40 transition-all duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-[#EB2E25]/90 text-white rounded-full">
                        {getTypeLabel(item.type)}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-black/60 text-white rounded-full backdrop-blur-sm">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-1 group-hover:text-[#EB2E25] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
                      {item.make} {item.model}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl md:text-3xl font-black text-[#EB2E25]">
                        {item.price}
                      </span>
                      <Link
                        href={`/inventory/${item.id}`}
                        className="inline-flex items-center gap-2 bg-[#EB2E25] hover:bg-red-700 text-white px-5 py-2.5 rounded font-bold text-sm uppercase tracking-wider transition-all hover:gap-3"
                      >
                        <Eye size={16} />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="absolute right-0 md:-right-4 z-20 w-12 h-12 rounded-full bg-[#0B1325]/80 border border-white/10 flex items-center justify-center text-white hover:bg-[#EB2E25] hover:border-[#EB2E25] transition-all duration-300 backdrop-blur-sm"
            aria-label="Next item"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {inventory.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-[#EB2E25]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
