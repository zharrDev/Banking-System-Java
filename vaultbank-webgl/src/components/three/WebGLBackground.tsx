/**
 * WebGLBackground.tsx – VaultBank 3D Background (Redesigned v5)
 *
 * Tema: Teal & Cream – sophisticated banking aesthetic
 * Style: Elegant, clean, performant
 *
 * Perubahan dari v4:
 *  - Geometri lebih halus & banking-oriented (vault door, coins, shield)
 *  - Warna cohesive: teal (#0D9488) + cream (#FFF8F0) + gold accent (#D4A853)
 *  - Lighting lebih soft, tidak harsh
 *  - Particle field halus, tidak berantakan
 *  - Grid dihapus (jelek), diganti abstract plane
 *  - Responsive: objek reposition berdasar viewport
 *  - Tidak tabrakan dengan konten HTML
 *  - Z-layer benar, pointer-events none
 */

import React, { Suspense, useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Environment,
} from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@/theme/ThemeProvider'

/* ─── PALETTE ─── */
const PALETTE = {
  light: {
    teal:      '#0D9488',
    tealSoft:  '#5EEAD4',
    cream:     '#FFF8F0',
    gold:      '#D4A853',
    goldMuted: '#E8D5A8',
    navy:      '#134E4A',
    particle:  '#99F6E4',
    fog:       '#FFF8F0',
  },
  dark: {
    teal:      '#14B8A6',
    tealSoft:  '#2DD4BF',
    cream:     '#1A1A2E',
    gold:      '#F0B429',
    goldMuted: '#D4A853',
    navy:      '#0F172A',
    particle:  '#5EEAD4',
    fog:       '#0F172A',
  },
}

/* ─── RESPONSIVE HOOK ─── */
function useResponsiveScale() {
  const { viewport } = useThree()
  // Scale objects based on viewport width
  const s = Math.min(viewport.width / 12, 1.15)
  return { scale: s, width: viewport.width, height: viewport.height }
}

/* ─── GOLD COIN ─── */
function GoldCoin({
  position,
  color,
  scale = 1,
  rotateSpeed = 0.3,
}: {
  position: [number, number, number]
  color: string
  scale?: number
  rotateSpeed?: number
}) {
  const mesh = useRef<THREE.Mesh>(null!)
  const { scale: rs } = useResponsiveScale()

  useFrame(({ clock }, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * rotateSpeed
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.08
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale * rs}>
        {/* Coin body – torus gives a nice rim */}
        <group>
          {/* Main disc */}
          <mesh>
            <cylinderGeometry args={[0.85, 0.85, 0.12, 64]} />
            <meshStandardMaterial
              color={color}
              roughness={0.2}
              metalness={0.92}
              envMapIntensity={1.2}
            />
          </mesh>
          {/* Rim ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.85, 0.06, 16, 64]} />
            <meshStandardMaterial
              color={color}
              roughness={0.15}
              metalness={0.95}
            />
          </mesh>
          {/* Center emboss – small sphere */}
          <mesh position={[0, 0.07, 0]}>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial
              color={color}
              roughness={0.3}
              metalness={0.85}
            />
          </mesh>
        </group>
      </mesh>
    </Float>
  )
}

/* ─── VAULT DOOR (replaces ugly floating card) ─── */
function VaultDoor({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null!)
  const { scale: rs } = useResponsiveScale()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const p = isDark ? PALETTE.dark : PALETTE.light

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.12
    group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.7) * 0.12
  })

  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.5}>
      <group ref={group} position={position} scale={rs * 0.9}>
        {/* Door panel */}
        <mesh>
          <boxGeometry args={[2.2, 2.6, 0.18]} />
          <meshStandardMaterial
            color={p.navy}
            roughness={0.35}
            metalness={0.6}
            envMapIntensity={0.8}
          />
        </mesh>

        {/* Vault wheel */}
        <mesh position={[0, 0, 0.1]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.55, 0.07, 16, 48]} />
          <meshStandardMaterial
            color={p.gold}
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>

        {/* Wheel spokes */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, i) => (
          <mesh
            key={i}
            position={[0, 0, 0.1]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[1.1, 0.06, 0.04]} />
            <meshStandardMaterial
              color={p.gold}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        ))}

        {/* Lock bolts */}
        {[[-0.85, 0.9, 0.1], [-0.85, 0, 0.1], [-0.85, -0.9, 0.1],
          [0.85, 0.9, 0.1], [0.85, 0, 0.1], [0.85, -0.9, 0.1]].map(
          (pos, i) => (
            <mesh key={i} position={pos as [number, number, number]}>
              <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
              <meshStandardMaterial
                color={p.goldMuted}
                roughness={0.2}
                metalness={0.85}
              />
            </mesh>
          )
        )}

        {/* Border frame */}
        <mesh>
          <boxGeometry args={[2.4, 2.8, 0.08]} />
          <meshStandardMaterial
            color={p.teal}
            roughness={0.4}
            metalness={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  )
}

/* ─── GLASS SHIELD ─── */
function GlassShield({ position }: { position: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const { scale: rs } = useResponsiveScale()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useFrame(({ clock }, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.15
    mesh.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.9) * 0.1
  })

  // Shield shape via extruded shape
  const shieldShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 1.2)
    shape.bezierCurveTo(0.8, 1.1, 1.0, 0.6, 1.0, 0.2)
    shape.bezierCurveTo(1.0, -0.4, 0.6, -0.9, 0, -1.2)
    shape.bezierCurveTo(-0.6, -0.9, -1.0, -0.4, -1.0, 0.2)
    shape.bezierCurveTo(-1.0, 0.6, -0.8, 1.1, 0, 1.2)
    return shape
  }, [])

  return (
    <Float speed={1.0} rotationIntensity={0.12} floatIntensity={0.6}>
      <mesh ref={mesh} position={position} scale={rs * 0.7}>
        <extrudeGeometry
          args={[
            shieldShape,
            { depth: 0.15, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 8 },
          ]}
        />
        <meshPhysicalMaterial
          color={isDark ? '#14B8A6' : '#0D9488'}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.45}
          transmission={0.6}
          thickness={0.5}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

/* ─── ELEGANT PARTICLE FIELD ─── */
function ElegantParticles({
  count = 100,
  themeMode,
}: {
  count?: number
  themeMode: 'light' | 'dark'
}) {
  const points = useRef<THREE.Points>(null!)
  const p = themeMode === 'dark' ? PALETTE.dark : PALETTE.light

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const szs = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Distribute in a wide cylinder shape, not random cube
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 10
      const height = (Math.random() - 0.5) * 10
      pos[i3] = Math.cos(angle) * radius
      pos[i3 + 1] = height
      pos[i3 + 2] = Math.sin(angle) * radius - 5
      szs[i] = 0.015 + Math.random() * 0.035
    }
    return { positions: pos, sizes: szs }
  }, [count])

  useFrame(({ clock }) => {
    if (!points.current) return
    points.current.rotation.y = clock.elapsedTime * 0.015
    // Gentle float
    const posAttr = points.current.geometry.attributes.position
    if (posAttr) {
      const arr = posAttr.array as Float32Array
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(clock.elapsedTime * 0.5 + i) * 0.0003
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={p.particle}
        transparent
        opacity={themeMode === 'dark' ? 0.6 : 0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── ABSTRACT TEAL WAVES (replaces ugly grid) ─── */
function AbstractWaves() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { scale: rs } = useResponsiveScale()

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const geo = mesh.current.geometry as THREE.PlaneGeometry
    const pos = geo.attributes.position
    const time = clock.elapsedTime * 0.3
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      pos.setZ(
        i,
        Math.sin(x * 0.4 + time) * 0.3 +
        Math.sin(y * 0.3 + time * 0.7) * 0.2 +
        Math.sin((x + y) * 0.2 + time * 0.5) * 0.15
      )
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
  })

  return (
    <mesh
      ref={mesh}
      rotation={[-Math.PI / 2.3, 0, 0]}
      position={[0, -3.5 * rs, -4]}
      scale={rs}
    >
      <planeGeometry args={[28, 18, 48, 48]} />
      <meshStandardMaterial
        color={isDark ? '#0F766E' : '#99F6E4'}
        roughness={0.6}
        metalness={0.2}
        transparent
        opacity={isDark ? 0.12 : 0.08}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ─── FLOATING DIAMONDS (subtle accent) ─── */
function FloatingDiamond({
  position,
  scale = 0.3,
  color,
}: {
  position: [number, number, number]
  scale?: number
  color: string
}) {
  const mesh = useRef<THREE.Mesh>(null!)
  const { scale: rs } = useResponsiveScale()

  useFrame(({ clock }, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.4
    mesh.current.rotation.z += delta * 0.15
    mesh.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.15
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={mesh} position={position} scale={scale * rs}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.05}
          metalness={0.4}
          transparent
          opacity={0.55}
          envMapIntensity={2}
          clearcoat={0.8}
        />
      </mesh>
    </Float>
  )
}

/* ─── MAIN SCENE ─── */
function SceneInner({ intensity }: { intensity: 'subtle' | 'hero' }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const p = isDark ? PALETTE.dark : PALETTE.light
  const isHero = intensity === 'hero'

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 8]} fov={45} />

      {/* Soft ambient – no harsh shadows */}
      <ambientLight intensity={isDark ? 0.5 : 0.75} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={isDark ? 0.7 : 0.9}
        color="#FFF8E8"
        castShadow={false}
      />
      <pointLight position={[-6, 2, 4]} intensity={0.35} color={p.teal} />
      <pointLight position={[4, -1, 2]} intensity={0.3} color={p.gold} />

      {/* Environment for reflections */}
      <Environment preset={isDark ? 'night' : 'apartment'} />

      {/* Fog for depth */}
      <fog attach="fog" args={[p.fog, 8, 22]} />

      {/* Background elements – positioned to NOT overlap center content */}
      <ElegantParticles themeMode={theme} count={isHero ? 120 : 60} />
      <AbstractWaves />

      {/* Vault door – far right, won't block text */}
      {isHero && (
        <VaultDoor position={[4.5, 0.2, -2.5]} />
      )}

      {/* Gold coins – corners only */}
      <GoldCoin
        position={[-5.2, 2.2, -3]}
        color={p.gold}
        scale={0.85}
        rotateSpeed={0.25}
      />
      <GoldCoin
        position={[5.0, -1.8, -2.5]}
        color={p.goldMuted}
        scale={0.6}
        rotateSpeed={0.35}
      />
      {isHero && (
        <GoldCoin
          position={[-3.5, -2.5, -4]}
          color={p.gold}
          scale={0.45}
          rotateSpeed={0.2}
        />
      )}

      {/* Glass shield – upper left, security symbolism */}
      {isHero && (
        <GlassShield position={[-4.2, 0.8, -1.5]} />
      )}

      {/* Floating diamonds – small accents in far corners */}
      <FloatingDiamond position={[6.5, 2.8, -5]} scale={0.25} color={p.tealSoft} />
      <FloatingDiamond position={[-6.0, -1.5, -6]} scale={0.18} color={p.gold} />
      {isHero && (
        <>
          <FloatingDiamond position={[3.5, 3.2, -7]} scale={0.15} color={p.tealSoft} />
          <FloatingDiamond position={[-2.5, -3.0, -5]} scale={0.12} color={p.goldMuted} />
        </>
      )}
    </>
  )
}

/* ─── EXPORTED COMPONENT ─── */
export const WebGLBackground: React.FC<{
  className?: string
  intensity?: 'subtle' | 'hero'
}> = ({ className = '', intensity = 'hero' }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  /* Vignette overlay colors depend on theme */
  const vignetteColor = isDark
    ? 'rgba(15, 23, 42, 0.85)'
    : 'rgba(255, 248, 240, 0.75)'
  const vignetteCenter = isDark
    ? 'transparent'
    : 'transparent'

  return (
    <div
      id="webgl-bg"
      className={className}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        opacity: intensity === 'hero' ? 1 : 0.65,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = isDark ? 0.9 : 1.1
        }}
      >
        <Suspense fallback={null}>
          <SceneInner intensity={intensity} />
        </Suspense>
      </Canvas>

      {/* Elegant vignette – softens edges, keeps center readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(
              ellipse 140% 100% at 50% 40%,
              ${vignetteCenter} 20%,
              ${isDark ? 'rgba(15,23,42,0.15)' : 'rgba(255,248,240,0.12)'} 50%,
              ${vignetteColor} 100%
            )
          `,
        }}
      />
    </div>
  )
}

export default WebGLBackground
