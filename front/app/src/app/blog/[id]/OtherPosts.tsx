"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PER_PAGE = 9;

interface PostItem {
  id: string;
  image: string;
  title: string;
}

export default function OtherPosts({ posts }: { posts: PostItem[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(posts.length / PER_PAGE);
  const visible = posts.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  if (!posts.length) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-black mb-6">
        More articles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {visible.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.id}`}
            className="bg-white rounded-xl overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition-all group"
          >
            {p.image ? (
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] bg-black/5" />
            )}
            <div className="p-4">
              <h3 className="font-display font-bold text-sm text-black line-clamp-2 leading-snug">
                {p.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="font-body text-sm text-black/50 hover:text-black disabled:opacity-30 transition-colors"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={cn(
                "w-8 h-8 rounded-full font-body text-sm transition-all",
                i === page
                  ? "bg-black text-white"
                  : "text-black/50 hover:text-black hover:bg-black/5"
              )}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="font-body text-sm text-black/50 hover:text-black disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
