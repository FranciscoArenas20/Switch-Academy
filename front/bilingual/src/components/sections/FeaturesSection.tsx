"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/language";

const featureImages: Record<string, Record<Language, string>> = {
  expert: {
    en: "/images/cursos.avif",
    fr: "/images/cursos.avif",
    es: "/images/cursos.avif",
  },
  flexible: {
    en: "/images/certificados.avif",
    fr: "/images/certificados.avif",
    es: "/images/certificados.avif",
  },
  global: {
    en: "/images/otros.png",
    fr: "/images/otros.png",
    es: "/images/otros.png",
  },
};

export default function FeaturesSection() {
  const { t, language } = useLanguage();

  const features = [
    {
      key: "expert",
      title: t.features.expert.title,
      description: t.features.expert.description,
      image: featureImages.expert[language],
      cardClass: "bg-[#0A0A0A]",
      textClass: "text-white",
      subTextClass: "text-white/60",
    },
    {
      key: "flexible",
      title: t.features.flexible.title,
      description: t.features.flexible.description,
      image: featureImages.flexible[language],
      cardClass: "bg-[#0A0A0A]",
      textClass: "text-white",
      subTextClass: "text-white/60",
    },
    {
      key: "global",
      title: t.features.global.title,
      description: t.features.global.description,
      image: featureImages.global[language],
      cardClass: "bg-[#0A0A0A]",
      textClass: "text-white",
      subTextClass: "text-white/70",
    },
  ];

  return (
    <section id="cursos" className="scroll-mt-18 py-20 bg-[#F5F2EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <h2 className="font-display text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-black mb-4 lang-transition">
            {t.features.title}
          </h2>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-4">
          {features.map((feature) => (
            <FeatureCard key={feature.key} feature={feature} />
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="sm:hidden flex flex-col gap-4">
          {features.map((feature) => (
            <FeatureCard key={feature.key} feature={feature} mobile />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Feature {
  key: string;
  title: string;
  description: string;
  image: string;
  cardClass: string;
  textClass: string;
  subTextClass: string;
}

function FeatureCard({
  feature,
  mobile = false,
}: {
  feature: Feature;
  mobile?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden transition-colors duration-500",
        feature.cardClass,
        mobile ? "min-h-[200px]" : "aspect-[3/4]"
      )}
    >
      <Image
        src={feature.image}
        alt={feature.title}
        fill
        className="object-cover opacity-40 lang-transition"
        sizes="(max-width: 640px) 100vw, 33vw"
      />

      <div className="absolute inset-0 flex flex-col justify-start p-5">
        <h3
          className={cn(
            "font-display text-2xl lg:text-3xl font-bold mb-2 lang-transition",
            feature.textClass
          )}
        >
          {feature.title}
        </h3>
        <p
          className={cn(
            "font-body text-lg lang-transition",
            feature.subTextClass
          )}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}
