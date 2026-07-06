import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Menu, MoonStar, SunMedium, X } from 'lucide-react'
import { useTheme } from '@/theme/ThemeProvider'
import { navLinks } from '@/constants/landing'
import { BackgroundModeToggle } from '@/components/ui/BackgroundModeToggle'

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-line-soft bg-surface-1/80 backdrop-blur-xl" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-20 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500 shadow-lg">
            <Landmark className="h-6 w-6 text-navy-900" />
          </div>
          <span className="text-xl font-bold tracking-tight">VaultBank <span className="text-[10px] ml-1 px-1.5 py-0.5 rounded bg-gold-100 text-gold-700 font-black">3D</span></span>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-bold text-ink-secondary hover:text-ink-primary transition-colors">
              {link.label}
            </a>
          ))}
          <div className="h-4 w-px bg-line-soft" />
          {/* === BACKGROUND MODE TOGGLE – BARU v4 === */}
          <BackgroundModeToggle />
          <div className="h-4 w-px bg-line-soft" />
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-soft hover:bg-surface-2 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunMedium className="h-4 w-4 text-gold-500" /> : <MoonStar className="h-4 w-4" />}
          </button>
          <Link to="/login" className="text-sm font-bold text-ink-primary">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-line-soft">
          {mobileMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-line-soft bg-surface-1 px-6 py-6 md:hidden">
          <div className="mb-4"><BackgroundModeToggle /></div>
          <div className="flex flex-col gap-4">
            {navLinks.map(l => <a key={l.href} href={l.href} onClick={()=>setMobileMenuOpen(false)} className="text-lg font-bold">{l.label}</a>)}
            <Link to="/login" className="btn-secondary justify-center">Login</Link>
            <Link to="/register" className="btn-primary justify-center">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
