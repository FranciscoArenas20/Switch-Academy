"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) onChange(data.secure_url);
    } catch {
      alert("Error al subir la imagen");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label className="font-body text-xs text-black/50 uppercase tracking-widest mb-1.5 block">
        Imagen
      </label>

      {value && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-black/10 bg-black/5 max-w-sm">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2.5 rounded-full bg-black/5 font-body text-sm text-black/70 hover:text-black hover:bg-black/10 disabled:opacity-50 transition-all"
        >
          {uploading ? "Subiendo..." : "Seleccionar archivo"}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-4 py-2.5 rounded-full bg-red-50 font-body text-xs text-red-500 hover:bg-red-100 transition-all"
          >
            Quitar
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="O pega una URL manualmente..."
        className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white font-body text-sm outline-none focus:ring-2 focus:ring-black/20 transition-all"
      />
    </div>
  );
}
