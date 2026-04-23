"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/language";

const featureImages: Record<string, Record<Language, string>> = {
  expert: {
    en: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80&fit=crop",
    fr: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80&fit=crop",
    es: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=400&q=80&fit=crop",
  },
  flexible: {
    en: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80&fit=crop",
    fr: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80&fit=crop",
    es: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&q=80&fit=crop",
  },
  global: {
    en: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80&fit=crop",
    fr: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80&fit=crop",
    es: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80&fit=crop",
  },
};

const globalCardColors: Record<Language, string> = {
  en: "bg-[#7c3aed]",
  fr: "bg-[#1E3A5F]",
  es: "bg-[#16A34A]",
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
      cardClass: "bg-[#1a1a2e]",
      textClass: "text-white",
      subTextClass: "text-white/60",
    },
    {
      key: "global",
      title: t.features.global.title,
      description: t.features.global.description,
      image: featureImages.global[language],
      cardClass: globalCardColors[language],
      textClass: "text-white",
      subTextClass: "text-white/70",
    },
  ];

  return (
    <section className="py-6 pb-20 bg-[#F5F2EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

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

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <h3
          className={cn(
            "font-display text-lg font-bold mb-2 lang-transition",
            feature.textClass
          )}
        >
          {feature.title}
        </h3>
        <p
          className={cn(
            "font-body text-xs leading-relaxed lang-transition",
            feature.subTextClass
          )}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}
