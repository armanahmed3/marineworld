'use client'

import { Suspense, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface OrbConfig {
  pos: [number, number, number]
  color: string
  size: number
  type: 'icosahedron' | 'octahedron' | 'torusKnot' | 'dodecahedron'
  speed: number
  floatIntensity: number
  rotationSpeed: number
}

function OrbsScene() {
  const groupRef = useRef<THREE.Group>(null!)

  const orbs: OrbConfig[] = useMemo(() => [
    { pos: [-12, 5, -8], color: '#1a2a5a', size: 1.5, type: 'icosahedron', speed: 0.6, floatIntensity: 0.4, rotationSpeed: 0.2 },
    { pos: [10, -8, -10], color: '#3a1a2a', size: 1.8, type: 'torusKnot', speed: 0.8, floatIntensity: 0.5, rotationSpeed: 0.15 },
    { pos: [-8, -12, -12], color: '#2a3a6a', size: 1.2, type: 'octahedron', speed: 0.5, floatIntensity: 0.3, rotationSpeed: 0.25 },
    { pos: [14, 3, -15], color: '#4a1a2a', size: 1.0, type: 'dodecahedron', speed: 0.7, floatIntensity: 0.6, rotationSpeed: 0.18 },
    { pos: [-15, 10, -6], color: '#1a2a4a', size: 2.0, type: 'torusKnot', speed: 0.4, floatIntensity: 0.35, rotationSpeed: 0.12 },
    { pos: [6, -15, -18], color: '#2a1a3a', size: 1.3, type: 'icosahedron', speed: 0.9, floatIntensity: 0.45, rotationSpeed: 0.22 },
    { pos: [-4, 15, -14], color: '#1a3a2a', size: 0.9, type: 'octahedron', speed: 0.55, floatIntensity: 0.5, rotationSpeed: 0.3 },
  ], [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#4488cc" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#8844aa" />

      <group ref={groupRef}>
        {orbs.map((orb, i) => {
          let geometry
          switch (orb.type) {
            case 'icosahedron':
              geometry = <icosahedronGeometry args={[orb.size, 0]} />
              break
            case 'octahedron':
              geometry = <octahedronGeometry args={[orb.size]} />
              break
            case 'torusKnot':
              geometry = <torusKnotGeometry args={[orb.size, orb.size * 0.3, 48, 6]} />
              break
            case 'dodecahedron':
              geometry = <dodecahedronGeometry args={[orb.size]} />
              break
            default:
              geometry = <icosahedronGeometry args={[orb.size, 0]} />
          }
          return (
            <Float key={i} speed={orb.speed} rotationIntensity={orb.rotationSpeed} floatIntensity={orb.floatIntensity}>
              <mesh position={orb.pos}>
                {geometry}
                <meshStandardMaterial
                  color={orb.color}
                  metalness={0.3}
                  roughness={0.5}
                  transparent
                  opacity={0.2}
                  wireframe={i % 2 === 0}
                />
              </mesh>
            </Float>
          )
        })}
      </group>
    </>
  )
}

function FloatingOrbsInner() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      camera={{ position: [0, 0, 20], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <OrbsScene />
      </Suspense>
    </Canvas>
  )
}

const FloatingOrbsWrapper = dynamic(() => Promise.resolve(FloatingOrbsInner), { ssr: false })

export default FloatingOrbsWrapper
