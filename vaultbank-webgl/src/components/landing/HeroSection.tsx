import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Landmark, Zap, Star, TrendingUp, CreditCard, Sparkles, Target, Globe, Lock } from 'lucide-react'

export const HeroSection: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return

    const particleCount = 25
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      const size = Math.random() * 5 + 1.5
      const isGold = Math.random() > 0.55
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${isGold ? 'var(--nd-accent)' : 'var(--nd-navy)'};
        border-radius: 50%;
        opacity: ${Math.random() * 0.35 + 0.08};
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: float ${Math.random() * 12 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: ${isGold ? '0 0 15px var(--nd-glow)' : 'none'};
        pointer-events: none;
      `
      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:px-8 lg:px-12 lg:pt-32 lg:pb-36">
      {/* Particle Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Glow Orbs - Dark/Light adaptive */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/[0.03] blur-[150px] animate-pulse dark:bg-amber-500/[0.04]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.02] blur-[120px] animate-pulse dark:bg-blue-500/[0.03]" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/[0.02] blur-[100px] animate-pulse dark:bg-emerald-500/[0.03]" style={{ animationDelay: '4s' }} />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-8 hover:border-amber-500/40 transition-all duration-300 group cursor-default">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              Trusted by 2,000+ customers
              <Sparkles className="h-3 w-3 text-amber-400 ml-1" />
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl text-white dark:text-white">
              Banking made{' '}
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-300/20 blur-2xl" />
                <span className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                  beautifully
                </span>
              </span>{' '}
              simple.
            </h1>
            
            {/* Subheadline */}
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl dark:text-zinc-300">
              Experience premium digital banking with real-time transaction monitoring,
              seamless transfers, and an elegant dashboard designed for clarity and control.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register" className="nd-btn px-8 py-4 text-base shadow-glow-amber group">
                Open Free Account 
                <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link to="/login" className="nd-btn-outline px-8 py-4 text-base">
                Sign In
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all duration-300 dark:bg-emerald-500/10 dark:group-hover:bg-emerald-500/20">
                  <Shield className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-zinc-400 dark:text-zinc-300">Bank-grade security</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-1.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-all duration-300 dark:bg-amber-500/10 dark:group-hover:bg-amber-500/20">
                  <Zap className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-zinc-400 dark:text-zinc-300">Real-time updates</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300 dark:bg-blue-500/10 dark:group-hover:bg-blue-500/20">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-zinc-400 dark:text-zinc-300">2,000+ active users</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-1.5 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-300 dark:bg-purple-500/10 dark:group-hover:bg-purple-500/20">
                  <Globe className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-zinc-400 dark:text-zinc-300">Global access</span>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="relative animate-slide-in-right">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Dashboard Mockup Card */}
              <div className="relative rounded-[32px] overflow-hidden border border-amber-500/10 shadow-2xl shadow-amber-500/5 hover:shadow-amber-500/20 transition-shadow duration-500 dark:border-amber-500/15">
                <div className="aspect-[4/3] bg-gradient-to-br from-nd-card via-nd-navy/50 to-nd-card flex items-center justify-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.12),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(30,58,95,0.2),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(30,58,95,0.3),transparent_50%)]" />
                  <div className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNTllMGIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMGg0VjRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
                  
                  {/* Mock Dashboard Content */}
                  <div className="relative z-10 w-full max-w-sm px-6 space-y-4">
                    {/* Top Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/[0.05] border border-white/[0.08] p-4 hover:border-amber-500/30 transition-colors duration-300 dark:bg-white/[0.03] dark:border-white/[0.05] dark:hover:border-amber-500/30">
                        <div className="h-2 w-12 rounded bg-zinc-700 mb-2 dark:bg-zinc-600" />
                        <div className="h-5 w-20 rounded bg-gradient-to-r from-zinc-600 to-zinc-500" />
                      </div>
                      <div className="rounded-2xl bg-white/[0.05] border border-white/[0.08] p-4 hover:border-amber-500/30 transition-colors duration-300 dark:bg-white/[0.03] dark:border-white/[0.05] dark:hover:border-amber-500/30">
                        <div className="h-2 w-12 rounded bg-zinc-700 mb-2 dark:bg-zinc-600" />
                        <div className="h-5 w-16 rounded bg-gradient-to-r from-zinc-600 to-zinc-500" />
                      </div>
                    </div>
                    
                    {/* Chart Area */}
                    <div className="rounded-2xl bg-white/[0.05] border border-white/[0.08] p-4 hover:border-amber-500/30 transition-colors duration-300 dark:bg-white/[0.03] dark:border-white/[0.05] dark:hover:border-amber-500/30">
                      <div className="flex justify-between items-center mb-3">
                        <div className="h-2 w-20 rounded bg-zinc-700 dark:bg-zinc-600" />
                        <div className="h-2 w-12 rounded bg-zinc-700 dark:bg-zinc-600" />
                      </div>
                      <div className="flex items-end gap-2 h-20">
                        {[4,7,5,8,6,9,7,6,8].map((h, i) => (
                          <div 
                            key={i} 
                            className="flex-1 rounded-t bg-gradient-to-t from-amber-600 to-amber-400 transition-all duration-500 hover:opacity-80" 
                            style={{ 
                              height: `${h * 7}%`,
                              animationDelay: `${i * 0.1}s`,
                              animation: 'fadeInUp 0.8s ease-out forwards',
                              opacity: 0
                            }} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Transaction List */}
                    <div className="space-y-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.05] transition-colors duration-300 dark:hover:bg-white/[0.03]">
                          <div className="h-8 w-8 rounded-lg bg-white/[0.08] animate-pulse dark:bg-white/[0.04]" />
                          <div className="flex-1">
                            <div className="h-2 w-3/4 rounded bg-zinc-700 dark:bg-zinc-600" />
                            <div className="h-1.5 w-1/2 rounded bg-zinc-700/50 mt-1 dark:bg-zinc-600/50" />
                          </div>
                          <div className="h-3 w-16 rounded bg-zinc-700 dark:bg-zinc-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-2xl bg-nd-card/90 backdrop-blur-xl border border-amber-500/20 px-4 py-2.5 shadow-xl shadow-amber-500/10 animate-float dark:bg-nd-card/95 dark:border-amber-500/30">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/30 blur-md rounded-full animate-pulse" />
                    <Landmark className="relative h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-sm font-bold text-white dark:text-white">Premium Dashboard</span>
                </div>
              </div>
            </div>
            
            {/* Feature Highlights around dashboard */}
            <div className="absolute -top-6 -right-6 hidden lg:block">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-nd-card/80 backdrop-blur-xl border border-white/5 shadow-xl dark:border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="p-2 rounded-xl bg-emerald-500/10">
                    <Target className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300 dark:text-zinc-200">Smart Goals</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-nd-card/80 backdrop-blur-xl border border-white/5 shadow-xl dark:border-white/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="p-2 rounded-xl bg-blue-500/10">
                    <Lock className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300 dark:text-zinc-200">Secure Vault</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}