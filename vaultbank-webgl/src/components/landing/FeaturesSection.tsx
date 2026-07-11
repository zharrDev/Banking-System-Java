import React, { useEffect, useRef } from "react";
import { Star, Sparkles } from "lucide-react";
import { features } from "@/constants/landing";

export const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".feature-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in-up");
                card.classList.remove("opacity-0");
              }, index * 150);
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
      id="features"
      ref={sectionRef}
      className="relative py-28 lg:py-36 px-6 sm:px-8 lg:px-12 border-y border-amber-500/5 bg-gradient-to-b from-gray-50 to-white dark:from-nd-bg dark:to-nd-card/30"
      aria-labelledby="features-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-500/[0.02] blur-[150px] dark:bg-amber-500/[0.03]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/[0.01] blur-[150px] dark:bg-blue-500/[0.02]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-300 mb-6 dark:border-amber-500/20 dark:bg-amber-500/10">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{" "}
            Features
          </div>
          <h2
            id="features-heading"
            className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight text-slate-900 dark:text-white"
          >
            Everything you need,{" "}
            <span className="relative">
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-300/20 blur-2xl" />
              <span className="relative bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                nothing
              </span>
            </span>{" "}
            you don't.
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto dark:text-zinc-300">
            Built around the core tasks of daily banking — simple, fast, and
            reliable.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card opacity-0 nd-card p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/5 border border-slate-200 hover:border-amber-500/30 group dark:border-white/5 dark:hover:border-amber-500/30"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-dark group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-amber-500/30 dark:bg-amber-500/10 dark:group-hover:bg-gradient-to-br dark:group-hover:from-amber-500 dark:group-hover:to-amber-600">
                <feature.icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-500 transition-colors duration-300 dark:text-white dark:group-hover:text-amber-300">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-[0.95rem] group-hover:text-slate-700 transition-colors duration-300 dark:text-zinc-400 dark:group-hover:text-zinc-300">
                {feature.desc}
              </p>

              {/* Decorative Line */}
              <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
