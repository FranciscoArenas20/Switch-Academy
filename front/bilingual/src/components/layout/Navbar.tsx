"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitch from "@/components/ui/LanguageSwitch";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/language";

  const sectionIds = ["hero", "blog", "about", "cursos", "reviews", "contacto"];

export default function Navbar() {
  const { t, language } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const navLinks = [
  t.nav.home,      // 0 → hero
  t.nav.blog,      // 1 → blog
  t.nav.about,     // 2 → about
  t.nav.courses,   // 3 → cursos
  t.nav.reviews,   // 4 → reviews
  t.nav.contact,   // 5 → contacto
];

  const handleNavClick = (index: number) => {
    const id = sectionIds[index];
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2EC]/95 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Left: Logo + Language Switch */}
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold tracking-tight text-black">
              Switch Academy
            </span>
            <LanguageSwitch />
          </div>

          {/* Center: Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <button
                key={link}
                onClick={() => handleNavClick(i)}
                className="text-sm font-body text-black/60 hover:text-black transition-colors duration-200 tracking-wide"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Right: CTA button (desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick(5)}
              className={cn(
                "px-5 py-2 rounded-full text-white text-sm font-body font-medium",
                "transition-all duration-300",
                accentColor,
                accentHover
              )}
            >
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile: hamburger + CTA */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => handleNavClick(5)}
              className={cn(
                "px-4 py-1.5 rounded-full text-white text-sm font-body font-medium",
                "transition-all duration-300",
                accentColor,
                accentHover
              )}
            >
              {t.nav.cta}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-sm font-body font-medium text-black flex items-center gap-1"
            >
              <span>≡</span>
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-black/10 py-3 flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <button
                key={link}
                onClick={() => handleNavClick(i)}
                className="text-sm font-body text-black/70 hover:text-black text-left px-2 py-1.5 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}