"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/language";

export default function HeroSection() {
  const { t, language } = useLanguage();

  const accentColors: Record<Language, string> = {
    en: "bg-[#2563EB]",
    fr: "bg-[#C8102E]",
    es: "bg-[#16A34A]",
  };

  const accentHovers: Record<Language, string> = {
    en: "hover:bg-[#1d4ed8]",
    fr: "hover:bg-[#a50d25]",
    es: "hover:bg-[#15803d]",
  };

  const accentColor = accentColors[language];
  const accentHover = accentHovers[language];

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#F5F2EC]">

      {/* ── DESKTOP ── */}
      <div className="hidden md:block relative w-full h-screen">
        {/* Imagen horizontal de fondo */}
        <Image
          src="/images/hero.png"
          alt="Switch Academy"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
        />

        {/* Difuminado de derecha a izquierda */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EC] via-[#F5F2EC]/80 to-transparent" /> */}

        {/* Contenido encima del blanco */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-8 w-full">
            <div className="max-w-lg">
              <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-tight text-black mb-4 lang-transition">
                {t.hero.line1}<br />
                {t.hero.line2}<br />
                {t.hero.line3}
              </h1>
              <p className="font-body text-base text-black/55 leading-relaxed mb-8 lang-transition">
                {t.hero.subtitle}
              </p>
              <button
                className={cn(
                  "px-7 py-3 rounded-full text-white font-body font-medium text-sm",
                  "transition-all duration-300 active:scale-95",
                  accentColor,
                  accentHover
                )}
              >
                {t.hero.cta}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden relative w-full min-h-screen">
        {/* Imagen vertical de fondo */}
        <Image
          src="/images/hero-mobile.png"
          alt="Switch Academy"
          fill
          priority
          quality={100}
          className="object-cover object-top"
          sizes="100vw"
        />

        {/* Difuminado de abajo hacia arriba para que el texto sea legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2EC] via-[#F5F2EC]/50 to-transparent" />

        {/* Contenido en la parte superior */}
        <div className="relative z-10 px-6 pt-24 pb-8">
          <h1 className="font-display text-[clamp(1.8rem,8vw,2.8rem)] font-extrabold leading-[0.95] tracking-tight text-black mb-4 lang-transition">
            {t.hero.line1}<br />
            {t.hero.line2}<br />
            {t.hero.line3}
          </h1>
          <p className="font-body text-sm text-black/55 leading-relaxed mb-6 lang-transition">
            {t.hero.subtitle}
          </p>
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
            <StatsBar />
    </section>
  );
}

function StatsBar() {
  const { t, language } = useLanguage();

  const accentColors: Record<Language, string> = {
    en: "bg-[#2563EB] text-white",
    fr: "bg-[#C8102E] text-white",
    es: "bg-[#16A34A] text-white",
  };

  const accentClass = accentColors[language];

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
                i === 3 ? accentClass : "bg-transparent"
              )}
            >
              <p className={cn("font-display text-2xl font-bold lang-transition", i === 3 ? "text-white" : "text-black")}>
                {stat.value}
              </p>
              <p className={cn("font-body text-xs mt-0.5 lang-transition", i === 3 ? "text-white/80" : "text-black/50")}>
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
                i === 3 ? accentClass : "bg-transparent"
              )}
            >
              <p className={cn("font-display text-xl font-bold", i === 3 ? "text-white" : "text-black")}>
                {stat.value}
              </p>
              <p className={cn("font-body text-xs", i === 3 ? "text-white/80" : "text-black/50")}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}