"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  className?: string;
}

export default function LanguageSwitch({ className }: LanguageSwitchProps) {
  const { language, toggleLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <button
      onClick={toggleLanguage}
      aria-label={`Switch to ${isEnglish ? "French" : "English"}`}
      className={cn(
        "relative flex items-center gap-0 rounded-full border border-black/20 overflow-hidden",
        "h-8 text-xs font-body font-semibold tracking-wider transition-all duration-300",
        "hover:border-black/40 focus:outline-none focus:ring-2 focus:ring-offset-1",
        isEnglish ? "focus:ring-blue-500" : "focus:ring-red-600",
        className
      )}
      style={{ width: "72px" }}
    >
      {/* Sliding background pill */}
      <span
        className={cn(
          "absolute top-0 h-full w-1/2 transition-all duration-300 ease-in-out",
          isEnglish ? "left-0 bg-[#2563EB]" : "left-1/2 bg-[#C8102E]"
        )}
      />

      {/* EN label */}
      <span
        className={cn(
          "relative z-10 flex-1 text-center py-1 transition-colors duration-300",
          isEnglish ? "text-white" : "text-black/50"
        )}
      >
        EN
      </span>

      {/* FR label */}
      <span
        className={cn(
          "relative z-10 flex-1 text-center py-1 transition-colors duration-300",
          !isEnglish ? "text-white" : "text-black/50"
        )}
      >
        FR
      </span>
    </button>
  );
}
