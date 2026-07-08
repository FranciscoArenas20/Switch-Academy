"use client";

import { useEffect, useState } from "react";

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
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    if (res.ok) {
      const data = await res.json();
      setLeads(data || []);
    }
    setLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="font-body text-black/40">Cargando leads...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-black">
            Dashboard
          </h1>
          <p className="font-body text-sm text-black/50 mt-1">
            {leads.length} lead{leads.length !== 1 ? "s" : ""} registrado{leads.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="font-body text-black/40">Aún no hay leads registrados.</p>
        </div>
      ) : (
        <>
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
                    <td className="px-5 py-4 font-body text-xs text-black/40 whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
  );
}
