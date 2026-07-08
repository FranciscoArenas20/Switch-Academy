"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Credenciales incorrectas");
      setLoading(false);
      return;
    }

    window.location.href = "/admin/cms/posts";
  };

  return (
    <main className="min-h-screen bg-[#F5F2EC] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold text-black mb-1">
            Switch Academy
          </h1>
          <p className="font-body text-sm text-black/50">Admin access</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>

          <div>
            <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>

          {error && (
            <p className="font-body text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-8 py-3.5 rounded-full bg-black text-white font-body font-medium text-sm transition-all hover:bg-black/80 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-8 py-3.5 rounded-full bg-white text-black border border-black/15 font-body font-medium text-sm transition-all hover:bg-black/5"
          >
            Volver a la página
          </button>
        </form>
      </div>
    </main>
  );
}
