"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPosts } from "@/lib/supabaseQueries";
import type { BlogPost } from "@/types";

export default function PostsListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="font-body text-black/40">Cargando posts...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-black">
            Posts
          </h1>
          <p className="font-body text-sm text-black/50 mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/cms/posts/new")}
          className="px-5 py-2.5 rounded-full bg-black text-white font-body text-sm font-medium hover:bg-black/80 transition-all"
        >
          + Nuevo post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="font-body text-black/40">No hay posts todavía.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10">
                {["Título", "Slug", "Fecha", "Acciones"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left font-body text-xs text-black/40 uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr
                  key={post.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-black/[0.02]"}
                >
                  <td className="px-5 py-4 font-body text-sm font-medium text-black max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="px-5 py-4 font-body text-sm text-black/50">
                    {post.slug}
                  </td>
                  <td className="px-5 py-4 font-body text-sm text-black/40">
                    {new Date(post.created_at).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/cms/posts/${post.id}/edit`)
                        }
                        className="px-3 py-1.5 rounded-full bg-black/5 font-body text-xs text-black/70 hover:text-black hover:bg-black/10 transition-all"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1.5 rounded-full bg-red-50 font-body text-xs text-red-500 hover:bg-red-100 transition-all"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
