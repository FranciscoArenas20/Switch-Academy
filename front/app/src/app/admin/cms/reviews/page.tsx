"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReviews } from "@/lib/supabaseQueries";
import type { Review } from "@/types";

export default function ReviewsListPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const data = await getReviews();
    setReviews(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta review?")) return;
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="font-body text-black/40">Cargando reviews...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-black">
            Reviews
          </h1>
          <p className="font-body text-sm text-black/50 mt-1">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/cms/reviews/new")}
          className="px-5 py-2.5 rounded-full bg-black text-white font-body text-sm font-medium hover:bg-black/80 transition-all"
        >
          + Nueva review
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="font-body text-black/40">No hay reviews todavía.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10">
                {["Estudiante", "Texto", "Idioma", "Fecha", "Acciones"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left font-body text-xs text-black/40 uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, i) => (
                <tr
                  key={review.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-black/[0.02]"}
                >
                  <td className="px-5 py-4 font-body text-sm font-medium text-black">
                    {review.student_name}
                  </td>
                  <td className="px-5 py-4 font-body text-sm text-black/50 max-w-xs truncate">
                    {review.text}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-black/5 font-body text-xs font-medium text-black">
                      {review.language}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-body text-sm text-black/40">
                    {new Date(review.created_at).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/cms/reviews/${review.id}/edit`)
                        }
                        className="px-3 py-1.5 rounded-full bg-black/5 font-body text-xs text-black/70 hover:text-black hover:bg-black/10 transition-all"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
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
