"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/language";
import Link from "next/link";

const contactContent = {
  en: {
    title: "Get in Touch",
    subtitle: "Ready to start your language journey? Reach out and let's talk.",
    email: { label: "Email", value: "alex@switchacademy.com" },
    whatsapp: { label: "WhatsApp", value: "+1 (000) 000-0000" },
    instagram: { label: "Instagram", value: "@switchacademy" },
    schedule: { label: "Availability", value: "Mon – Fri · 8:00 AM – 8:00 PM" },
    timezone: { label: "Timezone", value: "CET (Paris, France)" },
    response: { label: "Response time", value: "Usually within 24 hours" },
  },
  fr: {
    title: "Contactez-moi",
    subtitle: "Prêt à commencer ton voyage linguistique ? Écris-moi et parlons-en.",
    email: { label: "Email", value: "alex@switchacademy.com" },
    whatsapp: { label: "WhatsApp", value: "+1 (000) 000-0000" },
    instagram: { label: "Instagram", value: "@switchacademy" },
    schedule: { label: "Disponibilité", value: "Lun – Ven · 8h00 – 20h00" },
    timezone: { label: "Fuseau horaire", value: "CET (Paris, France)" },
    response: { label: "Temps de réponse", value: "Généralement sous 24 heures" },
  },
  es: {
    title: "Contáctame",
    subtitle: "¿Listo para empezar tu viaje lingüístico? Escríbeme y hablamos.",
    email: { label: "Email", value: "alex@switchacademy.com" },
    whatsapp: { label: "WhatsApp", value: "+1 (000) 000-0000" },
    instagram: { label: "Instagram", value: "@switchacademy" },
    schedule: { label: "Disponibilidad", value: "Lun – Vie · 8:00 AM – 8:00 PM" },
    timezone: { label: "Zona horaria", value: "CET (París, Francia)" },
    response: { label: "Tiempo de respuesta", value: "Generalmente en menos de 24 horas" },
  },
};

export default function ContactSection() {
  const { language } = useLanguage();
  const c = contactContent[language];

  const accentColors: Record<Language, string> = {
    en: "bg-[#2563EB]",
    fr: "bg-[#C8102E]",
    es: "bg-[#16A34A]",
  };

  const accentHex: Record<Language, string> = {
    en: "#2563EB",
    fr: "#C8102E",
    es: "#16A34A",
  };

  const accentTexts: Record<Language, string> = {
    en: "text-[#2563EB]",
    fr: "text-[#C8102E]",
    es: "text-[#16A34A]",
  };

  const accentColor = accentColors[language];
  const accentText = accentTexts[language];

  const contactItems = [
    {
      icon: "✉",
      label: c.email.label,
      value: c.email.value,
      href: `mailto:${c.email.value}`,
      clickable: true,
    },
    {
      icon: "💬",
      label: c.whatsapp.label,
      value: c.whatsapp.value,
      href: `https://wa.me/${c.whatsapp.value.replace(/\D/g, "")}`,
      clickable: true,
    },
    {
      icon: "📸",
      label: c.instagram.label,
      value: c.instagram.value,
      href: `https://instagram.com/switchacademy`,
      clickable: true,
    },
    {
      icon: "🕐",
      label: c.schedule.label,
      value: c.schedule.value,
      clickable: false,
    },
    {
      icon: "🌍",
      label: c.timezone.label,
      value: c.timezone.value,
      clickable: false,
    },
    {
      icon: "⚡",
      label: c.response.label,
      value: c.response.value,
      clickable: false,
    },
  ];

  return (
    <section id="contacto" className="py-24 bg-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <h2 className="font-display text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-black mb-4 lang-transition">
            {c.title}
          </h2>
          <p className="font-body text-base text-black/55 max-w-md lang-transition">
            {c.subtitle}
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactItems.map((item) =>
            item.clickable ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--accent": accentHex[language] } as React.CSSProperties}
                className={cn(
                  "group flex items-start gap-4 p-6 rounded-2xl border-2 border-transparent bg-white",
                  "transition-all duration-300 hover:shadow-md hover:border-[var(--accent)]"
                )}
              >
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-body text-xs text-black/40 uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  <p className={cn("font-body font-semibold text-sm lang-transition", accentText)}>
                    {item.value}
                  </p>
                </div>
              </a>
            ) : (
              <div
                key={item.label}
                style={{ "--accent": accentHex[language] } as React.CSSProperties}
                className={cn(
                  "flex items-start gap-4 p-6 rounded-2xl border-2 border-transparent bg-white",
                  "transition-all duration-300 hover:shadow-md hover:border-[var(--accent)]"
                )}
              >
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-body text-xs text-black/40 uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  <p className="font-body font-semibold text-sm text-black lang-transition">
                    {item.value}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Divider */}
        <div className={cn("mt-16 pt-8 border-t border-black/10 flex items-center justify-between flex-wrap gap-4")}>
          <Link href="/admin/login"><p className="font-body text-sm text-black/40">
            © {new Date().getFullYear()} Switch Academy · Alex
          </p>
        </Link>
          <div className={cn("w-8 h-1 rounded-full", accentColor)} />
        </div>

      </div>
    </section>
  );
}