import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Landmark, X, Shield, Sun, Moon } from "lucide-react";
import { navLinks } from "@/constants/landing";
import { useTheme } from "@/context/ThemeContext";

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          ? "bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border-b border-amber-500/10 shadow-lg shadow-amber-500/5"
          : "bg-white/60 dark:bg-dark/60 backdrop-blur-md border-b border-slate-200 dark:border-white/5"
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
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Vault
            <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent dark:from-amber-400 dark:to-amber-300">
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
              className="relative text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <div className="h-6 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition-all duration-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-400 transition-transform duration-300 hover:rotate-12" />
            ) : (
              <Moon className="h-5 w-5 text-slate-500 dark:text-zinc-400 transition-transform duration-300 hover:rotate-12" />
            )}
          </button>

          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 hover:text-amber-500 dark:text-zinc-300 dark:hover:text-amber-400 transition-colors px-4 py-2 rounded-xl hover:bg-amber-500/10"
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
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 dark:border-white/10 dark:bg-dark-card/50 dark:hover:bg-dark-card transition-all duration-300"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-amber-400" />
          ) : (
            <Menu className="h-5 w-5 text-slate-500 dark:text-zinc-400" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-xl px-6 py-6 md:hidden animate-fade-in-up dark:border-white/5 dark:bg-dark-card/95">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-600 hover:text-amber-500 dark:text-zinc-300 dark:hover:text-amber-400 transition-colors py-2 border-b border-slate-200 dark:border-white/5"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-white/5" />
            <div className="flex items-center justify-between">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="nd-btn-outline justify-center flex-1 mr-2"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="nd-btn justify-center flex-1 ml-2 shadow-glow-amber"
              >
                Get Started
              </Link>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition-all duration-300"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5 text-amber-400" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
