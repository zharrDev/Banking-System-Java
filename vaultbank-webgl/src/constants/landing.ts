import { Wallet, LayoutDashboard, TrendingUp, Clock, Fingerprint, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
export interface Feature { icon: LucideIcon; title: string; desc: string }
export const features: Feature[] = [
  { icon: Wallet, title: 'Account Balance', desc: 'Get an instant overview of your funds across all accounts in a premium landscape view.' },
  { icon: LayoutDashboard, title: 'Smart Dashboard', desc: 'A focused workspace with shortcuts, stats, and recent activity at your fingertips.' },
  { icon: TrendingUp, title: 'Easy Transfers', desc: 'Move money securely with our simplified transfer flow and real-time balance checks.' },
  { icon: Clock, title: 'Transaction History', desc: 'Browse your complete transaction timeline with powerful filters and search.' },
  { icon: Fingerprint, title: 'Biometric Auth', desc: 'Sign in securely with fingerprint or face recognition for lightning-fast access.' },
  { icon: ShieldCheck, title: 'Fraud Protection', desc: 'Real-time monitoring and instant alerts keep your accounts safe around the clock.' },
]
export const navLinks = [ { href: '#features', label: 'Features' }, { href: '#security', label: 'Security' }, ] as const
export const footerLinks = [ { href: '#', label: 'Privacy' }, { href: '#', label: 'Terms' }, ] as const
export const securityFeatures = ['Encrypted sessions','Biometric-ready auth','Real-time fraud alerts','24/7 account monitoring'] as const
