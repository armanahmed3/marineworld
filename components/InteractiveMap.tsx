'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const hours = [
  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM - 5:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

export default function InteractiveMap() {
  return (
    <section className="py-20 bg-[#0B1325] relative overflow-hidden">
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
            Visit Our Showroom
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base uppercase tracking-widest">
            Stop by and see our incredible selection in person
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="bg-[#0A0E1B] border border-white/5 rounded-xl p-8 md:p-10 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-8">
              Get In Touch
            </h3>

            <div className="space-y-6 flex-1">
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#EB2E25]/10 flex items-center justify-center text-[#EB2E25] group-hover:bg-[#EB2E25]/20 transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Address</p>
                  <p className="text-white font-semibold">
                    <a
                      href="https://maps.google.com/?q=3162+State+Highway+110+Whitehouse+TX+75791"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#EB2E25] transition-colors"
                    >
                      3162 State Highway 110<br />
                      Whitehouse, TX 75791
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#EB2E25]/10 flex items-center justify-center text-[#EB2E25] group-hover:bg-[#EB2E25]/20 transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-white font-semibold">
                    <a href="tel:9037050804" className="hover:text-[#EB2E25] transition-colors">
                      903.705.0804
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#EB2E25]/10 flex items-center justify-center text-[#EB2E25] group-hover:bg-[#EB2E25]/20 transition-all duration-300">
                  <Clock size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Hours</p>
                  <div className="space-y-1.5">
                    {hours.map((h) => (
                      <div key={h.day} className="flex justify-between text-sm">
                        <span className="text-gray-300">{h.day}</span>
                        <span className={h.time === 'Closed' ? 'text-[#EB2E25] font-semibold' : 'text-white font-semibold'}>
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <Link
                href="https://maps.google.com/?q=3162+State+Highway+110+Whitehouse+TX+75791"
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#EB2E25] hover:bg-red-700 text-white px-6 py-3 rounded font-bold text-sm uppercase tracking-wider transition-all hover:gap-3"
              >
                Get Directions
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="bg-[#0A0E1B] border border-white/5 rounded-xl overflow-hidden min-h-[400px]"
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-95.2250%2C32.2250%2C-95.2050%2C32.2450&layer=mapnik&marker=32.2350%2C-95.2150"
              width="100%"
              height="100%"
              className="w-full h-full min-h-[400px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Marine World of Texas Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
