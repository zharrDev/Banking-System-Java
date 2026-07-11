import React, { useEffect, useRef, useState } from "react";
import {
  Users,
  CreditCard,
  ArrowLeftRight,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Active Users",
    color: "from-blue-400 to-blue-300",
  },
  {
    icon: CreditCard,
    value: 10000,
    suffix: "+",
    label: "Accounts Created",
    color: "from-emerald-400 to-emerald-300",
  },
  {
    icon: ArrowLeftRight,
    value: 50000,
    suffix: "K+",
    label: "Transactions",
    color: "from-amber-400 to-amber-300",
  },
  {
    icon: Shield,
    value: 99.9,
    suffix: "%",
    label: "Uptime",
    isDecimal: true,
    color: "from-purple-400 to-purple-300",
  },
];

interface AnimatedNumberProps {
  target: number;
  suffix: string;
  isDecimal?: boolean;
  color?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  target,
  suffix,
  isDecimal,
  color = "from-amber-400 to-amber-300",
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 },
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 2500;
    const steps = 80;
    const increment = target / steps;
    let current = 0;
    let frameId: number;

    const animate = () => {
      current += increment;
      if (current >= target) {
        setCount(target);
        return;
      }
      setCount(isDecimal ? Number(current.toFixed(1)) : Math.floor(current));
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, target, isDecimal]);

  const display = isDecimal ? target.toFixed(1) : count.toLocaleString();

  return (
    <div ref={ref} className="relative">
      <div
        className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight bg-gradient-to-r ${color} bg-clip-text text-transparent transition-all duration-1000`}
      >
        {display}
        {suffix}
      </div>
      <div
        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent scale-x-0 transition-transform duration-1000 dark:via-amber-500/40"
        style={{ transform: started ? "scaleX(1)" : "scaleX(0)" }}
      />
    </div>
  );
};

export const StatsCounter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-20 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-amber-500/5 overflow-hidden dark:border-amber-500/5">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-amber-500/[0.03] blur-[120px] dark:bg-amber-500/[0.04]" />
      </div>

      <div ref={containerRef} className="mx-auto max-w-6xl relative z-10">
        {/* Section Label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-4 dark:border-amber-500/20 dark:bg-amber-500/10">
            <TrendingUp className="h-3.5 w-3.5" /> Our Impact
          </div>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto dark:text-zinc-300">
            Trusted by thousands of users worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/5 border border-amber-500/10 group-hover:bg-amber-500/15 group-hover:border-amber-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 dark:bg-amber-500/5 dark:border-amber-500/10 dark:group-hover:bg-amber-500/15 dark:group-hover:border-amber-500/30">
                    <Icon className="h-7 w-7 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                  </div>
                </div>
                <AnimatedNumber
                  target={s.value}
                  suffix={s.suffix}
                  isDecimal={s.isDecimal}
                  color={s.color}
                />
                <p className="mt-3 text-sm font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
