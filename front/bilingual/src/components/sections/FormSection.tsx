"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/language";

const formContent = {
  en: {
    title: "Book a Free Trial",
    subtitle: "Fill in your details and Alex will get back to you within 24 hours.",
    fields: {
      nombre: { label: "Full name", placeholder: "John Doe" },
      email: { label: "Email", placeholder: "john@email.com" },
      telefono: { label: "Phone (optional)", placeholder: "+1 000 000 0000" },
      idioma: { label: "Which language?", placeholder: "Select an option" },
      mensaje: { label: "Message (optional)", placeholder: "Tell Alex about your goals..." },
    },
    options: ["English", "French", "Both"],
    cta: "Send message",
    sending: "Sending...",
    success: "Message sent! Alex will contact you soon.",
    error: "Something went wrong. Please try again.",
  },
  fr: {
    title: "Réserve un cours d'essai",
    subtitle: "Remplis le formulaire et Alex te répondra dans les 24 heures.",
    fields: {
      nombre: { label: "Nom complet", placeholder: "Jean Dupont" },
      email: { label: "Email", placeholder: "jean@email.com" },
      telefono: { label: "Téléphone (optionnel)", placeholder: "+33 0 00 00 00 00" },
      idioma: { label: "Quelle langue ?", placeholder: "Choisir une option" },
      mensaje: { label: "Message (optionnel)", placeholder: "Parle à Alex de tes objectifs..." },
    },
    options: ["Anglais", "Français", "Les deux"],
    cta: "Envoyer le message",
    sending: "Envoi en cours...",
    success: "Message envoyé ! Alex te contactera bientôt.",
    error: "Une erreur s'est produite. Réessaie.",
  },
  es: {
    title: "Agenda una clase de prueba",
    subtitle: "Completa el formulario y Alex te contactará en menos de 24 horas.",
    fields: {
      nombre: { label: "Nombre completo", placeholder: "Juan Pérez" },
      email: { label: "Email", placeholder: "juan@email.com" },
      telefono: { label: "Teléfono (opcional)", placeholder: "+34 000 000 000" },
      idioma: { label: "¿Qué idioma te interesa?", placeholder: "Selecciona una opción" },
      mensaje: { label: "Mensaje (opcional)", placeholder: "Cuéntale a Alex tus objetivos..." },
    },
    options: ["Inglés", "Francés", "Ambos"],
    cta: "Enviar mensaje",
    sending: "Enviando...",
    success: "¡Mensaje enviado! Alex te contactará pronto.",
    error: "Algo salió mal. Por favor intenta de nuevo.",
  },
};

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  idioma: string;
  mensaje: string;
}

export default function FormSection() {
  const { language } = useLanguage();
  const c = formContent[language];

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    idioma: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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

  const accentFocus: Record<Language, string> = {
    en: "focus:ring-[#2563EB]",
    fr: "focus:ring-[#C8102E]",
    es: "focus:ring-[#16A34A]",
  };

  const accentColor = accentColors[language];
  const accentHover = accentHovers[language];
  const focusRing = accentFocus[language];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setFormData({ nombre: "", email: "", telefono: "", idioma: "", mensaje: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = cn(
    "w-full px-4 py-3 rounded-xl border border-black/15 bg-white",
    "font-body text-sm text-black placeholder:text-black/30",
    "outline-none focus:ring-2 transition-all duration-200",
    focusRing
  );

  return (
    <section id="formulario" className="scroll-mt-16 py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: text */}
          <div className="lg:sticky lg:top-24">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-black mb-4 lang-transition">
              {c.title}
            </h2>
            <p className="font-body text-base text-black/55 leading-relaxed lang-transition">
              {c.subtitle}
            </p>
          </div>

          {/* Right: form */}
          <div>
            {status === "success" ? (
              <div className={cn(
                "rounded-2xl p-8 text-white text-center",
                accentColor
              )}>
                <p className="font-display text-2xl font-bold mb-2">✓</p>
                <p className="font-body text-base">{c.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Nombre */}
                <div>
                  <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
                    {c.fields.nombre.label}
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder={c.fields.nombre.placeholder}
                    className={inputClass}
                  />
                </div>

                {/* Email + Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
                      {c.fields.email.label}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={c.fields.email.placeholder}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
                      {c.fields.telefono.label}
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder={c.fields.telefono.placeholder}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Idioma */}
                <div>
                  <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
                    {c.fields.idioma.label}
                  </label>
                  <select
                    name="idioma"
                    required
                    value={formData.idioma}
                    onChange={handleChange}
                    className={cn(inputClass, "cursor-pointer")}
                  >
                    <option value="" disabled>{c.fields.idioma.placeholder}</option>
                    {c.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
                    {c.fields.mensaje.label}
                  </label>
                  <textarea
                    name="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder={c.fields.mensaje.placeholder}
                    className={cn(inputClass, "resize-none")}
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="font-body text-sm text-red-500">{c.error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={cn(
                    "mt-2 px-8 py-3.5 rounded-full text-white font-body font-medium text-sm",
                    "transition-all duration-300 active:scale-95 disabled:opacity-60",
                    accentColor,
                    accentHover
                  )}
                >
                  {status === "sending" ? c.sending : c.cta}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}