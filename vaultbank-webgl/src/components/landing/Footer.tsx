import React from "react";
import { Landmark, Github, Twitter, Linkedin, Mail, Shield, Globe, Zap } from "lucide-react";
import { footerLinks } from "@/constants/landing";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const features = [
    { icon: Shield, title: "Bank-grade Security", desc: "AES-256 encryption & biometric auth" },
    { icon: Globe, title: "Global Access", desc: "Bank from anywhere in the world" },
    { icon: Zap, title: "Real-time Updates", desc: "Instant notifications & sync" },
  ];

  return (
    <footer
      className="py-16 border-t border-amber-500/5 bg-gradient-to-b from-gray-50 to-white px-6 sm:px-8 lg:px-12 dark:from-nd-bg dark:to-nd-card/50"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 group mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-xl group-hover:blur-2xl transition-all duration-300 dark:bg-amber-500/20" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
                  <Landmark className="h-5 w-5 text-dark font-bold" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Vault
                <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent dark:from-amber-400 dark:to-amber-300">
                  Bank
                </span>
              </span>
            </div>
            <p className="text-slate-500 text-base leading-relaxed max-w-xs dark:text-zinc-300">
              Modern digital banking built for the way you live. Secure, fast, and beautifully designed.
            </p>
            
            {/* Feature highlights */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all duration-300 dark:bg-white/5 dark:hover:bg-white/10">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm dark:text-white">{f.title}</p>
                    <p className="text-slate-400 text-xs dark:text-zinc-400">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 dark:text-white">Product</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-amber-500 transition-colors duration-300 relative group dark:text-zinc-400 dark:hover:text-amber-400"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-amber-500 transition-colors duration-300 relative group dark:text-zinc-400 dark:hover:text-amber-400"
                >
                  Pricing
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-amber-500 transition-colors duration-300 relative group dark:text-zinc-400 dark:hover:text-amber-400"
                >
                  API Docs
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                    className="text-sm text-slate-500 hover:text-amber-500 transition-colors duration-300 relative group dark:text-zinc-400 dark:hover:text-amber-400"
                  >
                    Changelog
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 dark:text-white">Company</h4>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 hover:text-amber-500 transition-colors duration-300 relative group dark:text-zinc-400 dark:hover:text-amber-400"
                  >
                    {item}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 dark:text-white">Connect</h4>
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-amber-500/10 border border-slate-200 hover:border-amber-500/30 transition-all duration-300 hover:scale-110 hover:rotate-6 dark:bg-white/5 dark:hover:bg-amber-500/10"
                  >
                    <Icon className="h-4 w-4 text-slate-500 hover:text-amber-500 transition-colors duration-300 dark:text-zinc-400 dark:hover:text-amber-400" />
                  </a>
                );
              })}
            </div>
            <div className="space-y-2 text-xs text-slate-400 dark:text-zinc-500">
              <p>© {year} VaultBank. Built for the modern web.</p>
              <p>Privacy Policy · Terms of Service</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-xs text-slate-400 dark:text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-emerald-400" />
              256-bit SSL
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-3 w-3 text-blue-400" />
              Worldwide
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-amber-400" />
              99.9% Uptime
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-zinc-500">
            Made with care for developers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
