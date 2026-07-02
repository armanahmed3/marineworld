'use client'

import { Suspense, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import Link from 'next/link'

function Scene3DContent() {
  const groupRef = useRef<THREE.Group>(null!)
  const particlesRef = useRef<THREE.Points>(null!)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.04
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.15
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.008
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.005) * 0.05
    }
  })

  const shapes = useMemo(() => [
    { pos: [-3.5, 1.5, -2] as [number, number, number], color: '#1a2a5a', size: 1.2, type: 'torusKnot' },
    { pos: [3.5, -1, -3] as [number, number, number], color: '#2a3a7a', size: 1.0, type: 'torusKnot' },
    { pos: [0, 2.5, -4] as [number, number, number], color: '#0d1b3e', size: 0.9, type: 'torus' },
    { pos: [-2.5, -2, -5] as [number, number, number], color: '#3a4a8a', size: 0.7, type: 'icosahedron' },
    { pos: [4.5, 1.5, -4] as [number, number, number], color: '#1f3161', size: 0.6, type: 'octahedron' },
    { pos: [-1, -1.5, -6] as [number, number, number], color: '#15254f', size: 0.5, type: 'dodecahedron' },
  ], [])

  const particleCount = 2000
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 60
      pos[i3 + 1] = (Math.random() - 0.5) * 60
      pos[i3 + 2] = (Math.random() - 0.5) * 60
      const brightness = 0.3 + Math.random() * 0.7
      col[i3] = 0.4 * brightness
      col[i3 + 1] = 0.5 * brightness
      col[i3 + 2] = 0.8 * brightness
    }
    return [pos, col]
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={0.8} color="#4488cc" />
      <pointLight position={[0, -10, 5]} intensity={0.3} color="#2244aa" />
      <pointLight position={[5, 0, -5]} intensity={0.4} color="#6688ff" />

      <group ref={groupRef}>
        {shapes.map((s, i) => {
          let geometry
          switch (s.type) {
            case 'torusKnot':
              geometry = <torusKnotGeometry args={[s.size, s.size * 0.35, 64, 8]} />
              break
            case 'torus':
              geometry = <torusGeometry args={[s.size, s.size * 0.3, 32, 64]} />
              break
            case 'icosahedron':
              geometry = <icosahedronGeometry args={[s.size, 1]} />
              break
            case 'octahedron':
              geometry = <octahedronGeometry args={[s.size]} />
              break
            case 'dodecahedron':
              geometry = <dodecahedronGeometry args={[s.size]} />
              break
            default:
              geometry = <torusKnotGeometry args={[s.size, s.size * 0.35, 64, 8]} />
          }
          return (
            <Float key={i} speed={0.8 + i * 0.3} rotationIntensity={0.4} floatIntensity={0.5}>
              <mesh position={s.pos}>
                {geometry}
                <meshStandardMaterial
                  color={s.color}
                  metalness={0.6}
                  roughness={0.25}
                  transparent
                  opacity={0.85}
                />
              </mesh>
            </Float>
          )
        })}
      </group>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute args={[positions, 3]} attach="attributes-position" />
          <bufferAttribute args={[colors, 3]} attach="attributes-color" />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.6}
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
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#0A0E1B' }}
        >
          <Suspense fallback={null}>
            <OrbitControls
              autoRotate={false}
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.4}
              maxPolarAngle={Math.PI / 2.4}
              minPolarAngle={Math.PI / 2.4}
            />
            <ThreeScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1B] via-[#0A0E1B]/50 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none">
            <span className="block">MARINE WORLD</span>
            <span className="block text-[#EB2E25] mt-1">OF TEXAS</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 font-light tracking-[0.2em] uppercase">
            Your Premier Marine Dealer in Whitehouse, TX
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/inventory"
            className="bg-[#EB2E25] hover:bg-red-700 text-white px-10 py-4 rounded font-bold text-lg uppercase tracking-wider transition-all hover:scale-105"
          >
            View Inventory
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white hover:bg-white hover:text-[#0A0E1B] text-white px-10 py-4 rounded font-bold text-lg uppercase tracking-wider transition-all hover:scale-105"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
