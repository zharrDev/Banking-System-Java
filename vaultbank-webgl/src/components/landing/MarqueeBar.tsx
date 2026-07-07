import React from "react";
import {
  Shield,
  Zap,
  TrendingUp,
  CreditCard,
  Users,
  Globe,
  Sparkles,
  Lock,
  Award,
} from "lucide-react";

const items = [
  { icon: Shield, text: "Bank-grade Security" },
  { icon: Zap, text: "Real-time Processing" },
  { icon: TrendingUp, text: "Smart Investments" },
  { icon: CreditCard, text: "Virtual Cards" },
  { icon: Users, text: "2,000+ Customers" },
  { icon: Globe, text: "Worldwide Access" },
  { icon: Lock, text: "256-bit SSL" },
  { icon: Award, text: "Award-winning Platform" },
  { icon: Sparkles, text: "AI-powered Insights" },
  // Duplicate for seamless looping
  { icon: Shield, text: "Bank-grade Security" },
  { icon: Zap, text: "Real-time Processing" },
  { icon: TrendingUp, text: "Smart Investments" },
  { icon: CreditCard, text: "Virtual Cards" },
  { icon: Users, text: "2,000+ Customers" },
  { icon: Globe, text: "Worldwide Access" },
  { icon: Lock, text: "256-bit SSL" },
  { icon: Award, text: "Award-winning Platform" },
  { icon: Sparkles, text: "AI-powered Insights" },
];

export const MarqueeBar: React.FC = () => {
  return (
    <div className="relative border-y border-amber-500/10 bg-gradient-to-r from-dark-card/50 via-dark-card to-dark-card/50 overflow-hidden py-4">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-dark to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-dark to-transparent pointer-events-none" />

      <div className="flex gap-12 animate-marquee hover:animate-none transition-all duration-1000">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 flex-shrink-0 text-zinc-400 hover:text-amber-400 transition-all duration-300 cursor-default group"
            >
              <div className="p-1 rounded-lg bg-amber-500/5 group-hover:bg-amber-500/20 transition-all duration-300 group-hover:scale-110">
                <Icon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-sm font-semibold whitespace-nowrap tracking-wide">
                {item.text}
              </span>
              <div className="h-1 w-1 rounded-full bg-amber-500/30 mx-2 group-hover:bg-amber-500/50 transition-colors duration-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
