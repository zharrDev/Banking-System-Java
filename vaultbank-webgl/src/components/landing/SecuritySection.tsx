import React, { useEffect, useRef } from "react";
import {
  Shield,
  Lock,
  Smartphone,
  CheckCircle,
  Fingerprint,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const securityItems = [
  {
    icon: Fingerprint,
    title: "Biometric Login",
    desc: "Face ID & Touch ID for instant, secure access.",
  },
  {
    icon: ShieldCheck,
    title: "Real-time Monitoring",
    desc: "24/7 fraud detection with instant alerts.",
  },
  {
    icon: Lock,
    title: "End-to-end Encryption",
    desc: "Bank-grade AES-256 encryption on all data.",
  },
  {
    icon: Smartphone,
    title: "Device Management",
    desc: "Review & revoke active sessions anytime.",
  },
  {
    icon: CheckCircle,
    title: "Transaction Verification",
    desc: "Confirm high-value transfers with OTP.",
  },
  {
    icon: Shield,
    title: "Zero Liability",
    desc: "You're protected against unauthorized charges.",
  },
];

export const SecuritySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".security-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in-up");
                card.classList.remove("opacity-0");
              }, index * 120);
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      id="security"
      ref={sectionRef}
      className="relative py-28 lg:py-36 px-6 sm:px-8 lg:px-12"
      aria-labelledby="security-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 mb-6">
            <Shield className="h-3.5 w-3.5" /> Security
            <Sparkles className="h-3 w-3 text-emerald-400 ml-1" />
          </div>
          <h2
            id="security-heading"
            className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight text-white"
          >
            Security that works{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              while you sleep
            </span>
          </h2>
          <p className="mt-5 text-lg text-zinc-400 max-w-2xl mx-auto">
            Enterprise-grade protection without the complexity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="security-card opacity-0 nd-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/5 border border-white/5 hover:border-emerald-500/30 group"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                  <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors duration-300">
                  {item.desc}
                </p>

                {/* Animated Status Indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
                  <span className="text-xs text-emerald-400/70 font-mono">
                    SECURE
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
