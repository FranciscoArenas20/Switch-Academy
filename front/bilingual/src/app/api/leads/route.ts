import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, idioma, mensaje } = body;

    // Validación de campos obligatorios
    if (!nombre || !email || !idioma) {
      return NextResponse.json(
        { error: "Nombre, email e idioma son obligatorios" },
        { status: 400 }
      );
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("leads").insert([
      {
        nombre,
        email,
        telefono: telefono || null,
        idioma,
        mensaje: mensaje || null,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}