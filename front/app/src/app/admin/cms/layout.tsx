"use client";

import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { href: "/admin/cms/dashboard", label: "Leads" },
  { href: "/admin/cms/posts", label: "Posts" },
  { href: "/admin/cms/reviews", label: "Reviews" },
];

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] flex">
      <aside className="w-56 shrink-0 bg-white border-r border-black/10 flex flex-col">
        <div className="p-5 border-b border-black/10">
          <Link href="/">
            <h2 className="font-display font-bold text-lg text-black hover:opacity-70 transition-all">
              Switch Academy
            </h2>
          </Link>
          <p className="font-body text-xs text-black/40 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-2.5 rounded-xl font-body text-sm transition-all",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-black text-white font-medium"
                  : "text-black/60 hover:text-black hover:bg-black/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-black/10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 rounded-xl font-body text-sm text-black/50 hover:text-black hover:bg-black/5 transition-all text-left"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
