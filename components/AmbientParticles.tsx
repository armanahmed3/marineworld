'use client'

import { Suspense, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function ParticlesScene() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 3000

  const [positions, colors, velocities] = useMemo(() => {
    const rng = seededRandom(42)
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (rng() - 0.5) * 80
      pos[i3 + 1] = (rng() - 0.5) * 80
      pos[i3 + 2] = (rng() - 0.5) * 40 - 10
      const shade = 0.2 + rng() * 0.5
      const tint = rng()
      if (tint < 0.33) {
        col[i3] = shade * 0.3; col[i3 + 1] = shade * 0.4; col[i3 + 2] = shade * 0.8
      } else if (tint < 0.66) {
        col[i3] = shade * 0.2; col[i3 + 1] = shade * 0.3; col[i3 + 2] = shade * 0.6
      } else {
        col[i3] = shade * 0.8; col[i3 + 1] = shade * 0.8; col[i3 + 2] = shade * 0.9
      }
      vel[i] = 0.002 + rng() * 0.008
    }
    return [pos, col, vel]
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    const time = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3 + 1] += velocities[i] * Math.sin(time * 0.3 + i * 0.01) * 0.5 + velocities[i] * 0.5
      pos[i3] += Math.sin(time * 0.2 + i * 0.02) * 0.002
      pos[i3 + 2] += Math.cos(time * 0.15 + i * 0.01) * 0.001
      if (pos[i3 + 1] > 45) pos[i3 + 1] = -45
      if (pos[i3] > 45) pos[i3] = -45
      if (pos[i3] < -45) pos[i3] = 45
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <>
      <fog attach="fog" args={['#0A0E1B', 15, 45]} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute args={[positions, 3]} attach="attributes-position" />
          <bufferAttribute args={[colors, 3]} attach="attributes-color" />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
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

function AmbientParticlesInner() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      camera={{ position: [0, 0, 12], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <Suspense fallback={null}>
        <ParticlesScene />
      </Suspense>
    </Canvas>
  )
}

const AmbientParticlesWrapper = dynamic(() => Promise.resolve(AmbientParticlesInner), { ssr: false })

export default AmbientParticlesWrapper
