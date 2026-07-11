import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Shield, Landmark, Zap, Star, TrendingUp,
  CreditCard, Sparkles, Target, Globe, Lock,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'

const trustPhrases = [
  { icon: Star, text: 'Trusted by 2,000+ customers' },
  { icon: Shield, text: 'Bank-grade security guaranteed' },
  { icon: Zap, text: 'Real-time transaction processing' },
  { icon: TrendingUp, text: '$50M+ transactions processed' },
  { icon: Globe, text: 'Available in 12+ countries' },
  { icon: Target, text: '99.9% uptime guaranteed' },
]

const chartData = [
  { month: 'Jan', balance: 4200, inflow: 3100 },
  { month: 'Feb', balance: 5800, inflow: 3800 },
  { month: 'Mar', balance: 4900, inflow: 3400 },
  { month: 'Apr', balance: 7200, inflow: 4600 },
  { month: 'May', balance: 6100, inflow: 4100 },
  { month: 'Jun', balance: 8900, inflow: 5200 },
  { month: 'Jul', balance: 7800, inflow: 4800 },
  { month: 'Aug', balance: 9400, inflow: 5600 },
  { month: 'Sep', balance: 10200, inflow: 6100 },
  { month: 'Oct', balance: 9800, inflow: 5900 },
  { month: 'Nov', balance: 11500, inflow: 6800 },
  { month: 'Dec', balance: 12800, inflow: 7400 },
]

const transactions = [
  { name: 'Subscription', amount: '-$29.99', color: 'text-rose-400' },
  { name: 'Salary Deposit', amount: '+$4,250', color: 'text-emerald-400' },
  { name: 'Transfer', amount: '-$150.00', color: 'text-rose-400' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-amber-500/20 bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl px-3 py-2 shadow-xl shadow-amber-500/5">
      <p className="text-[10px] font-semibold text-slate-500 dark:text-zinc-400 mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-[11px] font-bold" style={{ color: entry.color }}>
          ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export const HeroSection: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setPhraseIndex(prev => (prev + 1) % trustPhrases.length)
        setIsAnimating(false)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return

    const particles: HTMLDivElement[] = []
    for (let i = 0; i < 25; i++) {
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

    return () => { particles.forEach(p => p.remove()) }
  }, [])

  const CurrentIcon = trustPhrases[phraseIndex].icon

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:px-8 lg:px-12 lg:pt-32 lg:pb-36">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/[0.03] blur-[150px] animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.02] blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/[0.02] blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            {/* Cycling Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-8 hover:border-amber-500/40 transition-all duration-300 group cursor-default overflow-hidden min-w-[320px]">
              <span className={`transition-all duration-400 ease-in-out ${isAnimating ? 'opacity-0 -translate-y-3 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
                <CurrentIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400 inline-block mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {trustPhrases[phraseIndex].text}
              </span>
              <Sparkles className="h-3 w-3 text-amber-400 ml-1 shrink-0" />
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white">
              Banking made{' '}
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-300/20 blur-2xl" />
                <span className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                  beautifully
                </span>
              </span>{' '}
              simple.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-500 dark:text-zinc-400 sm:text-xl">
              Experience premium digital banking with real-time transaction monitoring,
              seamless transfers, and an elegant dashboard designed for clarity and control.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register" className="nd-btn px-8 py-4 text-base shadow-glow-amber group">
                Open Free Account
                <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link to="/login" className="nd-btn-outline px-8 py-4 text-base">
                Sign In
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-slate-400 dark:text-zinc-500">
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all duration-300">
                  <Shield className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-slate-500 dark:text-zinc-400">Bank-grade security</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-1.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-all duration-300">
                  <Zap className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-slate-500 dark:text-zinc-400">Real-time updates</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-slate-500 dark:text-zinc-400">2,000+ active users</span>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview with Real Chart */}
          <div className="relative animate-slide-in-right">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="nd-orbit-glow relative rounded-[32px] overflow-hidden border border-amber-500/10 shadow-2xl shadow-amber-500/5 hover:shadow-amber-500/20 transition-shadow duration-500">
                <div className="aspect-[4/3] bg-gradient-to-br from-white via-slate-100 to-white dark:from-nd-card dark:via-nd-navy/50 dark:to-nd-card relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(30,58,95,0.2),transparent_50%)]" />
                  <div className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNTllMGIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMGg0VjRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />

                  {/* Mock Dashboard Content */}
                  <div className="relative z-10 w-full max-w-sm px-5 py-5 space-y-3">
                    {/* Top Stat Cards */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] p-3 hover:border-amber-500/30 transition-colors duration-300">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1">Balance</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">$12,840</p>
                      </div>
                      <div className="rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] p-3 hover:border-emerald-500/30 transition-colors duration-300">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1">Income</p>
                        <p className="text-sm font-bold text-emerald-400">+$7,400</p>
                      </div>
                    </div>

                    {/* Real Area Chart */}
                    <div className="rounded-2xl bg-slate-100/50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06] p-3 hover:border-amber-500/20 transition-colors duration-300">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Portfolio Growth</p>
                        <p className="text-[9px] font-bold text-amber-400">+24.8%</p>
                      </div>
                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
                            <defs>
                              <linearGradient id="heroBalanceGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                                <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.08} />
                                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="heroInflowGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#34d399" stopOpacity={0.2} />
                                <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" hide />
                            <YAxis hide domain={['dataMin - 500', 'dataMax + 500']} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="balance"
                              stroke="#f59e0b"
                              strokeWidth={2}
                              fill="url(#heroBalanceGrad)"
                              animationDuration={2000}
                              animationEasing="ease-out"
                            />
                            <Area
                              type="monotone"
                              dataKey="inflow"
                              stroke="#34d399"
                              strokeWidth={1.5}
                              strokeDasharray="4 4"
                              fill="url(#heroInflowGrad)"
                              animationDuration={2000}
                              animationEasing="ease-out"
                              animationBegin={500}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Transaction List */}
                    <div className="space-y-1.5">
                      {transactions.map((tx, i) => (
                        <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors duration-300">
                          <div className="h-7 w-7 rounded-lg bg-slate-200 dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                            {i === 0 ? <CreditCard className="h-3.5 w-3.5 text-rose-400" /> :
                             i === 1 ? <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> :
                             <Landmark className="h-3.5 w-3.5 text-blue-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-semibold text-slate-700 dark:text-zinc-300 truncate">{tx.name}</p>
                          </div>
                          <p className={`text-[10px] font-bold ${tx.color}`}>{tx.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Badge - repositioned bottom-right to avoid blocking chart */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-xl bg-white/90 dark:bg-nd-card/90 backdrop-blur-xl border border-amber-500/20 px-3 py-2 shadow-xl shadow-amber-500/10 animate-float">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/30 blur-md rounded-full animate-pulse" />
                    <Landmark className="relative h-3 w-3 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-900 dark:text-white">Premium Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
