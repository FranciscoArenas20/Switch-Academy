"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/language";

interface LanguageSwitchProps {
  className?: string;
}

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];

const accentColors: Record<Language, string> = {
  en: "bg-[#2563EB]",
  fr: "bg-[#C8102E]",
  es: "bg-[#16A34A]",
};

const pillPosition: Record<Language, string> = {
  en: "left-0",
  fr: "left-1/3",
  es: "left-2/3",
};

export default function LanguageSwitch({ className }: LanguageSwitchProps) {
  const { language, setLang } = useLanguage();

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-black/20 overflow-hidden",
        "h-8 text-xs font-body font-semibold tracking-wider",
        className
      )}
      style={{ width: "108px" }}
    >
      {/* Sliding background pill */}
      <span
        className={cn(
          "absolute top-0 h-full w-1/3 transition-all duration-300 ease-in-out",
          accentColors[language],
          pillPosition[language]
        )}
      />

      {/* Language buttons */}
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={`Switch to ${code}`}
          className={cn(
            "relative z-10 flex-1 text-center py-1 transition-colors duration-300",
            "focus:outline-none",
            language === code ? "text-white" : "text-black/50 hover:text-black/80"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}