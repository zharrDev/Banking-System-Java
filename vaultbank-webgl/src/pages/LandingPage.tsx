import React from "react";
import { Navigation } from "@/components/landing/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { CTASection } from "@/components/landing/CTASection";
import { MarqueeBar } from "@/components/landing/MarqueeBar";
import { StatsCounter } from "@/components/landing/StatsCounter";
import { Footer } from "@/components/landing/Footer";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark text-zinc-light overflow-x-hidden">
      {/* Floating Particles Background */}
      <div className="fixed pointer-events-none inset-0">
        <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-amber-500/[0.03] blur-[120px] animate-pulse" />
        <div
          className="absolute top-[40%] -left-[15%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.02] blur-[120px] animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10">
        <Navigation />
        <main>
          <HeroSection />
          <MarqueeBar />
          <StatsCounter />
          <FeaturesSection />
          <SecuritySection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
