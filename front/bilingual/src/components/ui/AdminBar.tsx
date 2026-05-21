"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";

export default function AdminBar() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escuchar cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // Si no hay sesión no renderiza nada
  if (!session) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Botón Ver Leads */}
      <Link
        href="/admin/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black text-white font-body text-sm font-medium shadow-lg hover:bg-black/80 transition-all"
      >
        <span>📋</span>
        <span>Ver Leads</span>
      </Link>

      {/* Botón cerrar sesión */}
      <button
        onClick={handleLogout}
        className="px-4 py-2.5 rounded-full bg-white border border-black/15 text-black font-body text-sm font-medium shadow-lg hover:bg-black/5 transition-all"
      >
        Salir
      </button>
    </div>
  );
}