import React from 'react'

import { RoughBorder } from '@/components/rough/RoughBorder'

import { RoughUnderline } from '@/components/rough/RoughUnderline'

import { RoughDivider } from '@/components/rough/RoughDivider'

import { DoodleSparkle, DoodleCircle, DoodleDots, DoodleCross } from '@/components/illustrations/DoodleDecorations'

import { features } from '@/constants/landing'

export const FeaturesSection: React.FC = () => {

  return (

  <>

  <div className="px-6 sm:px-8 lg:px-12">

  <RoughDivider className="mx-auto max-w-7xl" stroke="var(--line-soft)" strokeWidth={0.8} roughness={1.4} />

  </div>

  <section id="features" className="relative py-32 lg:py-36 bg-surface-2/50 border-y border-line-soft px-6 sm:px-8 lg:px-12 overflow-hidden" aria-labelledby="features-heading">

  <DoodleSparkle className="absolute top-12 right-[10%] h-4 w-4 text-gold-400 animate-[float_4s_ease-in-out_infinite]" />

  <DoodleCircle className="absolute bottom-20 left-[5%] h-14 w-14 text-navy-200 animate-[wiggle_6s_ease-in-out_infinite]" />

  <DoodleDots className="absolute top-24 left-[8%] hidden md:block text-navy-300" />

  <div className="mx-auto max-w-7xl">

  <div className="mb-20 text-center animate-[fadeInUp_0.6s_ease-out]">

  <DoodleCross className="mx-auto mb-4 h-3 w-3 text-gold-400" />

  <h2 id="features-heading" className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight">

  Everything you need,{' '}

  <RoughUnderline stroke="var(--color-gold-500)" strokeWidth={2.5}>

  <span className="text-gold-600">nothing</span>

  </RoughUnderline>{' '}

  you don't.

  </h2>

  <p className="mt-5 text-lg text-ink-secondary max-w-2xl mx-auto">

  Built around the core tasks of daily banking.

  </p>

  </div>

  <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">

  {features.map((feature, i) => (

  <RoughBorder

  key={i}

  className="group relative bg-surface-1 rounded-[24px] transition-all duration-300 hover:-translate-y-1 hover:rotate-[-0.5deg] hover:shadow-[var(--premium-shadow-lg)]"

  stroke="var(--line-soft)"

  strokeWidth={1}

  roughness={0.6}

  bowing={0.5}

  >

  <div className="p-8 sm:p-10">

  <div

  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-6"

  aria-hidden="true"

  >

  <feature.icon className="h-7 w-7" />

  </div>

  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>

  <p className="text-ink-secondary leading-relaxed text-[0.95rem]">{feature.desc}</p>

  </div>

  <DoodleSparkle className="absolute -top-1.5 -right-1.5 h-3 w-3 text-gold-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

  </RoughBorder>

  ))}

  </div>

  </div>

  </section>

  </>

  )

}