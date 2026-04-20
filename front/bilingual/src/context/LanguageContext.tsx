"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Language } from "@/types/language";
import { content } from "@/lib/content";

interface LanguageContextValue {
  language: Language;
  setLang: (lang: Language) => void;
  t: (typeof content)["en"];
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const setLang = useCallback((lang: Language) => {
    setLanguage(lang);
}, []);

  const value: LanguageContextValue = {
    language,
    setLang,
    t: content[language],
    isEnglish: language === "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
