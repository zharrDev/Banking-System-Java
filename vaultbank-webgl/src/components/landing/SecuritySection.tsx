import React from 'react'
import { CheckCircle2, Fingerprint, Lock, ShieldCheck, UserCheck } from 'lucide-react'
import { RoughBorder } from '@/components/rough/RoughBorder'
import { RoughUnderline } from '@/components/rough/RoughUnderline'
import { DoodleSparkle, DoodleZigzag, DoodleCross } from '@/components/illustrations/DoodleDecorations'

/**
 * SecuritySection – VaultBank
 * Logic identik dengan versi asli, hanya dibersihkan escape sequence.
 * WebGL background sudah ditangani di LandingPage (global).
 */
export const SecuritySection: React.FC = () => {
  const securityItems = [
    { icon: Fingerprint, title: 'Biometric Login', desc: 'Face ID & Touch ID for instant, secure access' },
    { icon: ShieldCheck, title: 'Real-time Monitoring', desc: '24/7 fraud detection with instant alerts' },
    { icon: Lock, title: 'End-to-end Encryption', desc: 'Bank-grade AES-256 encryption on all data' },
    { icon: UserCheck, title: 'Device Management', desc: 'Review & revoke active sessions anytime' },
    { icon: CheckCircle2, title: 'Transaction Verification', desc: 'Confirm high-value transfers with OTP' },
    { icon: ShieldCheck, title: 'Zero Liability', desc: "You're protected against unauthorized charges" },
  ]

  return (
    <section id="security" className="relative py-32 lg:py-36 px-6 sm:px-8 lg:px-12 overflow-hidden" aria-labelledby="security-heading">
      <DoodleSparkle className="absolute top-16 left-[10%] h-4 w-4 text-pale-green-400 animate-float" />
      <DoodleZigzag className="absolute top-20 right-[15%] w-16 text-navy-200 hidden sm:block animate-float" />
      <DoodleCross className="absolute bottom-20 right-[20%] h-4 w-4 text-gold-400 animate-wiggle" />
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <DoodleSparkle className="mx-auto mb-4 h-3 w-3 text-pale-green-500" />
          <h2 id="security-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Security that works{' '}
            <RoughUnderline stroke="var(--color-gold-500)" strokeWidth={2.5} className="inline-block">
              <span className="text-gold-600">while you sleep</span>
            </RoughUnderline>
          </h2>
          <p className="mt-5 text-lg text-ink-secondary max-w-2xl mx-auto">
            Enterprise-grade protection without the complexity.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, i) => (
            <RoughBorder
              key={i}
              className="group bg-surface-1 rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--premium-shadow-lg)]"
              stroke="var(--line-soft)"
              strokeWidth={1}
              roughness={0.6}
              bowing={0.5}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-pale-green-500/10 text-pale-green-600 group-hover:bg-pale-green-500 group-hover:text-white transition-all duration-300" aria-hidden="true">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-ink-secondary leading-relaxed text-sm">{item.desc}</p>
              <DoodleSparkle className="absolute -top-1.5 -right-1.5 h-3 w-3 text-pale-green-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </RoughBorder>
          ))}
        </div>
      </div>
    </section>
  )
}
