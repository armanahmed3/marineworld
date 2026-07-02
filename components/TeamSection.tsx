'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface StaffMember {
  id: number
  name: string
  title: string
  bio: string
  image: string
}

const fallbackStaff: StaffMember[] = [
  { id: 1, name: 'John Masterson', title: 'Owner / General Manager', bio: 'Over 25 years in the marine industry. John founded Marine World of Texas with a vision to provide exceptional boats and service to East Texas.', image: '' },
  { id: 2, name: 'Sarah Mitchell', title: 'Sales Manager', bio: 'Sarah leads our sales team with 15+ years of experience. Her passion for matching customers with the perfect boat is unmatched.', image: '' },
  { id: 3, name: 'Mike Rodriguez', title: 'Service Director', bio: 'Certified Mercury technician with 20+ years of experience. Mike ensures every boat leaving our service bay is in perfect condition.', image: '' },
  { id: 4, name: 'Lisa Thompson', title: 'Parts Manager', bio: 'Lisa keeps our parts department running smoothly with her extensive knowledge of marine parts and exceptional organizational skills.', image: '' },
  { id: 5, name: 'David Chen', title: 'Finance Manager', bio: 'David works with multiple lenders to secure the best financing options for our customers, making boat ownership accessible for all budgets.', image: '' },
  { id: 6, name: 'Amanda Foster', title: 'Marketing Director', bio: 'Amanda brings 10 years of marketing expertise to the team, helping share the Marine World of Texas story with the community.', image: '' },
  { id: 7, name: 'Robert Taylor', title: 'Lead Technician', bio: 'Robert is a master Mercury technician with a passion for diagnostics and repair. He handles the most complex service challenges.', image: '' },
  { id: 8, name: 'Jessica Ramirez', title: 'Customer Relations', bio: 'Jessica ensures every customer has a five-star experience from the moment they walk through our doors to long after their purchase.', image: '' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function StaffCard({ member }: { member: StaffMember }) {
  const cardRef = useRef<HTMLDivElement>(null!)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / centerY * -8)
    setRotateY((x - centerX) / centerX * 8)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const initials = member.name.split(' ').map(n => n[0]).join('')

  return (
    <motion.div
      variants={itemVariants}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-[#0B1325] border border-white/5 rounded-xl p-6 text-center transition-all duration-300 hover:border-[#EB2E25]/30 hover:shadow-lg hover:shadow-[#EB2E25]/5"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#EB2E25]/20 to-[#EB2E25]/5 flex items-center justify-center mb-5 group-hover:from-[#EB2E25]/30 group-hover:to-[#EB2E25]/10 transition-all duration-300 group-hover:scale-105">
          {member.image ? (
            <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-[#EB2E25] text-xl font-black">{initials}</span>
          )}
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-1 group-hover:text-[#EB2E25] transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-[#EB2E25] text-xs font-semibold uppercase tracking-widest mb-3">
          {member.title}
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          {member.bio}
        </p>
      </div>
    </motion.div>
  )
}

export default function TeamSection() {
  const [staff, setStaff] = useState<StaffMember[]>(fallbackStaff)

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch('/api/staff')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (data.staff?.length > 0) {
          setStaff(data.staff.map((s: StaffMember) => ({
            id: s.id,
            name: s.name,
            title: s.title,
            bio: s.bio,
            image: s.image || '',
          })))
        }
      } catch {
        // keep fallback
      }
    }
    fetchStaff()
  }, [])

  if (staff.length === 0) return null

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
            Meet Our Team
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base uppercase tracking-widest">
            Dedicated professionals committed to your satisfaction
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {staff.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
