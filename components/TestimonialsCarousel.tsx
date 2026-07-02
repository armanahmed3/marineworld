'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  content: string
  rating: number
  createdAt: string
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John D.',
    content: 'Marine World of Texas made buying our first boat an absolute pleasure. The team was knowledgeable, patient, and helped us find the perfect boat for our family. Highly recommend!',
    rating: 5,
    createdAt: '2025-12-15',
  },
  {
    id: 2,
    name: 'Sarah M.',
    content: 'I brought my boat in for service and was blown away by the professionalism. They diagnosed the issue quickly and had me back on the water in no time. Fair prices too!',
    rating: 5,
    createdAt: '2025-11-20',
  },
  {
    id: 3,
    name: 'Mike R.',
    content: 'Great selection of boats and even better customer service. They worked with me on financing and got me a rate I didnt think was possible. Will definitely be a returning customer.',
    rating: 5,
    createdAt: '2025-10-08',
  },
  {
    id: 4,
    name: 'Lisa T.',
    content: 'We trade in our old boat every few years and always come back to Marine World. They give fair trade-in values and have an amazing inventory to choose from. Trusted dealership!',
    rating: 4,
    createdAt: '2025-09-22',
  },
  {
    id: 5,
    name: 'Tom W.',
    content: 'The parts department is top-notch. They had exactly what I needed for my Mercury outboard in stock and the price was better than anywhere else. Knowledgeable staff.',
    rating: 5,
    createdAt: '2025-08-14',
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (data.testimonials?.length > 0) {
          setTestimonials(
            data.testimonials.map((t: { id: number; name: string; content: string; rating: number; createdAt: string }) => ({
              id: t.id,
              name: t.name,
              content: t.content,
              rating: t.rating,
              createdAt: t.createdAt,
            }))
          )
        }
      } catch {
        // keep fallback
      }
    }
    fetchTestimonials()
  }, [])

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length)
  }, [current, testimonials.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length)
  }, [current, testimonials.length, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  if (testimonials.length === 0) return null

  const t = testimonials[current]

  return (
    <section className="py-20 bg-[#0A0E1B] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EB2E25]/5 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block w-16 h-0.5 bg-[#EB2E25] mb-4" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-wider">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-[#0B1325] border border-white/5 rounded-xl p-8 md:p-12 text-center"
            >
              <Quote className="mx-auto text-[#EB2E25]/30 mb-6" size={40} />

              <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                  />
                ))}
              </div>

              <p className="text-white font-bold text-lg uppercase tracking-wider">
                {t.name}
              </p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                {new Date(t.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#EB2E25] hover:border-[#EB2E25] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-[#EB2E25] w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#EB2E25] hover:border-[#EB2E25] transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
