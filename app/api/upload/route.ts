import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada berkas yang diunggah." },
        { status: 400 }
      );
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;

    // Jika token Vercel Blob belum diisi atau masih berupa placeholder default
    if (!token || token.includes("xxxxxxxx")) {
      const mockFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      return NextResponse.json({
        url: `https://demo-storage.ktr.local/uploads/${Date.now()}_${mockFileName}`,
        pathname: mockFileName,
        isMock: true,
        message:
          "File berhasil diterima dalam mode simulasi. Untuk mengaktifkan penyimpan cloud nyata, isi token BLOB_READ_WRITE_TOKEN di file .env.",
      });
    }

    // Unggah file asli ke Vercel Blob Storage dengan random suffix unik agar tidak bentrok nama file
    const blob = await put(file.name, file, {
      access: "public",
      token,
      addRandomSuffix: true,
    });

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      isMock: false,
    });
  } catch (error) {
    console.error("Vercel Blob upload error:", error);
    return NextResponse.json(
      { error: "Gagal mengunggah berkas ke Vercel Blob Storage." },
      { status: 500 }
    );
  }
}
