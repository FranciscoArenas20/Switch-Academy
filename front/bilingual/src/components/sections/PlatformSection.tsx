"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/language";

export default function PlatformSection() {
  const { t, language } = useLanguage();

  const accentColors: Record<Language, string> = {
    en: "bg-[#2563EB]",
    fr: "bg-[#C8102E]",
    es: "bg-[#16A34A]",
  };

  const accentTexts: Record<Language, string> = {
    en: "text-[#2563EB]",
    fr: "text-[#C8102E]",
    es: "text-[#16A34A]",
  };

  const instructorImages: Record<Language, string> = {
    en: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=top",
    fr: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&fit=crop&crop=top",
    es: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&fit=crop&crop=top",
  };

  const accentColor = accentColors[language];
  const accentText = accentTexts[language];
  const instructorImage = instructorImages[language];

  return (
    <section id="about" className="py-20 bg-[#F5F2EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">

          {/* Left: text */}
          <div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1] tracking-tight text-black mb-5 lang-transition">
              {t.platform.title}
            </h2>
            <p className="font-body text-[15px] text-black/55 leading-relaxed mb-8 max-w-sm lang-transition">
              {t.platform.description}
            </p>
            <button
              className={cn(
                "px-6 py-2.5 rounded-full border-2 border-black text-black",
                "font-body font-medium text-sm",
                "hover:bg-black hover:text-white transition-all duration-300"
              )}
            >
              {t.platform.cta}
            </button>
          </div>

          {/* Right: image card */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3]">
              <Image
                src="/images/aboutme.jpeg"
                alt="Platform instructor"
                fill
                className="object-cover object-top opacity-90 lang-transition"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Progress badge */}
              

              {/* Language badge */}
              <div
                className={cn(
                  "absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-body font-semibold transition-colors duration-300",
                  accentColor
                )}
              >
                {t.platform.subtitle}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden">
          {/* Image first on mobile */}
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video mb-8">
            <Image
              src="/images/aboutme.jpeg"
              alt="Platform instructor"
              fill
              className="object-cover object-top opacity-90"
              sizes="100vw"
            />
            {/* Progress badge */}
            {/* <div className="absolute bottom-3 right-3 bg-white rounded-xl px-3 py-2 shadow-lg flex items-end gap-2">
              <div>
                <p className="font-display text-lg font-bold text-black leading-none">
                  2/8
                </p>
              </div>
              <div className="flex items-end gap-0.5 h-6">
                {[3, 5, 4, 7, 6, 8].map((h, i) => (
                  <div
                    key={i}
                    className={cn(
  "w-1.5 rounded-sm",
  i < 2 ? accentColor : "bg-black/10"
)}
                    style={{ height: `${h * 3}px` }}
                  />
                ))}
              </div>
            </div> */}
          </div>

          <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-black mb-4 lang-transition">
            {t.platform.title}
          </h2>
          <p className="font-body text-sm text-black/55 leading-relaxed mb-6 lang-transition">
            {t.platform.description}
          </p>
          <button className="px-6 py-2.5 rounded-full border-2 border-black text-black font-body font-medium text-sm hover:bg-black hover:text-white transition-all duration-300">
            {t.platform.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
