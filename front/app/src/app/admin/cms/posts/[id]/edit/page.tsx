"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPosts } from "@/lib/supabaseQueries";
import ImageUpload from "@/components/ui/ImageUpload";
import type { BlogPost } from "@/types";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    description: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const posts = await getPosts();
    const post = posts.find((p) => p.id === id);
    if (post) {
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? "",
        description: post.description ?? "",
        image_url: post.image_url ?? "",
      });
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!form.title || !form.slug) {
      setError("Título y slug son obligatorios");
      setSaving(false);
      return;
    }

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: form.slug,
        title: form.title,
        excerpt: form.excerpt || undefined,
        description: form.description || undefined,
        image_url: form.image_url || undefined,
      }),
    });

    if (res.ok) {
      router.push("/admin/cms/posts");
    } else {
      setError("Error al actualizar el post.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="font-body text-black/40">Cargando post...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => router.back()}
        className="font-body text-sm text-black/50 hover:text-black transition-colors mb-6 inline-block"
      >
        ← Volver
      </button>

      <h1 className="font-display text-2xl font-extrabold text-black mb-8">
        Editar post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
            Título *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all"
          />
        </div>

        <div>
          <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
            Slug *
          </label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all"
          />
        </div>

        <div>
          <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
            Extracto
          </label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
          />
        </div>

        <div>
          <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
            Contenido
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
          />
        </div>

        <ImageUpload
          value={form.image_url}
          onChange={(url) => setForm((prev) => ({ ...prev, image_url: url }))}
        />

        {error && (
          <p className="font-body text-sm text-red-500">{error}</p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-full bg-black text-white font-body text-sm font-medium hover:bg-black/80 disabled:opacity-60 transition-all"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-full bg-white border border-black/15 text-black font-body text-sm hover:bg-black/5 transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
