import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

import { RoughBorder } from '@/components/rough/RoughBorder'

import { RoughUnderline } from '@/components/rough/RoughUnderline'

export interface HeroSlide {

  id: string

  eyebrow: string

  title: string

  highlight?: string

  description: string

  caption: string

  visual: React.ReactNode

  facts: string[]

  primaryLabel: string

  onPrimaryAction?: () => void

  secondaryLabel?: string

  onSecondaryAction?: () => void

  chip: string

  chipClassName: string

  accentClassName: string

  shadowClassName: string

}

interface Props {

  slides: HeroSlide[]

  className?: string

}

const titleWithHighlight = (title: string, highlight?: string) => {

  if (!highlight || !title.includes(highlight)) return <>{title}</>

  const [before, after] = title.split(highlight)

  return (

  <>

  {before}

  <RoughUnderline className="mx-1" stroke="#f0b429" strokeWidth={3}>

  {highlight}

  </RoughUnderline>

  {after}

  </>

  )

}

export const HandDrawnHeroCarousel: React.FC<Props> = ({ slides, className = '' }) => {

  const [activeIndex, setActiveIndex] = useState(0)

  const [isPaused, setIsPaused] = useState(false)

  const safeSlides = useMemo(() => slides.filter(Boolean), [slides])

  const nextSlide = useCallback(() => {

  setActiveIndex((current) => (current + 1) % safeSlides.length)

  }, [safeSlides.length])

  const previousSlide = useCallback(() => {

  setActiveIndex((current) => (current - 1 + safeSlides.length) % safeSlides.length)

  }, [safeSlides.length])

  useEffect(() => {

  if (safeSlides.length <= 1 || isPaused) return

  const timer = window.setInterval(nextSlide, 6500)

  return () => window.clearInterval(timer)

  }, [safeSlides.length, isPaused, nextSlide])

  if (!safeSlides.length) return null

  return (

  <section

  className={`hero-stage relative flex h-full flex-col overflow-hidden rounded-[36px] border border-navy-100 p-3 shadow-[0_28px_90px_rgba(16,42,67,0.12)] ${className}`}

  onMouseEnter={() => setIsPaused(true)}

  onMouseLeave={() => setIsPaused(false)}

  >

  <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-2 pt-1">

  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-navy-500">

  <Sparkles className="h-3.5 w-3.5 text-gold-500" />

  Homepage preview

  </div>

  <div className="hidden items-center gap-2 md:flex">

  {safeSlides.map((slide, index) => (

  <button

  key={slide.id}

  type="button"

  onClick={() => setActiveIndex(index)}

  className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${

  index === activeIndex

  ? 'bg-navy-800 text-white shadow-sm'

  : 'bg-white text-navy-500 hover:bg-navy-50'

  }`}

  >

  {slide.eyebrow}

  </button>

  ))}

  </div>

  </div>

  <div className="flex-1 overflow-hidden rounded-[30px] bg-white/70 backdrop-blur-sm">

  <div

  className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"

  style={{ transform: `translateX(-${activeIndex * 100}%)` }}

  >

  {safeSlides.map((slide) => (

  <article key={slide.id} className="flex min-w-full p-4 sm:p-5 lg:p-7">

  <div className="grid h-full w-full items-center gap-7 lg:grid-cols-[1.02fr_1fr] lg:gap-10">

  <div className="order-2 h-full lg:order-1">

  <RoughBorder className="flex h-full flex-col justify-between rounded-[30px] bg-white/92 p-5 sm:p-6 lg:p-7" stroke="#d9e2ec" roughness={0.65}>

  <div>

  <div className={`mb-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${slide.chipClassName}`}>

  {slide.chip}

  </div>

  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-navy-500">{slide.eyebrow}</p>

  <h2 className="mt-3 text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-[2.8rem]">

  {titleWithHighlight(slide.title, slide.highlight)}

  </h2>

  <p className="mt-4 max-w-xl text-sm leading-7 text-navy-600 sm:text-base">{slide.description}</p>

  <div className="mt-5 grid gap-2.5 sm:grid-cols-3">

  {slide.facts.map((fact) => (

  <div key={fact} className="rounded-[20px] border border-dashed border-navy-200 bg-navy-50/65 px-3 py-3 text-xs font-medium text-navy-600 transition-transform duration-200 hover:-translate-y-0.5">

  {fact}

  </div>

  ))}

  </div>

  </div>

  <div className="mt-6">

  <div className="flex flex-wrap items-center gap-3">

  {slide.onPrimaryAction && (

  <button type="button" onClick={slide.onPrimaryAction} className="btn-primary">

  {slide.primaryLabel}

  </button>

  )}

  {slide.onSecondaryAction && slide.secondaryLabel && (

  <button type="button" onClick={slide.onSecondaryAction} className="btn-secondary">

  {slide.secondaryLabel}

  </button>

  )}

  </div>

  <div className="mt-6 rounded-[22px] bg-gradient-to-r from-navy-50 to-white px-4 py-3 text-xs leading-6 text-navy-500">

  {slide.caption}

  </div>

  </div>

  </RoughBorder>

  </div>

  <div className="order-1 lg:order-2">

  <div className="relative h-[280px] overflow-visible sm:h-[360px] lg:h-[430px]">

  <div className={`absolute inset-x-2 bottom-1 top-6 rounded-[32px] ${slide.shadowClassName} rotate-[-3deg] opacity-80`} />

  <div className={`absolute inset-x-8 bottom-8 top-0 rounded-[32px] ${slide.accentClassName} rotate-[3deg] opacity-70`} />

  <RoughBorder className="absolute inset-0 rounded-[34px] bg-white p-3 shadow-[0_18px_50px_rgba(16,42,67,0.14)]" stroke="#bcccdc" roughness={0.72}>

  <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[26px] bg-offwhite p-3 sm:p-5">

  {slide.visual}

  </div>

  </RoughBorder>

  </div>

  </div>

  </div>

  </article>

  ))}

  </div>

  </div>

  <div className="mt-4 flex items-center justify-between gap-3 px-2 pb-2">

  <div className="flex items-center gap-2">

  {safeSlides.map((slide, index) => (

  <button

  key={slide.id}

  type="button"

  aria-label={`Go to slide ${index + 1}`}

  onClick={() => setActiveIndex(index)}

  className={`h-2.5 rounded-full transition-all ${

  index === activeIndex ? 'w-8 bg-gold-500' : 'w-2.5 bg-navy-200 hover:bg-navy-300'

  }`}

  />

  ))}

  </div>

  <div className="flex items-center gap-2">

  <button type="button" onClick={previousSlide} className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-600 transition-colors hover:bg-navy-50">

  <ChevronLeft className="h-5 w-5" />

  </button>

  <button type="button" onClick={nextSlide} className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-600 transition-colors hover:bg-navy-50">

  <ChevronRight className="h-5 w-5" />

  </button>

  </div>

  </div>

  </section>

  )

}