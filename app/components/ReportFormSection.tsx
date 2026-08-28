"use client";

import React, { useState, useRef, useEffect } from "react";
import { KTR_REPORT, KTR_SETTINGS } from "../content/ktr";
import {
  CheckCircle2,
  Copy,
  Send,
  QrCode,
  AlertCircle,
  ShieldAlert,
  Upload,
  UserCheck,
  Building2,
  MapPin,
  FileCheck,
  Lock,
  X,
  Loader2,
  Eye,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ReportFormSectionProps {
  reporterInitials: string;
  setReporterInitials: (val: string) => void;
  reportType: string;
  setReportType: (val: string) => void;
  settingCategory: string;
  setSettingCategory: (val: string) => void;
  locationName: string;
  setLocationName: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  evidenceFile: File | null;
  setEvidenceFile: (file: File | null) => void;
  qrDetected: boolean;
  isSubmitted: boolean;
  isUploading: boolean;
  generatedTicketId: string;
  spamErrorMessage: string;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export default function ReportFormSection({
  reporterInitials,
  setReporterInitials,
  reportType,
  setReportType,
  settingCategory,
  setSettingCategory,
  locationName,
  setLocationName,
  description,
  setDescription,
  evidenceFile,
  setEvidenceFile,
  qrDetected,
  isSubmitted,
  isUploading,
  generatedTicketId,
  spamErrorMessage,
  onSubmit,
  onReset,
}: ReportFormSectionProps) {
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!evidenceFile) {
      setPreviewUrl(null);
      return;
    }

    if (evidenceFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(evidenceFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [evidenceFile]);

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(generatedTicketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 10 * 1024 * 1024) {
        alert("Ukuran berkas melebihi batas 10 MB.");
        return;
      }
      setEvidenceFile(selected);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEvidenceFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <motion.section
      id="lapor"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-24 space-y-8"
    >
      <div className="max-w-2xl space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 font-mono flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          Kanal Partisipasi Publik
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Formulir Pengaduan Pelanggaran KTR
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          Temukan aktivitas merokok, asbak terlarang, atau promosi tembakau di area bebas rokok? Kirimkan informasi secara aman untuk diverifikasi oleh Satgas KTR. Identitas Anda dijamin 100% rahasia.
        </p>
      </div>

      <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
        {isSubmitted ? (
          <div className="py-6 text-center space-y-5 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                Laporan Diterima Petugas
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Terima kasih atas partisipasi Anda
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengaduan Anda telah tercatat dalam sistem antrean Satgas KTR. Silakan simpan Kode Tiket di bawah ini untuk memantau proses tindak lanjut.
              </p>
            </div>

            {/* Banner Kode Tiket Pengaduan */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block">
                Kode Tiket Laporan Anda:
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-mono font-bold text-slate-900">
                  {generatedTicketId}
                </span>
                <button
                  onClick={handleCopyTicket}
                  type="button"
                  className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copied ? "Tersalin ✓" : "Salin Kode"}
                </button>
              </div>
            </div>

            <button
              onClick={onReset}
              className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs uppercase tracking-wider transition-colors"
            >
              Kirim Laporan Lain
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
            {/* Warning Peringatan Anti-Spam */}
            {spamErrorMessage && (
              <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{spamErrorMessage}</span>
              </div>
            )}

            {/* Field Anti-Spam Honeypot (Hidden for humans, filled by spam bots) */}
            <div className="hidden aria-hidden:true">
              <label htmlFor="website_hp">Leave this blank</label>
              <input
                type="text"
                id="website_hp"
                name="website_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* 1. Inisial Pelapor (Jawaban Isian - Identitas Disembunyikan) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-800" />
                  Inisial Pelapor
                </label>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-700" />
                  Identitas Disembunyikan
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={10}
                value={reporterInitials}
                onChange={(e) => setReporterInitials(e.target.value)}
                placeholder="Contoh: A.R. / N.N. (Inisial nama Anda)"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-900 transition-colors placeholder:text-slate-400 font-mono uppercase"
              />
              <p className="text-[11px] text-slate-500">
                Nama asli Anda tidak akan dipublikasikan. Hanya inisial yang dicatat untuk validasi sistem.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 2. Jenis Pelanggaran (List Pilihan) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Jenis Pelanggaran
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-900 transition-colors"
                >
                  {KTR_REPORT.types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Kategori Tatanan (List Pilihan 7 Tatanan KTR) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Kategori Tatanan KTR
                </label>
                <select
                  value={settingCategory}
                  onChange={(e) => setSettingCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-900 transition-colors"
                >
                  {KTR_SETTINGS.map((setting) => (
                    <option key={setting.id} value={setting.id}>
                      {setting.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Lokasi Pelanggaran (Jawaban Isian) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  Lokasi Pelanggaran
                </label>
                {qrDetected && (
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                    <QrCode className="w-3 h-3 text-emerald-700" />
                    Terdeteksi via QR Code Stiker
                  </span>
                )}
              </div>
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Contoh: RSUD Karawang — Lantai 2 Gedung Poliklinik Anak"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-900 transition-colors placeholder:text-slate-400"
              />
            </div>

            {/* Deskripsi Kronologi Kejadian */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Deskripsi / Kronologi Kejadian
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan secara singkat jumlah pelanggar, ciri-ciri lokasi spesifik, atau waktu terjadinya pelanggaran..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-900 transition-colors placeholder:text-slate-400"
              />
            </div>

            {/* 5. Bukti Pelanggaran (Upload File dengan Clean Preview & Loading) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                Bukti Pelanggaran (Foto / Video / Lampiran)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4"
                onChange={handleFileChange}
                className="hidden"
              />

              {evidenceFile ? (
                /* Clean File Preview Card */
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {previewUrl ? (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0">
                        <Image
                          src={previewUrl}
                          alt="Pratinjau Bukti"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                        <FileText className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                        <Eye className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                        <span className="truncate max-w-[200px] sm:max-w-[280px]">
                          {evidenceFile.name}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500">
                        {(evidenceFile.size / 1024 / 1024).toFixed(2)} MB • {evidenceFile.type || "Berkas Lampiran"}
                      </p>
                      <span className="text-[10px] text-emerald-800 font-semibold font-mono inline-block">
                        ✓ Pratinjau Siap Diunggah
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 text-slate-600 text-xs font-medium transition-colors flex items-center gap-1 shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                    Hapus File
                  </button>
                </div>
              ) : (
                /* Dropzone Upload Button */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer text-center space-y-1.5"
                >
                  <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-500 shadow-xs">
                    <Upload className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-800 font-semibold">
                      Klik untuk mengunggah foto / video bukti
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Pratinjau berkas akan ditampilkan sebelum pengiriman.
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Format: JPG, PNG, WEBP, atau MP4 (Maks. 10 MB)
                  </p>
                </div>
              )}
            </div>

            {/* Catatan Privasi & Submit */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 leading-relaxed max-w-md flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{KTR_REPORT.privacyNote}</span>
              </p>
              <button
                type="submit"
                disabled={isUploading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Mengunggah Ke Vercel Blob...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Laporan Warga</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.section>
  );
}
