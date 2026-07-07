import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Landmark, X, Shield } from "lucide-react";
import { navLinks } from "@/constants/landing";

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-card/80 backdrop-blur-xl border-b border-amber-500/10 shadow-lg shadow-amber-500/5"
          : "bg-dark/60 backdrop-blur-md border-b border-white/5"
      }`}
      role="navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-[72px] sm:px-8 lg:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-105">
              <Landmark className="h-5 w-5 text-dark font-bold" />
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Vault
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              Bank
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <div className="h-6 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />

          <Link
            to="/login"
            className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors px-4 py-2 rounded-xl hover:bg-amber-500/10"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="nd-btn text-sm px-6 py-2.5 shadow-glow-amber"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-dark-card/50 hover:bg-dark-card transition-all duration-300"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-amber-400" />
          ) : (
            <Menu className="h-5 w-5 text-zinc-400" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/5 bg-dark-card/95 backdrop-blur-xl px-6 py-6 md:hidden animate-fade-in-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-300 hover:text-amber-400 transition-colors py-2 border-b border-white/5"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="nd-btn-outline justify-center mt-2"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="nd-btn justify-center shadow-glow-amber"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
