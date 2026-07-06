/**
 * SketchScrollBackground.tsx – VaultBank Pencil-Sketch Background (Redesigned v5)
 *
 * Tema: Hand-drawn pencil sketch – thin strokes, subtle, elegant
 * Warna: Teal & Cream palette
 *
 * Fitur:
 *  - SVG-based pencil line illustrations
 *  - Scroll-linked parallax movement
 *  - Responsive positioning
 *  - Drawing animation on scroll (path dashoffset)
 *  - Tema: banking elements (vaults, coins, charts, shields)
 *  - Tidak tabrakan dengan konten: elemen di pinggir-pinggir
 */

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from '@/theme/ThemeProvider'

/* ─── PALETTE ─── */
const SKETCH_PALETTE = {
  light: {
    stroke:    '#0F766E',    // teal dark
    strokeAlt: '#D4A853',    // gold
    strokeSoft:'#99F6E4',    // teal light
    fill:      'rgba(13,148,136,0.04)', // very faint teal fill
    fillGold:  'rgba(212,168,83,0.06)',
    bg:        'transparent',
  },
  dark: {
    stroke:    '#5EEAD4',
    strokeAlt: '#F0B429',
    strokeSoft:'#2DD4BF',
    fill:      'rgba(94,234,212,0.04)',
    fillGold:  'rgba(240,180,41,0.05)',
    bg:        'transparent',
  },
}

/* ─── SKETCH ELEMENTS ─── */

/** Pencil-style coin */
const SketchCoin: React.FC<{
  x: number; y: number; size: number; stroke: string; fill: string; delay: number
}> = ({ x, y, size, stroke, fill, delay }) => (
  <g
    transform={`translate(${x}, ${y})`}
    style={{ opacity: 0.55, animationDelay: `${delay}s` }}
    className="sketch-element"
  >
    {/* Outer circle – slightly wobbly for hand-drawn feel */}
    <ellipse
      cx={0} cy={0} rx={size} ry={size * 0.95}
      fill={fill}
      stroke={stroke}
      strokeWidth={1.2}
      strokeDasharray={`${size * 0.8} ${size * 0.3} ${size * 1.2} ${size * 0.2}`}
      strokeLinecap="round"
    />
    {/* Inner circle */}
    <ellipse
      cx={0} cy={0} rx={size * 0.65} ry={size * 0.6}
      fill="none"
      stroke={stroke}
      strokeWidth={0.7}
      strokeDasharray={`${size * 0.5} ${size * 0.4}`}
      strokeLinecap="round"
      opacity={0.5}
    />
    {/* Dollar / currency mark */}
    <text
      x={0} y={size * 0.15}
      textAnchor="middle"
      fontSize={size * 0.55}
      fontFamily="'Georgia', serif"
      fill={stroke}
      opacity={0.4}
      style={{ fontStyle: 'italic' }}
    >
      $
    </text>
  </g>
)

/** Pencil-style vault/safe */
const SketchVault: React.FC<{
  x: number; y: number; size: number; stroke: string; fill: string
}> = ({ x, y, size, stroke, fill }) => (
  <g transform={`translate(${x}, ${y})`} className="sketch-element" style={{ opacity: 0.4 }}>
    {/* Main box – slightly imperfect rectangle */}
    <path
      d={`M${-size * 0.6},${-size * 0.7}
          L${size * 0.58},${-size * 0.72}
          L${size * 0.62},${size * 0.68}
          L${-size * 0.58},${size * 0.7} Z`}
      fill={fill}
      stroke={stroke}
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Vault wheel */}
    <circle
      cx={0} cy={0} r={size * 0.25}
      fill="none"
      stroke={stroke}
      strokeWidth={1}
      strokeDasharray={`${size * 0.3} ${size * 0.15}`}
      strokeLinecap="round"
    />
    {/* Wheel spokes */}
    <line x1={0} y1={-size * 0.25} x2={0} y2={size * 0.25}
      stroke={stroke} strokeWidth={0.7} strokeLinecap="round" opacity={0.6} />
    <line x1={-size * 0.22} y1={0} x2={size * 0.22} y2={0}
      stroke={stroke} strokeWidth={0.7} strokeLinecap="round" opacity={0.6} />
    <line x1={-size * 0.17} y1={-size * 0.17} x2={size * 0.17} y2={size * 0.17}
      stroke={stroke} strokeWidth={0.7} strokeLinecap="round" opacity={0.6} />
    {/* Handle */}
    <rect
      x={size * 0.32} y={-size * 0.1}
      width={size * 0.18} height={size * 0.2}
      rx={2}
      fill="none"
      stroke={stroke}
      strokeWidth={0.8}
      strokeLinecap="round"
      opacity={0.5}
    />
  </g>
)

/** Pencil-style shield */
const SketchShield: React.FC<{
  x: number; y: number; size: number; stroke: string; fill: string
}> = ({ x, y, size, stroke, fill }) => (
  <g transform={`translate(${x}, ${y})`} className="sketch-element" style={{ opacity: 0.35 }}>
    <path
      d={`M0,${-size * 0.8}
          C${size * 0.6},${-size * 0.75} ${size * 0.7},${-size * 0.3} ${size * 0.65},${size * 0.1}
          C${size * 0.55},${size * 0.5} ${size * 0.2},${size * 0.75} 0,${size * 0.85}
          C${-size * 0.2},${size * 0.75} ${-size * 0.55},${size * 0.5} ${-size * 0.65},${size * 0.1}
          C${-size * 0.7},${-size * 0.3} ${-size * 0.6},${-size * 0.75} 0,${-size * 0.8} Z`}
      fill={fill}
      stroke={stroke}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Checkmark inside */}
    <path
      d={`M${-size * 0.2},${size * 0.05}
          L${-size * 0.05},${size * 0.22}
          L${size * 0.22},${-size * 0.18}`}
      fill="none"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.6}
    />
  </g>
)

/** Pencil-style growth chart */
const SketchChart: React.FC<{
  x: number; y: number; size: number; stroke: string; strokeAlt: string
}> = ({ x, y, size, stroke, strokeAlt }) => (
  <g transform={`translate(${x}, ${y})`} className="sketch-element" style={{ opacity: 0.35 }}>
    {/* Axes */}
    <line x1={-size * 0.5} y1={size * 0.5} x2={size * 0.5} y2={size * 0.5}
      stroke={stroke} strokeWidth={1} strokeLinecap="round" />
    <line x1={-size * 0.5} y1={size * 0.5} x2={-size * 0.5} y2={-size * 0.5}
      stroke={stroke} strokeWidth={1} strokeLinecap="round" />
    {/* Bars */}
    {[-0.3, -0.1, 0.1, 0.3].map((xOff, i) => (
      <rect
        key={i}
        x={size * xOff - size * 0.06}
        y={size * (0.5 - 0.2 * (i + 1) * 0.7)}
        width={size * 0.12}
        height={size * 0.2 * (i + 1) * 0.7}
        fill="none"
        stroke={i % 2 === 0 ? stroke : strokeAlt}
        strokeWidth={0.8}
        strokeLinecap="round"
        rx={1}
        opacity={0.7}
      />
    ))}
    {/* Trend line */}
    <path
      d={`M${-size * 0.35},${size * 0.35}
          Q${-size * 0.1},${size * 0.15} ${size * 0.05},${size * 0.05}
          Q${size * 0.2},${-size * 0.05} ${size * 0.38},${-size * 0.3}`}
      fill="none"
      stroke={strokeAlt}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeDasharray="4 3"
      opacity={0.6}
    />
  </g>
)

/** Decorative pencil lines / flourishes */
const SketchFlourish: React.FC<{
  x: number; y: number; size: number; stroke: string; variant: number
}> = ({ x, y, size, stroke, variant }) => (
  <g transform={`translate(${x}, ${y})`} className="sketch-element" style={{ opacity: 0.2 }}>
    {variant === 0 && (
      // Gentle wave
      <path
        d={`M${-size},0 Q${-size * 0.5},${-size * 0.3} 0,0 Q${size * 0.5},${size * 0.3} ${size},0`}
        fill="none" stroke={stroke} strokeWidth={0.8} strokeLinecap="round"
      />
    )}
    {variant === 1 && (
      // Dotted arc
      <path
        d={`M${-size * 0.8},${size * 0.2} A${size} ${size} 0 0 1 ${size * 0.8},${size * 0.2}`}
        fill="none" stroke={stroke} strokeWidth={0.6} strokeLinecap="round"
        strokeDasharray="2 6"
      />
    )}
    {variant === 2 && (
      // Cross-hatching
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={-size * 0.4 + i * size * 0.2}
            y1={-size * 0.3}
            x2={-size * 0.2 + i * size * 0.2}
            y2={size * 0.3}
            stroke={stroke}
            strokeWidth={0.4}
            strokeLinecap="round"
            opacity={0.5}
          />
        ))}
      </>
    )}
  </g>
)

/* ─── MAIN COMPONENT ─── */
export const SketchScrollBackground: React.FC<{
  intensity?: 'full' | 'subtle' | 'minimal'
}> = ({ intensity = 'full' }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const pal = isDark ? SKETCH_PALETTE.dark : SKETCH_PALETTE.light
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number>()

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY)
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  const opacityMap = { full: 1, subtle: 0.6, minimal: 0.3 }
  const baseOpacity = opacityMap[intensity]

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: baseOpacity,
        overflow: 'hidden',
        willChange: 'transform',
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
        }}
      >
        <defs>
          {/* Pencil texture filter */}
          <filter id="pencil-texture" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
          </filter>

          {/* Subtle paper grain */}
          <filter id="paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="3" result="grain" />
            <feColorMatrix in="grain" type="saturate" values="0" result="bw" />
            <feBlend in="SourceGraphic" in2="bw" mode="multiply" />
          </filter>
        </defs>

        {/* Layer 1: Deep background – slow parallax */}
        <g
          filter="url(#pencil-texture)"
          style={{
            transform: `translateY(${scrollY * -0.02}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {/* Far coins */}
          <SketchCoin x={120} y={180} size={28} stroke={pal.strokeSoft} fill={pal.fill} delay={0} />
          <SketchCoin x={1320} y={250} size={22} stroke={pal.strokeSoft} fill={pal.fill} delay={0.3} />
          <SketchCoin x={80} y={680} size={18} stroke={pal.strokeSoft} fill={pal.fill} delay={0.6} />
          <SketchCoin x={1380} y={720} size={24} stroke={pal.strokeSoft} fill={pal.fill} delay={0.9} />

          {/* Flourishes – deep layer */}
          <SketchFlourish x={300} y={120} size={80} stroke={pal.strokeSoft} variant={1} />
          <SketchFlourish x={1100} y={800} size={100} stroke={pal.strokeSoft} variant={0} />
          <SketchFlourish x={200} y={750} size={60} stroke={pal.strokeSoft} variant={2} />
        </g>

        {/* Layer 2: Mid-ground – medium parallax */}
        <g
          filter="url(#pencil-texture)"
          style={{
            transform: `translateY(${scrollY * -0.05}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {/* Vault – right side, far from center */}
          <SketchVault x={1280} y={400} size={70} stroke={pal.stroke} fill={pal.fill} />

          {/* Shield – left side */}
          <SketchShield x={100} y={420} size={55} stroke={pal.stroke} fill={pal.fill} />

          {/* Coins – medium layer */}
          <SketchCoin x={1350} y={130} size={35} stroke={pal.stroke} fill={pal.fillGold} delay={0.2} />
          <SketchCoin x={60} y={350} size={30} stroke={pal.strokeAlt} fill={pal.fillGold} delay={0.5} />

          {/* Flourishes – mid layer */}
          <SketchFlourish x={700} y={850} size={120} stroke={pal.stroke} variant={0} />
          <SketchFlourish x={1350} y={600} size={70} stroke={pal.stroke} variant={1} />
        </g>

        {/* Layer 3: Foreground – faster parallax */}
        <g
          filter="url(#pencil-texture)"
          style={{
            transform: `translateY(${scrollY * -0.08}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {/* Chart – left bottom */}
          <SketchChart x={150} y={650} size={80} stroke={pal.stroke} strokeAlt={pal.strokeAlt} />

          {/* Large coin – right top */}
          <SketchCoin x={1300} y={100} size={45} stroke={pal.stroke} fill={pal.fillGold} delay={0} />

          {/* Shield – right bottom area */}
          {intensity === 'full' && (
            <SketchShield x={1320} y={700} size={40} stroke={pal.strokeAlt} fill={pal.fillGold} />
          )}

          {/* Small accent coins */}
          <SketchCoin x={50} y={150} size={16} stroke={pal.strokeAlt} fill={pal.fillGold} delay={0.4} />
          <SketchCoin x={1400} y={500} size={14} stroke={pal.stroke} fill={pal.fill} delay={0.7} />
        </g>

        {/* Layer 4: Corner decorations – no parallax, always visible */}
        <g filter="url(#pencil-texture)">
          {/* Top-left corner bracket */}
          <path
            d={`M30,80 L30,30 L80,30`}
            fill="none"
            stroke={pal.stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.15}
          />
          {/* Top-right corner bracket */}
          <path
            d={`M1360,30 L1410,30 L1410,80`}
            fill="none"
            stroke={pal.stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.15}
          />
          {/* Bottom-left corner bracket */}
          <path
            d={`M30,820 L30,870 L80,870`}
            fill="none"
            stroke={pal.stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.15}
          />
          {/* Bottom-right corner bracket */}
          <path
            d={`M1360,870 L1410,870 L1410,820`}
            fill="none"
            stroke={pal.stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.15}
          />
        </g>
      </svg>

      {/* CSS for sketch element drawing animation */}
      <style>{`
        .sketch-element {
          animation: sketchFadeIn 1.5s ease-out both;
        }

        @keyframes sketchFadeIn {
          from {
            opacity: 0;
            filter: blur(2px);
          }
          to {
            filter: blur(0px);
          }
        }

        @media (max-width: 768px) {
          .sketch-element {
            transform: scale(0.7);
          }
        }

        @media (max-width: 480px) {
          .sketch-element {
            transform: scale(0.5);
          }
        }
      `}</style>
    </div>
  )
}

export default SketchScrollBackground
