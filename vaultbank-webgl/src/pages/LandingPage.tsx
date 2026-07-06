/**
 * LandingPage.tsx – VaultBank Landing (Redesigned v5)
 *
 * PERUBAHAN UTAMA:
 *  - Z-index layering yang benar: bg → sketch → content
 *  - Background switcher pakai AdaptiveBackground (cleaner)
 *  - Tidak ada opacity conflict / tabrakan visual
 *  - Badge mode lebih elegant dengan Teal & Cream palette
 *  - LOGIKA BISNIS TETAP 0% BERUBAH
 *
 * Z-LAYER MAP:
 *  z-0   : WebGLBackground (fixed, canvas)
 *  z-1   : SketchScrollBackground (fixed, SVG)
 *  z-10  : Content wrapper (relative)
 *  z-50  : Navigation (sticky/fixed)
 *  z-60  : Mode badge (fixed, desktop only)
 */

import React from 'react'
import { Navigation } from '@/components/landing/Navigation'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { SecuritySection } from '@/components/landing/SecuritySection'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'
import { AdaptiveBackground } from '@/components/three/AdaptiveBackground'
import { useBackgroundMode } from '@/theme/BackgroundModeContext'

export const LandingPage: React.FC = () => {
  const { bgMode } = useBackgroundMode()

  return (
    <div className="min-h-screen text-ink-primary relative overflow-hidden">

      {/* ═══ BACKGROUND LAYER ═══
          AdaptiveBackground handles all 3 modes internally.
          No more manual conditional rendering here. */}
      <AdaptiveBackground intensity="hero" />

      {/* ═══ CONTENT LAYER ═══
          z-10 ensures content always sits above backgrounds.
          'relative' is key — without it, fixed bg would overlap. */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <HeroSection />
          <FeaturesSection />
          <SecuritySection />
          <CTASection />
        </main>
        <Footer />
      </div>

      {/* ═══ MODE BADGE ═══
          Subtle indicator for dev/demo — hidden on mobile.
          Uses glass effect consistent with VaultBank design. */}
      <div className="fixed bottom-4 right-4 z-[60] hidden md:block pointer-events-none">
        <div
          className="rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] shadow-sm"
          style={{
            background: 'rgba(255,248,240,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(13,148,136,0.15)',
            color: '#0F766E',
          }}
        >
          <span style={{ opacity: 0.5 }}>bg:</span>{' '}
          <span style={{ fontWeight: 700 }}>{bgMode}</span>{' '}
          <span style={{ opacity: 0.4 }}>• 3D ready</span>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
