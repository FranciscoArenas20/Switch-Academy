import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Creamos la respuesta inicial
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Inicializamos el cliente de Supabase adaptado al Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // CORREGIDO: Leemos directamente desde las cookies del request entrante
          return request.cookies.getAll() as any;
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: Record<string, string> }[]
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. CORREGIDO: Usamos getUser() para proteger rutas de manera segura.
  // Esto también se encarga de refrescar el Auth Token si está expirado internamente.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Lógica de redirección protegida
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login") &&
    !user // CORREGIDO: Evaluamos el usuario validado, no la sesión cruda
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  // Te recomiendo agregar el Middleware también a los archivos estáticos si no deseas problemas,
  // pero para rutas '/admin' tu matcher actual funciona bien.
  matcher: ["/admin/:path*"],
};