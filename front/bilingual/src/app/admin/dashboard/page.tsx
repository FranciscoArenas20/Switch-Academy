"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Lead {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  telefono: string | null;
  idioma: string;
  mensaje: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionAndFetch();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          router.push("/admin/login");
        } else {
          fetchLeads();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkSessionAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push("/admin/login");
      return;
    }

    await fetchLeads();
  };

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-[#F5F2EC] p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-black">
              Switch Academy
            </h1>
            <p className="font-body text-sm text-black/50 mt-1">
              {leads.length} lead{leads.length !== 1 ? "s" : ""} registrado{leads.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/studio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#2563EB] text-white font-body text-sm hover:bg-[#1d4ed8] transition-all"
            >
              + Agregar nuevo post
            </a>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-full border border-black/15 bg-white text-black font-body text-sm hover:bg-black/5 transition-all"
            >
              Ver página
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-black text-white font-body text-sm hover:bg-black/80 transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <p className="font-body text-black/40">Cargando leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <p className="font-body text-black/40">Aún no hay leads registrados.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-black/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/10">
                    {["Nombre", "Email", "Teléfono", "Idioma", "Mensaje", "Fecha"].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left font-body text-xs text-black/40 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr
                      key={lead.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-black/[0.02]"}
                    >
                      <td className="px-5 py-4 font-body text-sm font-medium text-black">
                        {lead.nombre}
                      </td>
                      <td className="px-5 py-4 font-body text-sm text-black/70">
                        <a href={`mailto:${lead.email}`} className="hover:underline">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-5 py-4 font-body text-sm text-black/70">
                        {lead.telefono || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-black/5 font-body text-xs font-medium text-black">
                          {lead.idioma}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-body text-sm text-black/50 max-w-xs truncate">
                        {lead.mensaje || "—"}
                      </td>
                      <td className="px-5 py-4 font-body text-xs text-black/40">
                        {formatDate(lead.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden flex flex-col gap-3">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-white rounded-2xl border border-black/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-body font-semibold text-sm text-black">{lead.nombre}</p>
                    <span className="px-2.5 py-1 rounded-full bg-black/5 font-body text-xs font-medium text-black">
                      {lead.idioma}
                    </span>
                  </div>
                  <a href={`mailto:${lead.email}`} className="font-body text-sm text-black/60 hover:underline block mb-1">
                    {lead.email}
                  </a>
                  {lead.telefono && (
                    <p className="font-body text-sm text-black/60 mb-1">{lead.telefono}</p>
                  )}
                  {lead.mensaje && (
                    <p className="font-body text-sm text-black/50 mt-2 pt-2 border-t border-black/5">
                      {lead.mensaje}
                    </p>
                  )}
                  <p className="font-body text-xs text-black/30 mt-3">
                    {formatDate(lead.created_at)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}