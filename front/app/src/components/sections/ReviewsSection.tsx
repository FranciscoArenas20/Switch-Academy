"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { reviews as mockReviews } from "@/lib/mockData";
import { getReviews } from "@/lib/supabaseQueries";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import type { Review } from "@/types";

const languageBadge: Record<string, string> = {
  English: "bg-[#2563EB]",
  French: "bg-[#C8102E]",
};

export default function ReviewsSection() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState(mockReviews);

  useEffect(() => {
    getReviews().then((data) => {
      if (data.length > 0) {
        setReviews(
          data.map((r: Review) => ({
            id: r.id,
            name: r.student_name,
            photo: r.photo_url ?? "",
            text: r.text,
            language: r.language,
          }))
        );
      }
    });
  }, []);

  return (
    <section id="reviews" className="scroll-mt-16 py-20 bg-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-display text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-black mb-3 lang-transition">
            {t.reviewsSection.title}
          </h2>
          <p className="font-body text-base text-black/55 max-w-lg lang-transition">
            {t.reviewsSection.subtitle}
          </p>
        </div>

        <InfiniteCarousel
          items={reviews}
          visibleCount={{ default: 1, md: 2, lg: 3 }}
          renderItem={(review) => (
            <div className="bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 bg-black/5">
                  {review.photo ? (
                    <Image
                      src={review.photo}
                      alt={review.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-black">
                    {review.name}
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <svg
                  className="text-black/10 mb-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="font-body text-sm text-black/65 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-black/5">
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-white text-xs font-body font-semibold",
                    languageBadge[review.language] ?? "bg-black/40"
                  )}
                >
                  {review.language}
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
