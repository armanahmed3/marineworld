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
    { pos: [-16, 8, -12], color: '#38bdf8', size: 1.2, type: 'icosahedron', speed: 0.6, floatIntensity: 0.4, rotationSpeed: 0.2 },
    { pos: [14, -10, -14], color: '#818cf8', size: 1.4, type: 'torusKnot', speed: 0.8, floatIntensity: 0.5, rotationSpeed: 0.15 },
    { pos: [-12, -14, -16], color: '#60a5fa', size: 1.0, type: 'octahedron', speed: 0.5, floatIntensity: 0.3, rotationSpeed: 0.25 },
    { pos: [18, 5, -18], color: '#f43f5e', size: 0.8, type: 'dodecahedron', speed: 0.7, floatIntensity: 0.6, rotationSpeed: 0.18 },
    { pos: [-18, 14, -10], color: '#0ea5e9', size: 1.5, type: 'torusKnot', speed: 0.4, floatIntensity: 0.35, rotationSpeed: 0.12 },
  ], [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#38bdf8" />

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
            <Float
              key={i}
              speed={orb.speed}
              rotationIntensity={orb.rotationSpeed}
              floatIntensity={orb.floatIntensity}
            >
              <mesh position={orb.pos}>
                {geometry}
                <meshStandardMaterial
                  color={orb.color}
                  metalness={0.1}
                  roughness={0.2}
                  transparent
                  opacity={0.15}
                  wireframe
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
