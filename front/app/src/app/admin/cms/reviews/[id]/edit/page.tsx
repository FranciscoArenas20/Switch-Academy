"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getReviews } from "@/lib/supabaseQueries";
import ImageUpload from "@/components/ui/ImageUpload";

export default function EditReviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    student_name: "",
    text: "",
    language: "English",
    photo_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReview();
  }, []);

  const loadReview = async () => {
    const reviews = await getReviews();
    const review = reviews.find((r) => r.id === id);
    if (review) {
      setForm({
        student_name: review.student_name,
        text: review.text,
        language: review.language,
        photo_url: review.photo_url ?? "",
      });
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!form.student_name || !form.text || !form.language) {
      setError("Todos los campos obligatorios deben completarse");
      setSaving(false);
      return;
    }

    const res = await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_name: form.student_name,
        text: form.text,
        language: form.language,
        photo_url: form.photo_url || undefined,
      }),
    });

    if (res.ok) {
      router.push("/admin/cms/reviews");
    } else {
      setError("Error al actualizar la review.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="font-body text-black/40">Cargando review...</p>
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
        Editar review
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
            Nombre del estudiante *
          </label>
          <input
            name="student_name"
            value={form.student_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all"
          />
        </div>

        <div>
          <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
            Texto *
          </label>
          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
          />
        </div>

        <div>
          <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
            Idioma *
          </label>
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all"
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

        <ImageUpload
          value={form.photo_url}
          onChange={(url) => setForm((prev) => ({ ...prev, photo_url: url }))}
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
