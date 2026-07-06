import React from 'react'

import {

  Blocks,

  Briefcase,

  Coffee,

  Coins,

  CreditCard,

  Database,

  Grid2X2,

  Link2,

  MessageSquareMore,

  Pencil,

  ShieldCheck,

  Target,

  Wallet,

} from 'lucide-react'

const paperStyle: React.CSSProperties = {

  background: 'var(--surface-1)',

  border: '1px solid var(--line-soft)',

  boxShadow: 'var(--paper-shadow)',

}

const doodleStroke = 'var(--line-strong)'

const mutedStroke = 'rgba(130, 154, 177, 0.4)'

const Bubble: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => (

  <div className={`absolute flex items-center justify-center rounded-[24px] ${className}`} style={paperStyle}>

  {children}

  </div>

)

export const SketchBlockchainScene: React.FC = () => (

  <div className="relative h-full w-full overflow-hidden rounded-[24px]" style={{ color: 'var(--ink-primary)' }}>

  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 420" fill="none">

  <path d="M98 92C160 134 214 146 286 120" stroke={mutedStroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 9" />

  <path d="M344 108C410 84 486 96 548 142" stroke={mutedStroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 10" />

  <path d="M122 278C196 230 256 220 330 250" stroke={mutedStroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 8" />

  <path d="M372 268C442 294 494 290 560 252" stroke={mutedStroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 10" />

  <circle cx="320" cy="212" r="84" stroke={doodleStroke} strokeWidth="4" />

  <circle cx="320" cy="212" r="60" stroke={doodleStroke} strokeWidth="3" strokeDasharray="6 8" />

  <path d="M310 170V255" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M344 175C333 165 316 161 300 165C281 169 271 182 273 196C275 212 289 220 314 225C337 230 349 238 349 254C349 270 335 280 315 282C296 284 282 278 271 267" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

  <path d="M204 165L232 192L284 140" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

  <path d="M430 147H502" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M470 124L502 147L470 171" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

  <path d="M170 298H230" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M195 278L170 298L195 318" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

  </svg>

  <Bubble className="left-8 top-6 h-24 w-24 rotate-[-8deg]"><Database className="h-10 w-10 text-navy-700" /></Bubble>

  <Bubble className="left-24 bottom-10 h-24 w-24 rotate-[7deg]"><Link2 className="h-10 w-10 text-navy-700" /></Bubble>

  <Bubble className="right-8 top-10 h-24 w-24 rotate-[8deg]"><ShieldCheck className="h-10 w-10 text-pale-green-600" /></Bubble>

  <Bubble className="right-20 bottom-12 h-24 w-24 rotate-[-6deg]"><Target className="h-10 w-10 text-gold-600" /></Bubble>

  <div className="absolute left-[43%] top-[18%] rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-gold-700" style={{ borderColor: 'rgba(240,180,41,0.4)', background: 'rgba(255,251,234,0.82)' }}>

  Blockchain

  </div>

  <div className="absolute left-[13%] top-[56%] rounded-full border px-3 py-1 text-[11px] font-semibold text-navy-600" style={{ borderColor: 'var(--line-soft)', background: 'var(--surface-1)' }}>

  Secure flow

  </div>

  <div className="absolute right-[10%] top-[57%] rounded-full border px-3 py-1 text-[11px] font-semibold text-navy-600" style={{ borderColor: 'var(--line-soft)', background: 'var(--surface-1)' }}>

  Smart control

  </div>

  </div>

)

export const SketchWorkspaceScene: React.FC = () => (

  <div className="relative h-full w-full overflow-hidden rounded-[24px]" style={{ color: 'var(--ink-primary)' }}>

  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 420" fill="none">

  <path d="M56 86H392L430 250H92L56 86Z" stroke={doodleStroke} strokeWidth="4" strokeLinejoin="round" />

  <path d="M76 108H372L398 232H101L76 108Z" stroke={doodleStroke} strokeWidth="2.6" strokeLinejoin="round" />

  <path d="M206 258H366" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M240 258L266 300H338L366 258" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

  <circle cx="506" cy="100" r="66" stroke={doodleStroke} strokeWidth="4" />

  <circle cx="506" cy="100" r="48" stroke={mutedStroke} strokeWidth="2.4" strokeDasharray="6 8" />

  <path d="M474 182C520 160 556 162 592 194" stroke={mutedStroke} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="6 7" />

  <path d="M112 310C188 348 264 352 332 322" stroke={mutedStroke} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="7 8" />

  <path d="M82 128H380" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M90 152H386" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M98 176H392" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M106 200H398" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M112 108L134 232" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M148 108L170 232" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M184 108L206 232" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M220 108L242 232" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M256 108L278 232" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M292 108L314 232" stroke={mutedStroke} strokeWidth="1.6" />

  <path d="M328 108L350 232" stroke={mutedStroke} strokeWidth="1.6" />

  </svg>

  <Bubble className="right-6 top-10 h-24 w-24 rotate-[-8deg]"><Coffee className="h-10 w-10 text-gold-600" /></Bubble>

  <Bubble className="left-10 bottom-12 h-20 w-20 rotate-[7deg]"><Pencil className="h-8 w-8 text-navy-700" /></Bubble>

  <Bubble className="right-16 bottom-12 h-20 w-20 rotate-[6deg]"><Grid2X2 className="h-8 w-8 text-pale-green-600" /></Bubble>

  </div>

)

export const SketchIconBoardScene: React.FC = () => (

  <div className="relative h-full w-full overflow-hidden rounded-[24px]" style={{ color: 'var(--ink-primary)' }}>

  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 420" fill="none">

  <path d="M136 88H502V316H136V88Z" stroke={doodleStroke} strokeWidth="4" />

  <path d="M164 118H474V290H164V118Z" stroke={doodleStroke} strokeWidth="2.5" strokeDasharray="5 7" />

  <path d="M182 148H280V252H182V148Z" stroke={doodleStroke} strokeWidth="3" />

  <path d="M302 148H400V252H302V148Z" stroke={doodleStroke} strokeWidth="3" />

  <path d="M422 148H520V252H422V148Z" stroke={doodleStroke} strokeWidth="3" />

  <path d="M136 88L106 62" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M502 88L534 60" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M220 118V90" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M246 118V94" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M334 118V96" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M462 118V90" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" />

  <path d="M188 286H454" stroke={doodleStroke} strokeWidth="4" strokeLinecap="round" strokeDasharray="6 8" />

  </svg>

  <Bubble className="left-[29%] top-[36%] h-16 w-16 rotate-[-4deg]"><Wallet className="h-8 w-8 text-navy-700" /></Bubble>

  <Bubble className="left-[48%] top-[36%] h-16 w-16 rotate-[5deg]"><Coins className="h-8 w-8 text-gold-600" /></Bubble>

  <Bubble className="left-[67%] top-[36%] h-16 w-16 rotate-[-6deg]"><Briefcase className="h-8 w-8 text-pale-green-600" /></Bubble>

  <Bubble className="left-[18%] top-6 h-16 w-16 rotate-[8deg]"><CreditCard className="h-7 w-7 text-navy-700" /></Bubble>

  <Bubble className="right-[18%] top-7 h-16 w-16 rotate-[-8deg]"><MessageSquareMore className="h-7 w-7 text-gold-600" /></Bubble>

  <Bubble className="right-[14%] bottom-8 h-16 w-16 rotate-[8deg]"><Blocks className="h-7 w-7 text-pale-green-600" /></Bubble>

  </div>

)