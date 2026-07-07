import React from "react";
import { Landmark, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { footerLinks } from "@/constants/landing";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer
      className="py-16 border-t border-amber-500/5 bg-gradient-to-b from-dark to-dark-card/50 px-6 sm:px-8 lg:px-12"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
                <Landmark className="h-5 w-5 text-dark" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Vault
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Bank
              </span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-amber-400 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:scale-110 hover:rotate-6"
                >
                  <Icon className="h-4 w-4 text-zinc-400 hover:text-amber-400 transition-colors duration-300" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600">
            © {year} VaultBank. Built for the modern web.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <span>🔒 256-bit SSL</span>
            <span>🌍 Worldwide</span>
            <span>⚡ 99.9% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
