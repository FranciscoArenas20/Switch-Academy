"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/ImageUpload";


export default function NewReviewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    student_name: "",
    text: "",
    language: "English",
    photo_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

    const res = await fetch("/api/reviews", {
      method: "POST",
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
      setError("Error al crear la review.");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => router.back()}
        className="font-body text-sm text-black/50 hover:text-black transition-colors mb-6 inline-block"
      >
        ← Volver
      </button>

      <h1 className="font-display text-2xl font-extrabold text-black mb-8">
        Nueva review
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
            {saving ? "Guardando..." : "Guardar review"}
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
