"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const { t, isEnglish } = useLanguage();

  const accentColor = isEnglish ? "bg-[#2563EB]" : "bg-[#C8102E]";
  const accentHover = isEnglish ? "hover:bg-[#1d4ed8]" : "hover:bg-[#a50d25]";

  // Different hero images per language
  const heroImage = isEnglish
    ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&fit=crop&crop=top" // professional woman
    : "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&fit=crop&crop=top"; // different professional

  return (
    <section className="relative min-h-screen pt-14 overflow-hidden bg-[#F5F2EC]">
      {/* Background subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-56px)] items-start">

          {/* Left: Text content */}
          <div className="flex flex-col justify-start pt-10 md:pt-16 pb-8 z-10">
            {/* Headline */}
            <h1 className="font-display text-[clamp(3.5rem,9vw,6.5rem)] font-extrabold leading-[0.92] tracking-tight text-black mb-6 lang-transition">
              <span
                className="block animate-fade-up"
                style={{ animationDelay: "0ms" }}
              >
                {t.hero.line1}
              </span>
              <span
                className="block animate-fade-up"
                style={{ animationDelay: "80ms" }}
              >
                {t.hero.line2}
              </span>
              <span
                className="block animate-fade-up"
                style={{ animationDelay: "160ms" }}
              >
                {t.hero.line3}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="font-body text-[15px] text-black/55 max-w-xs leading-relaxed mb-8 animate-fade-up lang-transition"
              style={{ animationDelay: "240ms" }}
            >
              {t.hero.subtitle}
            </p>

            {/* CTA */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: "320ms" }}
            >
              <button
                className={cn(
                  "px-6 py-3 rounded-full text-white font-body font-medium text-sm",
                  "transition-all duration-300 active:scale-95",
                  accentColor,
                  accentHover
                )}
              >
                {t.hero.cta}
              </button>
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="relative hidden md:flex justify-end items-end h-full min-h-[calc(100vh-56px)]">
            <div className="relative w-full h-full">
              <Image
                src={heroImage}
                alt="Alex — Language instructor"
                fill
                priority
                className="object-cover object-top lang-transition"
                sizes="(max-width: 768px) 0vw, 50vw"
              />
              {/* Soft left fade into background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EC] via-transparent to-transparent w-1/3" />
            </div>
          </div>

          {/* Mobile: image below text */}
          <div className="md:hidden relative w-full h-64 mt-4 rounded-2xl overflow-hidden">
            <Image
              src={heroImage}
              alt="Alex — Language instructor"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <StatsBar />
    </section>
  );
}

function StatsBar() {
  const { t, isEnglish } = useLanguage();

  const stats = [
    t.stats.courses,
    t.stats.students,
    t.stats.access,
    t.stats.satisfaction,
  ];

  return (
    <div className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-black/8">
      <div className="max-w-6xl mx-auto">
        {/* Desktop: horizontal row */}
        <div className="hidden sm:grid sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "px-6 py-4 border-r border-black/8 last:border-r-0",
                i === 3
                  ? isEnglish
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#C8102E] text-white"
                  : "bg-transparent"
              )}
            >
              <p
                className={cn(
                  "font-display text-2xl font-bold lang-transition",
                  i === 3 ? "text-white" : "text-black"
                )}
              >
                {stat.value}
              </p>
              <p
                className={cn(
                  "font-body text-xs mt-0.5 lang-transition",
                  i === 3 ? "text-white/80" : "text-black/50"
                )}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: stacked */}
        <div className="sm:hidden flex flex-col">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "px-6 py-3 border-b border-black/8 last:border-b-0",
                i === 3
                  ? isEnglish
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#C8102E] text-white"
                  : "bg-transparent"
              )}
            >
              <p
                className={cn(
                  "font-display text-xl font-bold",
                  i === 3 ? "text-white" : "text-black"
                )}
              >
                {stat.value}
              </p>
              <p
                className={cn(
                  "font-body text-xs",
                  i === 3 ? "text-white/80" : "text-black/50"
                )}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
