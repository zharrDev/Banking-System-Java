import React from 'react'

const S = {

  fill: 'none',

  stroke: 'currentColor',

  strokeWidth: 1.4,

  strokeLinecap: 'round',

  strokeLinejoin: 'round',

} as const

const F = {

  fill: 'currentColor',

  stroke: 'none',

}

export const HandDrawnIconCluster: React.FC<{ className?: string }> = ({ className = '' }) => {

  return (

  <div className={`relative ${className}`}>

  <svg className="h-full w-full" viewBox="0 0 400 400" fill="none" xmlns="<http://www.w3.org/2000/svg>">

  {/* Outer decorative circles */}

  <circle cx="200" cy="200" r="174" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" opacity="0.12" />

  <circle cx="200" cy="200" r="158" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.09" />

  <circle cx="200" cy="200" r="92" stroke="currentColor" strokeWidth="0.7" strokeDasharray="4 6" opacity="0.08" />

  {/* Decorative dots */}

  <circle cx="55" cy="100" r="2" fill="currentColor" opacity="0.12" />

  <circle cx="345" cy="85" r="2" fill="currentColor" opacity="0.1" />

  <circle cx="360" cy="285" r="2" fill="currentColor" opacity="0.12" />

  <circle cx="45" cy="300" r="2" fill="currentColor" opacity="0.1" />

  <circle cx="200" cy="28" r="2" fill="currentColor" opacity="0.12" />

  <circle cx="200" cy="372" r="2" fill="currentColor" opacity="0.1" />

  <circle cx="112" cy="52" r="1.5" fill="currentColor" opacity="0.1" />

  <circle cx="288" cy="52" r="1.5" fill="currentColor" opacity="0.1" />

  <circle cx="40" cy="200" r="1.5" fill="currentColor" opacity="0.1" />

  <circle cx="360" cy="200" r="1.5" fill="currentColor" opacity="0.1" />

  {/* Decorative sparkles */}

  <path d="M95 75L97 80L102 82L97 84L95 89L93 84L88 82L93 80L95 75Z" fill="currentColor" opacity="0.12" />

  <path d="M305 65L307 70L312 72L307 74L305 79L303 74L298 72L303 70L305 65Z" fill="currentColor" opacity="0.1" />

  <path d="M320 335L322 340L327 342L322 344L320 349L318 344L313 342L318 340L320 335Z" fill="currentColor" opacity="0.12" />

  <path d="M80 325L82 330L87 332L82 334L80 339L78 334L73 332L78 330L80 325Z" fill="currentColor" opacity="0.1" />

  <path d="M200 390L202 395L207 397L202 399L200 404L198 399L193 397L198 395L200 390Z" fill="currentColor" opacity="0.1" />

  <path d="M200 10L202 15L207 17L202 19L200 24L198 19L193 17L198 15L200 10Z" fill="currentColor" opacity="0.12" />

  {/* Zigzag decorative lines */}

  <path d="M70 145L80 150L70 155L80 160" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.1" />

  <path d="M330 135L320 140L330 145L320 150" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.1" />

  <path d="M330 265L320 270L330 275L320 280" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.1" />

  <path d="M70 260L80 265L70 270L80 275" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.1" />

  {/* Plus signs */}

  <path d="M130 55V65M125 60H135" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.11" />

  <path d="M270 55V65M265 60H275" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.11" />

  <path d="M130 345V355M125 350H135" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.11" />

  <path d="M270 345V355M265 350H275" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.11" />

  {/* === BANK (top) === */}

  <g transform="translate(200, 62)">

  <g {...S}>

  <path d="M-24 8L0 -6L24 8H-24Z" />

  <path d="M-20 8V30H20V8" />

  <path d="M-9 12V30" />

  <path d="M0 12V30" />

  <path d="M9 12V30" />

  <circle cx="0" cy="-12" r="3.5" />

  </g>

  </g>

  {/* === CREDIT CARD (upper right 1) === */}

  <g transform="translate(274, 92) rotate(22)">

  <g {...S}>

  <rect x="-24" y="-15" width="48" height="30" rx="4" />

  <path d="M-24 -1H24" />

  <path d="M-16 10H-4" />

  <circle cx="14" cy="10" r="2.5" />

  </g>

  </g>

  {/* === WALLET (upper right 2) === */}

  <g transform="translate(326, 148) rotate(45)">

  <g {...S}>

  <path d="M-24 -15H24C27 -15 29 -13 29 -10V10C29 13 27 15 24 15H-24C-27 15 -29 13 -29 10V-10C-29 -13 -27 -15 -24 -15Z" />

  <path d="M14 -6H24C27 -6 29 -4 29 -1V5C29 8 27 10 24 10H14" />

  <circle cx="24" cy="2" r="2" />

  </g>

  </g>

  {/* === COINS (right) === */}

  <g transform="translate(340, 214) rotate(72)">

  <g {...S}>

  <ellipse cx="-7" cy="9" rx="15" ry="9" />

  <path d="M-22 9V16C-22 21 -13 26 -7 26C-1 26 8 21 8 16V9" />

  <ellipse cx="16" cy="-2" rx="12" ry="7" />

  <path d="M4 -2V5C4 9 11 13 16 13C21 13 28 9 28 5V-2" />

  <path d="M16 -6V6" />

  </g>

  </g>

  {/* === PIGGY (lower right 1) === */}

  <g transform="translate(320, 276) rotate(100)">

  <g {...S}>

  <path d="M-18 -7C-18 -16 -9 -22 2 -22C11 -22 18 -16 18 -7V9C18 13 14 18 7 18H-9C-16 18 -18 13 -18 9V-7Z" />

  <circle cx="-7" cy="-9" r="2.5" />

  <path d="M15 -2H19C22 -2 24 0 24 3V7C24 10 22 12 19 12H15" />

  <path d="M-13 -14L-18 -18" />

  <path d="M-19 7H-23C-26 7 -28 5 -28 2V-2C-28 -5 -26 -7 -23 -7H-19" />

  </g>

  </g>

  {/* === SHIELD (bottom right) === */}

  <g transform="translate(268, 318) rotate(124)">

  <g {...S}>

  <path d="M0 -24L20 -13V9C20 20 9 30 0 35C-9 30 -20 20 -20 9V-13L0 -24Z" />

  <path d="M-9 2L0 11L14 -7" />

  </g>

  </g>

  {/* === LOCK (bottom) === */}

  <g transform="translate(200, 338)">

  <g {...S}>

  <rect x="-18" y="-8" width="36" height="30" rx="4" />

  <path d="M-11 -8V-19C-11 -25 -6 -30 0 -30C6 -30 11 -25 11 -19V-8" />

  <circle cx="0" cy="8" r="3" />

  <path d="M0 12V17" />

  </g>

  </g>

  {/* === CHART (bottom left 1) === */}

  <g transform="translate(132, 318) rotate(-124)">

  <g {...S}>

  <path d="M-20 14V-14" />

  <path d="M-20 14H20" />

  <path d="M-12 8L-2 -8L8 0L18 -18" />

  <circle cx="-2" cy="-8" r="1.5" />

  <circle cx="8" cy="0" r="1.5" />

  <circle cx="18" cy="-18" r="1.5" />

  </g>

  </g>

  {/* === KEY (lower left 2) === */}

  <g transform="translate(80, 276) rotate(-100)">

  <g {...S}>

  <circle cx="-8" cy="-6" r="9" />

  <path d="M-2 -2L16 16" />

  <path d="M16 16L20 12" />

  <path d="M20 12L24 16" />

  </g>

  </g>

  {/* === DATABASE (lower left 1) === */}

  <g transform="translate(60, 214) rotate(-72)">

  <g {...S}>

  <ellipse cx="0" cy="-16" rx="19" ry="8" />

  <path d="M-19 -16V10C-19 16 -9 21 0 21C9 21 19 16 19 10V-16" />

  <path d="M-19 -4C-19 2 -9 7 0 7C9 7 19 2 19 -4" />

  </g>

  </g>

  {/* === BLOCKS (left) === */}

  <g transform="translate(74, 148) rotate(-45)">

  <g {...S}>

  <path d="M-14 -16L0 -22L14 -16L0 -10L-14 -16Z" />

  <path d="M-14 -16V-2L0 4V-10" />

  <path d="M14 -16V-2L0 4" />

  <path d="M0 4V22" />

  <path d="M-14 16L0 22L14 16" />

  </g>

  </g>

  {/* === MONEY (upper left 2) === */}

  <g transform="translate(126, 92) rotate(-22)">

  <g {...S}>

  <rect x="-26" y="-13" width="52" height="26" rx="3" />

  <circle cx="0" cy="0" r="5" />

  <path d="M-22 -9H-18" />

  <path d="M18 9H22" />

  </g>

  </g>

  {/* === TARGET (upper left 1) === */}

  <g transform="translate(156, 68) rotate(-8)">

  <g {...S}>

  <circle cx="0" cy="0" r="20" />

  <circle cx="0" cy="0" r="12" />

  <circle cx="0" cy="0" r="4" />

  <path d="M0 -24V-20" />

  <path d="M0 20V24" />

  <path d="M-24 0H-20" />

  <path d="M20 0H24" />

  </g>

  </g>

  {/* === GEAR (upper right 1) === */}

  <g transform="translate(244, 68) rotate(8)">

  <g {...S}>

  <circle cx="0" cy="0" r="9" />

  <path d="M0 -20V-14M0 14V20M-20 0H-14M14 0H20M-14 -14L-10 -10M10 10L14 14M-14 14L-10 10M10 -10L14 -14" />

  </g>

  </g>

  {/* === USER (left side) === */}

  <g transform="translate(52, 200) rotate(-90)">

  <g {...S}>

  <circle cx="0" cy="-8" r="10" />

  <path d="M-18 22C-18 8 -7 0 0 0C7 0 18 8 18 22" />

  </g>

  </g>

  {/* === ARROW UP (right side) === */}

  <g transform="translate(348, 200) rotate(90)">

  <g {...S}>

  <path d="M0 18V-18" />

  <path d="M-12 6L0 -6L12 6" />

  </g>

  </g>

  {/* === PHONE (inner right) === */}

  <g transform="translate(236, 156)">

  <g {...S}>

  <rect x="-10" y="-18" width="20" height="36" rx="4" />

  <path d="M-8 -14H8" />

  <circle cx="0" cy="12" r="2" />

  <path d="M-6 -4H6" />

  <path d="M-6 2H4" />

  </g>

  </g>

  {/* === DOCUMENT (inner left) === */}

  <g transform="translate(164, 156)">

  <g {...S}>

  <path d="M-12 -18H12C14 -18 16 -16 16 -14V18C16 20 14 22 12 22H-12C-14 22 -16 20 -16 18V-14C-16 -16 -14 -18 -12 -18Z" />

  <path d="M-10 -10H10" />

  <path d="M-10 -2H10" />

  <path d="M-10 6H6" />

  <path d="M-10 14H4" />

  </g>

  </g>

  {/* === SMALL COINS (inner bottom) === */}

  <g transform="translate(200, 248)">

  <g {...S}>

  <ellipse cx="-8" cy="6" rx="9" ry="5" />

  <path d="M-17 6V10C-17 13 -11 16 -8 16C-5 16 1 13 1 10V6" />

  <ellipse cx="8" cy="0" rx="7" ry="4" />

  <path d="M1 0V4C1 7 5 9 8 9C11 9 15 7 15 4V0" />

  </g>

  </g>

  {/* === STAR BURST (inner top) === */}

  <g transform="translate(200, 132)">

  <path d="M0 -10L2 -3L9 -3L3 2L5 9L0 5L-5 9L-3 2L-9 -3L-2 -3Z" fill="currentColor" opacity="0.16" />

  </g>

  {/* Small mini icons in outer gaps */}

  {/* Mini star upper right gap */}

  <g transform="translate(298, 62)">

  <path d="M0 -6L1.5 -2L6 -2L2.5 1L3.5 6L0 3.5L-3.5 6L-2.5 1L-6 -2L-1.5 -2Z" fill="currentColor" opacity="0.14" />

  </g>

  {/* Mini star lower right gap */}

  <g transform="translate(298, 338)">

  <path d="M0 -6L1.5 -2L6 -2L2.5 1L3.5 6L0 3.5L-3.5 6L-2.5 1L-6 -2L-1.5 -2Z" fill="currentColor" opacity="0.14" />

  </g>

  {/* Mini star lower left gap */}

  <g transform="translate(102, 338)">

  <path d="M0 -6L1.5 -2L6 -2L2.5 1L3.5 6L0 3.5L-3.5 6L-2.5 1L-6 -2L-1.5 -2Z" fill="currentColor" opacity="0.14" />

  </g>

  {/* Mini star upper left gap */}

  <g transform="translate(102, 62)">

  <path d="M0 -6L1.5 -2L6 -2L2.5 1L3.5 6L0 3.5L-3.5 6L-2.5 1L-6 -2L-1.5 -2Z" fill="currentColor" opacity="0.14" />

  </g>

  {/* Small circular dots ring */}

  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {

  const rad = (angle * Math.PI) / 180

  const x = 200 + 142 * Math.cos(rad)

  const y = 200 - 142 * Math.sin(rad)

  return <circle key={i} cx={x} cy={y} r="1.5" fill="currentColor" opacity="0.1" />

  })}

  {/* Curved connecting arcs */}

  <path d="M120 120Q200 60 280 120" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 5" fill="none" opacity="0.08" />

  <path d="M280 120Q340 200 280 280" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 5" fill="none" opacity="0.08" />

  <path d="M280 280Q200 340 120 280" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 5" fill="none" opacity="0.08" />

  <path d="M120 280Q60 200 120 120" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 5" fill="none" opacity="0.08" />

  </svg>

  </div>

  )

}