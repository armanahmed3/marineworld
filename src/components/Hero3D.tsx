'use client'

import { Suspense, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import Link from 'next/link'

function Scene3DContent() {
  const particlesRef = useRef<THREE.Points>(null!)

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.01
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.005) * 0.03
    }
  })

  const particleCount = 1200
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 50
      pos[i3 + 1] = (Math.random() - 0.5) * 50
      pos[i3 + 2] = (Math.random() - 0.5) * 50
      const brightness = 0.5 + Math.random() * 0.5
      col[i3] = 0.6 * brightness
      col[i3 + 1] = 0.8 * brightness
      col[i3 + 2] = 1.0 * brightness
    }
    return [pos, col]
  }, [])

  return (
    <>
      <ambientLight intensity={0.8} />
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute args={[positions, 3]} attach="attributes-position" />
          <bufferAttribute args={[colors, 3]} attach="attributes-color" />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

const ThreeScene = dynamic(() => Promise.resolve(Scene3DContent), { ssr: false })

export default function Hero3D() {
  return (
    <section className="relative w-full h-[85vh] min-h-[500px] sm:h-screen sm:min-h-[650px] overflow-hidden bg-[#0A0E1B]">
      {/* Crisp Hero Image from HTML Slideshow */}
      <img
        src="/images/Supra_SL_20240605_1396_GCM.jpg"
        alt="Marine World of Texas Boat"
        className="absolute inset-0 w-full h-full object-cover object-[65%_center] sm:object-center scale-100 sm:scale-105 transition-all duration-500"
      />

      {/* Subtle Gradient Overlay for Text Legibility without obscuring the boat */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1B] via-black/20 to-black/40 sm:to-black/30" />

      {/* 3D Ambient Particles Layer (No black solid objects) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ThreeScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 pt-12 sm:pt-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center max-w-5xl"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-tight sm:leading-none drop-shadow-2xl">
            <span className="block drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">MARINE WORLD</span>
            <span className="block text-[#EB2E25] mt-0.5 sm:mt-1 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">OF TEXAS</span>
          </h1>
          <p className="mt-2.5 sm:mt-4 text-xs xs:text-sm sm:text-lg md:text-xl text-gray-100 font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase drop-shadow-md bg-black/50 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full inline-block backdrop-blur-md border border-white/20 max-w-[90vw]">
            Your Premier Marine Dealer in Whitehouse, TX
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-6 sm:px-0 max-w-xs sm:max-w-none"
        >
          <Link
            href="/inventory"
            className="bg-[#EB2E25] hover:bg-red-700 text-white px-6 py-3.5 sm:px-10 sm:py-4 rounded font-bold text-sm sm:text-lg uppercase tracking-wider transition-all hover:scale-105 shadow-lg shadow-red-900/50 text-center"
          >
            View Inventory
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white/80 bg-black/40 backdrop-blur-md hover:bg-white hover:text-[#0A0E1B] text-white px-6 py-3.5 sm:px-10 sm:py-4 rounded font-bold text-sm sm:text-lg uppercase tracking-wider transition-all hover:scale-105 shadow-lg text-center"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2 backdrop-blur-sm bg-black/20">
            <div className="w-1 h-2.5 bg-white/70 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
