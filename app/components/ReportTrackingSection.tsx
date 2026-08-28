"use client";

import React from "react";
import { KtrSavedReport } from "../content/ktr";
import { Search, MapPin, Calendar, Clock, AlertTriangle, FileText, UserCheck, Building2, Paperclip } from "lucide-react";
import { motion } from "framer-motion";

interface ReportTrackingSectionProps {
  searchTicketId: string;
  setSearchTicketId: (val: string) => void;
  searchedReport: KtrSavedReport | null;
  hasSearched: boolean;
  onSearch: (e: React.FormEvent) => void;
}

export default function ReportTrackingSection({
  searchTicketId,
  setSearchTicketId,
  searchedReport,
  hasSearched,
  onSearch,
}: ReportTrackingSectionProps) {
  return (
    <motion.section
      id="lacak"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-24 space-y-6"
    >
      <div className="p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" />
            Fitur Pemantauan Laporan
          </span>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Cek Status Tiket Pengaduan
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
            Masukkan Kode Tiket Laporan Anda (contoh:{" "}
            <span className="font-mono text-emerald-800 font-medium">KTR-8F2A-2026</span>) untuk melihat kemajuan penanganan oleh petugas satgas di lapangan.
          </p>
        </div>

        <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            required
            value={searchTicketId}
            onChange={(e) => setSearchTicketId(e.target.value)}
            placeholder="Ketik Kode Tiket (Contoh: KTR-8F2A-2026)"
            className="flex-1 px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-900 font-mono uppercase placeholder:normal-case placeholder:font-sans placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            Lacak Status Laporan
          </button>
        </form>

        {/* Hasil Pencarian Tiket */}
        {hasSearched && (
          <div className="pt-4 border-t border-slate-200">
            {searchedReport ? (
              <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Kode Tiket Laporan
                    </span>
                    <span className="text-base font-mono font-bold text-slate-900">
                      {searchedReport.ticketId}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-semibold font-mono text-emerald-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    <span>{searchedReport.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <UserCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">
                        Inisial Pelapor (Anonim):
                      </span>
                      <span className="text-slate-900 font-mono font-bold">
                        {searchedReport.reporterInitials}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">
                        Kategori Tatanan KTR:
                      </span>
                      <span className="text-slate-800 font-medium">
                        {searchedReport.settingCategoryLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">
                        Jenis Pelanggaran:
                      </span>
                      <span className="text-slate-800 font-medium">
                        {searchedReport.reportTypeLabel}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">
                        Waktu Pelaporan:
                      </span>
                      <span className="text-slate-800 font-medium">
                        {searchedReport.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px]">
                      Lokasi Pelanggaran:
                    </span>
                    <span className="text-slate-800 font-medium">
                      {searchedReport.locationName}
                    </span>
                  </div>
                </div>

                {searchedReport.evidenceName && (
                  <div className="flex items-start gap-2 text-xs">
                    <Paperclip className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">
                        Bukti Pelanggaran Terlampir:
                      </span>
                      <span className="text-emerald-800 font-mono text-xs font-semibold">
                        {searchedReport.evidenceName}
                      </span>
                    </div>
                  </div>
                )}

                {searchedReport.notes && (
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <span className="text-emerald-800 font-mono font-semibold flex items-center gap-1 uppercase tracking-wider text-[10px]">
                      <Clock className="w-3 h-3" />
                      Catatan Petugas Lapangan:
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {searchedReport.notes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5 rounded-lg bg-white border border-slate-200 text-center space-y-1">
                <span className="text-amber-800 font-mono text-xs uppercase font-semibold flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Data Tidak Ditemukan
                </span>
                <p className="text-xs text-slate-600">
                  Kode tiket &quot;<span className="font-mono text-slate-900 font-semibold">{searchTicketId}</span>&quot; tidak terdaftar. Pastikan format penulisan benar (contoh: KTR-8F2A-2026).
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
