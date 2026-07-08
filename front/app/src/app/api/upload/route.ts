import { NextRequest, NextResponse } from "next/server";
import { uploadImageFromUrl } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "URL es obligatoria" },
        { status: 400 }
      );
    }

    const secureUrl = await uploadImageFromUrl(url);

    if (!secureUrl) {
      return NextResponse.json(
        { error: "Error al subir la imagen" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: secureUrl });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
