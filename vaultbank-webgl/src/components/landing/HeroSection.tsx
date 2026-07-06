import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react'
import { RoughUnderline } from '@/components/rough/RoughUnderline'
import { HandDrawnIconCluster } from '@/components/illustrations/HandDrawnIconCluster'
import { DoodleSparkle, DoodleCircle, DoodleZigzag, DoodleCross, DoodleDots } from '@/components/illustrations/DoodleDecorations'
import { Hero3D } from '@/components/three/Hero3D'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-28 sm:px-8 lg:px-12 lg:pt-32 lg:pb-36" aria-labelledby="hero-heading">
      {/* === WEBGL 3D HERO LAYER (tambahan) === */}
      {/* Canvas 3D tipis di belakang hero, tidak mengganggu tombol/form */}
      <div className="absolute inset-0 opacity-[0.92] pointer-events-none">
        <Hero3D intensity="subtle" />
      </div>

      <DoodleSparkle className="absolute top-16 left-[8%] h-5 w-5 text-gold-500 animate-float" />
      <DoodleSparkle className="absolute top-28 right-[12%] h-4 w-4 text-pale-green-400 animate-float" />
      <DoodleCircle className="absolute top-32 left-[4%] h-12 w-12 text-navy-300 animate-wiggle" />
      <DoodleCircle className="absolute bottom-16 right-[6%] h-16 w-16 text-gold-300 animate-wiggle" />
      <DoodleZigzag className="absolute top-20 right-[20%] w-16 text-navy-200 hidden sm:block" />
      <DoodleCross className="absolute bottom-32 left-[25%] h-4 w-4 text-gold-400" />
      <DoodleDots className="absolute top-40 left-[20%] hidden lg:block text-navy-300" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="animate-slideInLeft">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50/85 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-700 shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse" /> Smart Banking • WebGL 3D
            </div>
            <h1 id="hero-heading" className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl webgl-overlay-text">
              Banking made <br />
              <RoughUnderline stroke="var(--color-gold-500)" strokeWidth={3.5} className="inline-block">
                <span className="text-gold-500">beautifully</span>
              </RoughUnderline>{' '} simple.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-secondary sm:text-xl">
              Check balances, monitor transaction history, dan transfer dalam workspace premium dengan latar belakang <b>WebGL 3D interaktif</b>.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary px-8 py-4 text-lg">Open Free Account <ArrowRight className="ml-2 h-5 w-5" /></Link>
              <Link to="/login" className="btn-secondary px-8 py-4 text-lg">Sign In</Link>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {['A','B','C','D'].map((l,i)=><div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-navy-100 flex items-center justify-center text-xs font-bold text-navy-800">{l}</div>)}
              </div>
              <p className="text-sm font-medium text-ink-muted">Joined by <span className="font-bold text-ink-primary">2,000+</span> active users</p>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center animate-slideInRight">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] bg-gold-500/10 rounded-full blur-[100px]" />
            <div className="relative z-10 w-full max-w-[480px] glass-panel rounded-[36px] p-6">
              <HandDrawnIconCluster className="h-auto w-full" />
            </div>
            <div className="absolute top-8 right-4 z-20">
              <div className="flex items-center gap-2 rounded-2xl glass-panel px-3 py-2 shadow-lg">
                <ShieldCheck className="h-4 w-4 text-pale-green-500" />
                <span className="text-xs font-bold">WebGL Encrypted</span>
              </div>
            </div>
            <div className="absolute bottom-12 left-0 z-20">
              <div className="flex items-center gap-2 rounded-2xl glass-panel px-3 py-2 shadow-lg">
                <TrendingUp className="h-4 w-4 text-gold-500" />
                <span className="text-xs font-bold">Real-time 3D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
