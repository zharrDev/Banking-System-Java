import React from 'react'

import { Link } from 'react-router-dom'

import { ArrowRight } from 'lucide-react'

import { RoughUnderline } from '@/components/rough/RoughUnderline'

import { DoodleSparkle, DoodleCircle, DoodleCross, DoodleDots } from '@/components/illustrations/DoodleDecorations'

export const CTASection: React.FC = () => {

  return (

  <section className="relative py-32 lg:py-36 px-6 text-center sm:px-8 lg:px-12 overflow-hidden" aria-labelledby="cta-heading">

  <DoodleSparkle className="absolute top-12 left-[12%] h-4 w-4 text-gold-400 animate-[float_4s_ease-in-out_infinite_0.3s]" />

  <DoodleSparkle className="absolute bottom-16 right-[15%] h-5 w-5 text-pale-green-400 animate-[float_5s_ease-in-out_infinite_0.8s]" />

  <DoodleCircle className="absolute top-20 right-[8%] h-12 w-12 text-navy-200 animate-[wiggle_6s_ease-in-out_infinite]" />

  <DoodleCross className="absolute bottom-24 left-[10%] h-3.5 w-3.5 text-gold-400 animate-[wiggle_5s_ease-in-out_infinite_0.5s]" />

  <div className="mx-auto max-w-3xl relative z-10">

  <DoodleDots className="mx-auto mb-6 text-navy-300" />

  <h2 id="cta-heading" className="text-3xl font-extrabold sm:text-4xl lg:text-5xl mb-8 tracking-tight">

  Ready to take control of{' '}

  <RoughUnderline stroke="var(--color-gold-500)" strokeWidth={3} className="inline-block">

  <span className="text-gold-600">your finances</span>

  </RoughUnderline>

  ?

  </h2>

  <p className="text-lg text-ink-secondary mb-12 max-w-xl mx-auto leading-relaxed">

  Join thousands of users who trust VaultBank for their daily banking needs.

  Setup takes less than 2 minutes.

  </p>

  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

  <Link

  to="/register"

  className="btn-primary px-10 py-4 text-lg w-full sm:w-auto transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"

  >

  Get Started Now

  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />

  </Link>

  <Link to="/login" className="btn-secondary px-10 py-4 text-lg w-full sm:w-auto transition-all duration-300 hover:scale-[1.03] hover:shadow-md active:scale-[0.98]">

  Sign In to Dashboard

  </Link>

  </div>

  </div>

  </section>

  )

}