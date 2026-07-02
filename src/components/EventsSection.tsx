'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface EventItem {
  id: number
  title: string
  description: string
  date: string
  month: string
  day: string
  location: string
}

const fallbackEvents: EventItem[] = [
  {
    id: 1,
    title: 'Spring Boat Show',
    description: 'Explore our largest showcase of the year with special pricing on all new and pre-owned inventory. Demo rides available.',
    date: '2026-03-15',
    month: 'MAR',
    day: '15',
    location: 'Marine World of Texas Showroom',
  },
  {
    id: 2,
    title: 'Mercury Demo Day',
    description: 'Test drive the latest Mercury Marine outboard engines on the water. Expert technicians will be on hand to answer questions.',
    date: '2026-04-20',
    month: 'APR',
    day: '20',
    location: 'Lake Palestine',
  },
  {
    id: 3,
    title: 'Summer Savings Event',
    description: 'Kick off summer with incredible deals on pontoons, deck boats, and wake boats. Financing specials available.',
    date: '2026-05-01',
    month: 'MAY',
    day: '1',
    location: 'Marine World of Texas Showroom',
  },
  {
    id: 4,
    title: 'Customer Appreciation Day',
    description: 'Join us for food, fun, and exclusive customer-only pricing. Register for a chance to win accessories and gear.',
    date: '2026-06-12',
    month: 'JUN',
    day: '12',
    location: 'Marine World of Texas',
  },
  {
    id: 5,
    title: 'Fall Boat Show',
    description: 'End-of-season clearance on remaining inventory. Best time to find deals on new models as we make room for next year.',
    date: '2026-09-10',
    month: 'SEP',
    day: '10',
    location: 'Marine World of Texas Showroom',
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents)
  const scrollRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (data.events?.length > 0) {
          setEvents(data.events.map((e: EventItem) => ({
            id: e.id,
            title: e.title,
            description: e.description,
            date: e.date,
            month: e.month || new Date(e.date).toLocaleString('default', { month: 'short' }).toUpperCase(),
            day: e.day || String(new Date(e.date).getDate()),
            location: e.location,
          })))
        }
      } catch {
        // keep fallback
      }
    }
    fetchEvents()
  }, [])

  return (
    <section className="py-20 bg-[#0A0E1B] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EB2E25]/5 to-transparent" />

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
            Upcoming Events
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base uppercase tracking-widest">
            Join us and be part of the Marine World community
          </p>
        </motion.div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg uppercase tracking-wider">No upcoming events</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for future events and gatherings</p>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
                >
                  <div
                    className="group bg-[#0B1325] border border-white/5 rounded-xl overflow-hidden hover:border-[#EB2E25]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#EB2E25]/5"
                    style={{ perspective: '1000px' }}
                  >
                    <div className="flex">
                      <div className="flex flex-col items-center justify-center bg-[#EB2E25] px-5 py-6 min-w-[80px]">
                        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                          {event.month}
                        </span>
                        <span className="text-3xl md:text-4xl font-black text-white leading-none mt-1">
                          {event.day}
                        </span>
                      </div>
                      <div className="flex-1 p-5">
                        <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#EB2E25] transition-colors duration-300">
                          {event.title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                          <MapPin size={12} />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-0.5 bg-[#EB2E25] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-10"
            >
              <Link
                href="/about#events"
                className="inline-flex items-center gap-2 text-[#EB2E25] hover:text-red-400 font-bold text-sm uppercase tracking-wider transition-all group"
              >
                View All Events
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
