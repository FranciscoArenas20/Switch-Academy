import { blogPosts as mockPosts } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import OtherPosts from "./OtherPosts";

export const revalidate = 60;
export const dynamicParams = true;

interface PostItem {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  description: string;
}

export async function generateStaticParams() {
  const ids: { id: string }[] = mockPosts.map((p) => ({ id: p.id }));
  const { data } = await supabaseAdmin.from("blog_posts").select("slug");
  for (const p of data ?? []) {
    if (p.slug) ids.push({ id: p.slug });
  }
  return ids;
}

async function getPost(id: string): Promise<PostItem | null> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", id)
    .single();
  if (!error && data) {
    return {
      id: data.slug,
      image: data.image_url ?? "",
      title: data.title,
      excerpt: data.excerpt ?? "",
      description: data.description ?? "",
    };
  }
  const mock = mockPosts.find((p) => p.id === id);
  return mock
    ? { id: mock.id, image: mock.image, title: mock.title, excerpt: mock.excerpt, description: mock.description }
    : null;
}

async function getOtherPosts(id: string): Promise<PostItem[]> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .neq("slug", id)
    .order("created_at", { ascending: false });
  if (!error && data && data.length > 0) {
    return data.map((p: { slug: string; image_url: string | null; title: string; excerpt: string | null; description: string | null }) => ({
      id: p.slug,
      image: p.image_url ?? "",
      title: p.title,
      excerpt: p.excerpt ?? "",
      description: p.description ?? "",
    }));
  }
  return mockPosts.filter((p) => p.id !== id).map((p) => ({
    id: p.id,
    image: p.image,
    title: p.title,
    excerpt: p.excerpt,
    description: p.description,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Switch Academy`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  const otherPosts = await getOtherPosts(id);

  return (
    <main className="min-h-screen bg-[#F5F2EC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-sm text-black/50 hover:text-black transition-colors mb-10"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </Link>

        {post.image && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-tight tracking-tight text-black mb-8">
          {post.title}
        </h1>

        {post.description && (
          <div className="font-body text-base text-black/65 leading-relaxed space-y-5 mb-16">
            {post.description.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        <div className="border-t border-black/10 mb-12" />

        <OtherPosts posts={otherPosts} />
      </div>
    </main>
  );
}
