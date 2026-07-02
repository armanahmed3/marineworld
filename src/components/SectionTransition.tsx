'use client'

import { motion } from 'framer-motion'

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
}

export default function SectionTransition({ children, className = '' }: SectionTransitionProps) {
  return (
    <div style={{ perspective: '1200px' }} className={`relative ${className}`}>
      <div className="w-20 h-0.5 bg-[#EB2E25] mx-auto mb-0" />
      <motion.div
        initial={{ opacity: 0, rotateX: 15, y: 80, scale: 0.95 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
