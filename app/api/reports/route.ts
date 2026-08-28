import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      reporterInitials,
      violationType,
      settingCategory,
      violationLocation,
      description,
      evidenceUrl,
    } = body;

    // Validation
    if (!reporterInitials || !violationLocation || !description) {
      return NextResponse.json(
        { error: "Data laporan tidak lengkap." },
        { status: 400 }
      );
    }

    // Anti-spam validation
    if (description.trim().length < 10) {
      return NextResponse.json(
        { error: "Deskripsi terlalu pendek (minimal 10 karakter)." },
        { status: 400 }
      );
    }

    // Generate unique Ticket ID: KTR-XXXX-2026
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const ticketId = `KTR-${randomHex}-2026`;

    let report = null;
    let isDatabaseSaved = false;

    try {
      report = await prisma.report.create({
        data: {
          ticketId,
          reporterInitials: reporterInitials.trim().toUpperCase(),
          violationType: violationType || "Lainnya",
          settingCategory: settingCategory || "umum",
          violationLocation: violationLocation.trim(),
          description: description.trim(),
          evidenceUrl: evidenceUrl || null,
          status: "PENDING",
          notes: "Laporan Anda berhasil masuk ke antrean verifikasi petugas satgas setempat.",
        },
      });
      isDatabaseSaved = true;
    } catch (dbError) {
      console.warn("Database PostgreSQL/Prisma connection skipped or unconfigured, using fallback response:", dbError);
    }

    return NextResponse.json({
      success: true,
      ticketId,
      isDatabaseSaved,
      report: report || {
        ticketId,
        reporterInitials: reporterInitials.trim().toUpperCase(),
        violationType,
        settingCategory,
        violationLocation,
        description,
        evidenceUrl,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("API Report creation error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan laporan ke server." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticketId = searchParams.get("ticketId");

    if (!ticketId) {
      return NextResponse.json(
        { error: "Kode tiket diperlukan." },
        { status: 400 }
      );
    }

    try {
      const report = await prisma.report.findUnique({
        where: { ticketId: ticketId.trim().toUpperCase() },
      });

      if (report) {
        return NextResponse.json({
          found: true,
          report: {
            ticketId: report.ticketId,
            reporterInitials: report.reporterInitials,
            violationType: report.violationType,
            settingCategory: report.settingCategory,
            violationLocation: report.violationLocation,
            description: report.description,
            evidenceUrl: report.evidenceUrl,
            status: report.status === "PENDING" ? "Menunggu review" : report.status,
            notes: report.notes || "Laporan sedang ditinjau oleh petugas satgas.",
            createdAt: new Date(report.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }) + " WIB",
          },
        });
      }
    } catch (dbError) {
      console.warn("Database lookup error:", dbError);
    }

    return NextResponse.json({ found: false });
  } catch (error) {
    console.error("API Report tracking error:", error);
    return NextResponse.json(
      { error: "Gagal melacak data laporan." },
      { status: 500 }
    );
  }
}
