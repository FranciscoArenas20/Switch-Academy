"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { blogPosts as mockPosts } from "@/lib/mockData";
import { client, imageUrl } from "@/lib/sanity";
import { BLOG_POSTS_QUERY } from "@/lib/queries";
import { useLanguage } from "@/context/LanguageContext";
import type { SanityBlogPost } from "@/types/sanity";

function mapSanityPost(p: SanityBlogPost) {
  return {
    id: p.slug,
    image: imageUrl(p.mainImage, 600) ?? p.imageUrl ?? "",
    title: p.title,
    excerpt: p.excerpt,
    description: p.body,
  };
}

export default function BlogSection() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState(mockPosts);

  useEffect(() => {
    client.fetch<SanityBlogPost[]>(BLOG_POSTS_QUERY).then((data) => {
      if (data && data.length > 0) {
        setPosts(data.map(mapSanityPost));
      }
    });
  }, []);

  return (
    <section id="blog" className="scroll-mt-16 py-20 bg-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-display text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-black mb-3 lang-transition">
            {t.blog.title}
          </h2>
          <p className="font-body text-base text-black/55 max-w-lg lang-transition">
            {t.blog.subtitle}
          </p>
        </div>

        <InfiniteCarousel
          items={posts}
          visibleCount={{ default: 1, md: 2, lg: 3 }}
          renderItem={(post) => (
            <Link
              href={`/blog/${post.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group"
            >
              {post.image ? (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] bg-black/5" />
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold text-black mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-black/55 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-black/50 group-hover:text-black transition-colors mt-auto">
                  Read full post
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          )}
        />
      </div>
    </section>
  );
}
