import React from 'react'

import { Landmark } from 'lucide-react'

import { footerLinks } from '@/constants/landing'

export const Footer: React.FC = () => {

  return (

  <footer className="py-12 border-t border-line-soft px-6 sm:px-8 lg:px-12" role="contentinfo">

  <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">

  <div className="flex items-center gap-3">

  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 transition-transform duration-300 hover:rotate-6" aria-hidden="true">

  <Landmark className="h-5 w-5 text-navy-900" />

  </div>

  <span className="text-lg font-bold tracking-tight">VaultBank</span>

  </div>

  <p className="text-sm text-ink-muted">© {new Date().getFullYear()} VaultBank. Built for the modern web.</p>

  <div className="flex items-center gap-6">

  {footerLinks.map((link) => (

  <a

  key={link.label}

  href={link.href}

  className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink-primary transition-colors"

  >

  {link.label}

  </a>

  ))}

  </div>

  </div>

  </footer>

  )

}