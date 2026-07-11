import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Sparkles, Rocket, Shield, Zap, CheckCircle } from 'lucide-react'

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-32 lg:py-40 px-6 sm:px-8 lg:px-12 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/[0.06] blur-[120px] animate-pulse dark:bg-amber-500/[0.08]" />
        <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/[0.03] blur-[100px] animate-pulse dark:bg-blue-500/[0.04]" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/4 h-[250px] w-[250px] rounded-full bg-emerald-500/[0.02] blur-[100px] animate-pulse dark:bg-emerald-500/[0.03]" style={{ animationDelay: '4s' }} />
      </div>

      <div className="mx-auto max-w-3xl relative z-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-8 hover:border-amber-500/40 transition-all duration-300 group dark:border-amber-500/20 dark:bg-amber-500/10">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
          Get Started Today
          <Sparkles className="h-3 w-3 text-amber-400" />
        </div>

        <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl mb-6 tracking-tight text-white dark:text-white">
          Ready to take control of{' '}
          <span className="relative">
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-300/20 blur-2xl" />
            <span className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
              your finances
            </span>
          </span>
          ?
        </h2>

        <p className="text-lg text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed dark:text-zinc-300">
          Join thousands of users who trust VaultBank for their daily banking needs. 
          Setup takes less than 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/register" 
            className="nd-btn px-10 py-4 text-lg w-full sm:w-auto shadow-glow-amber group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Get Started Now 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          </Link>
          
          <Link 
            to="/login" 
            className="nd-btn-outline px-10 py-4 text-lg w-full sm:w-auto group"
          >
            <span className="flex items-center">
              Sign In to Dashboard
              <Rocket className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Free to start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>24/7 support</span>
          </div>
        </div>

        {/* Security Badges Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          {[
            { icon: Shield, text: "AES-256 Encryption", color: "text-emerald-400" },
            { icon: Zap, text: "Real-time Alerts", color: "text-amber-400" },
            { icon: CheckCircle, text: "FDIC Insured", color: "text-blue-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}