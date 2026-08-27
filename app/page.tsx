"use client";

import React, { useState } from "react";
import { BestsellersBookShowcase } from "@designcodeio/threeui";
import {
  KTR_EDUCATION_FACTS,
  KTR_SETTINGS,
  KTR_REGULATION,
  KTR_REPORT,
  KTR_STATUSES,
} from "./content/ktr";

export default function Home() {
  const [reportType, setReportType] = useState(KTR_REPORT.types[0].value);
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName || !description) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#29251d] text-[#eee2ca] selection:bg-[#c3a47b]/30 font-serif">
      {/* ── SECTION 1: TOP 3D BOOK SHOWCASE ── */}
      <section className="relative w-full h-[90vh] min-h-[680px] border-b border-[#c3a47b]/20 overflow-hidden">
        <BestsellersBookShowcase
          headingFont="iowan-old-style"
          bodyFont="iowan-old-style"
          headingWeight="500"
          bodyWeight="400"
          primaryColor="#c3a47b"
          headingSize={325}
          bodySize={17}
          headingLetterSpacing={-0.085}
        />

        {/* Scroll down indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-80">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5b79e] font-sans font-medium">
            Gulir Ke Bawah Untuk Informasi & Pelaporan
          </span>
          <div className="w-5 h-8 border border-[#c3a47b]/40 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-[#c3a47b] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── STICKY NAV BAR ── */}
      <header className="sticky top-0 z-40 bg-[#1d1a15]/90 backdrop-blur-md border-b border-[#c3a47b]/15 px-6 py-3.5 flex items-center justify-between font-sans">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#c3a47b] shadow-[0_0_10px_#c3a47b]" />
          <span className="text-sm font-semibold tracking-wider text-[#eadfc7] uppercase">
            Portal KTR & Edukasi Sehat
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-[#c5b79e]">
          <a href="#bahaya" className="hover:text-[#c3a47b] transition-colors">
            Bahaya Merokok
          </a>
          <a href="#tatanan" className="hover:text-[#c3a47b] transition-colors">
            7 Tatanan KTR
          </a>
          <a href="#regulasi" className="hover:text-[#c3a47b] transition-colors">
            Regulasi Hukum
          </a>
          <a href="#lapor" className="hover:text-[#c3a47b] transition-colors">
            Form Lapor
          </a>
        </nav>

        <a
          href="#lapor"
          className="px-4 py-2 rounded-full bg-[#c3a47b] text-[#1d1a15] text-xs font-bold uppercase tracking-wider hover:bg-[#dbc39c] transition-all shadow-md"
        >
          Laporkan KTR
        </a>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-28">

        {/* ── SECTION 2: EDUKASI BAHAYA UTAMA ── */}
        <section id="bahaya" className="scroll-mt-24 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#89946f] font-sans">
              Modul Pengetahuan Racun & Risikonya
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#eee2ca] italic leading-tight">
              Dampak Buruk Merokok & Residu Asap Pasif
            </h2>
            <p className="text-sm md:text-base text-[#c5b79e] font-sans font-light leading-relaxed">
              Asap rokok mengandung zat racun yang merusak organ pernapasan dan pembuluh darah. Bahaya ini tidak berhenti saat rokok dimatikan; residunya bertahan dan membahayakan lingkungan sekitar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {KTR_EDUCATION_FACTS.map((fact, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#343025]/60 border border-[#c3a47b]/20 hover:border-[#c3a47b]/40 transition-all space-y-4 group backdrop-blur-sm shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#1d1a15] text-[#c3a47b] border border-[#c3a47b]/20 font-semibold uppercase">
                    {fact.accent}
                  </span>
                  <span className="text-2xl font-serif text-[#c3a47b]/30 group-hover:text-[#c3a47b]/70 transition-colors">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-[#eee2ca] italic">
                  {fact.title}
                </h3>
                <p className="text-sm text-[#c5b79e] font-sans font-light leading-relaxed">
                  {fact.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: 7 TATANAN KAWASAN TANPA ROKOK (KTR) ── */}
        <section id="tatanan" className="scroll-mt-24 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#89946f] font-sans">
              Area Steril Bebas Asap Rokok
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#eee2ca] italic leading-tight">
              7 Tatanan Kawasan Tanpa Rokok (KTR)
            </h2>
            <p className="text-sm md:text-base text-[#c5b79e] font-sans font-light leading-relaxed">
              Berdasarkan rujukan Undang-Undang dan Peraturan Daerah, 7 lokasi ini wajib steril dari aktivitas merokok, menjual, serta mempromosikan rokok demi kesehatan publik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KTR_SETTINGS.map((setting, idx) => (
              <div
                key={setting.id}
                className="p-6 rounded-2xl bg-[#211e18] border border-[#c3a47b]/15 hover:border-[#89946f]/50 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#89946f]/20 text-[#89946f] flex items-center justify-center font-bold font-sans text-xs">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-medium text-[#eee2ca] italic">
                    {setting.name}
                  </h3>
                  <p className="text-xs text-[#c5b79e] font-sans font-light leading-relaxed">
                    {setting.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#c3a47b]/10 font-sans text-[11px] text-[#89946f] space-y-1">
                  <span className="font-semibold uppercase tracking-wider block text-[10px] text-[#c3a47b]">
                    Contoh Lokasi:
                  </span>
                  <p className="text-[#c5b79e]">
                    {setting.examples.join(" • ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: REGULASI HUKUM ── */}
        <section id="regulasi" className="scroll-mt-24">
          <div className="p-8 md:p-12 rounded-3xl bg-[#343025]/80 border border-[#c3a47b]/30 space-y-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c3a47b]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c3a47b] font-sans">
                Dasar Hukum & Ketentuan
              </span>
              <h2 className="text-3xl font-medium text-[#eee2ca] italic">
                {KTR_REGULATION.title}
              </h2>
              <p className="text-sm text-[#c5b79e] font-sans font-light leading-relaxed">
                {KTR_REGULATION.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              <div className="space-y-4 p-6 rounded-xl bg-[#1d1a15]/60 border border-[#c3a47b]/15">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#a96346] flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Larangan Utama
                </h4>
                <ul className="space-y-2.5 text-xs text-[#c5b79e]">
                  {KTR_REGULATION.prohibitions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#a96346] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 p-6 rounded-xl bg-[#1d1a15]/60 border border-[#c3a47b]/15">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#89946f] flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Sanksi & Penindakan
                </h4>
                <ul className="space-y-2.5 text-xs text-[#c5b79e]">
                  {KTR_REGULATION.sanctions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#89946f] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-xs font-mono text-[#c5b79e]/70 italic border-t border-[#c3a47b]/15 pt-4">
              Rujukan: {KTR_REGULATION.source}
            </p>
          </div>
        </section>

        {/* ── SECTION 5: FORMULIR PELAPORAN KTR ── */}
        <section id="lapor" className="scroll-mt-24 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a96346] font-sans">
              Layanan Pengaduan Masyarakat
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#eee2ca] italic leading-tight">
              Laporkan Pelanggaran KTR Secara Aman
            </h2>
            <p className="text-sm md:text-base text-[#c5b79e] font-sans font-light leading-relaxed">
              Bantu wujudkan lingkungan bebas asap rokok di fasilitas publik. Laporan Anda akan ditindaklanjuti oleh petugas terkait.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Input */}
            <div className="lg:col-span-2 p-8 rounded-3xl bg-[#211e18] border border-[#c3a47b]/20 font-sans shadow-xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#89946f]/20 text-[#89946f] flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-serif italic text-[#eee2ca]">
                    Laporan Berhasil Dikirikan!
                  </h3>
                  <p className="text-sm text-[#c5b79e] max-w-md mx-auto">
                    Terima kasih atas kepedulian Anda menjaga Kawasan Tanpa Rokok. Laporan Anda sedang masuk dalam antrean verifikasi satgas.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#c3a47b] text-[#1d1a15] text-xs font-bold uppercase tracking-wider hover:bg-[#dbc39c] transition-all"
                  >
                    Kirim Laporan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReport} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#c3a47b] block">
                      Jenis Pelanggaran
                    </label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#29251d] border border-[#c3a47b]/30 text-[#eee2ca] text-sm focus:outline-none focus:border-[#c3a47b]"
                    >
                      {KTR_REPORT.types.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#c3a47b] block">
                      Nama Tempat / Lokasi Kejadian
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Rumah Sakit Umum Gedung B, Halte Busway..."
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#29251d] border border-[#c3a47b]/30 text-[#eee2ca] text-sm placeholder-[#c5b79e]/40 focus:outline-none focus:border-[#c3a47b]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#c3a47b] block">
                      Keterangan & Rincian Kejadian
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Jelaskan waktu, rincian aktivitas perokok/iklan, atau kondisi area KTR..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#29251d] border border-[#c3a47b]/30 text-[#eee2ca] text-sm placeholder-[#c5b79e]/40 focus:outline-none focus:border-[#c3a47b]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#c3a47b] block">
                      Upload Bukti Foto / Video (Opsional)
                    </label>
                    <div className="p-6 border-2 border-dashed border-[#c3a47b]/30 rounded-xl text-center hover:border-[#c3a47b]/60 transition-colors cursor-pointer bg-[#29251d]/40">
                      <span className="text-xs text-[#c5b79e] block">
                        Klik untuk unggah berkas (JPG, PNG, MP4 maks. 10MB)
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#c3a47b] text-[#1d1a15] font-bold text-xs uppercase tracking-widest hover:bg-[#dbc39c] transition-all shadow-lg"
                  >
                    Kirim Laporan Pelanggaran
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6 font-sans">
              <div className="p-6 rounded-2xl bg-[#343025]/50 border border-[#c3a47b]/20 space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c3a47b]">
                  Panduan Pengambilan Bukti
                </h4>
                <ul className="space-y-2 text-xs text-[#c5b79e]">
                  {KTR_REPORT.evidenceGuidance.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#c3a47b]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#1d1a15] border border-[#c3a47b]/15 space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#89946f]">
                  Jaminan Kerahasiaan
                </h4>
                <p className="text-xs text-[#c5b79e] leading-relaxed">
                  {KTR_REPORT.privacyNote}
                </p>
              </div>

              {/* Status List */}
              <div className="p-6 rounded-2xl bg-[#211e18] border border-[#c3a47b]/20 space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#eee2ca] font-serif italic">
                  Tahapan Status Pelaporan
                </h4>
                <div className="space-y-2 text-xs">
                  {KTR_STATUSES.map((status) => (
                    <div
                      key={status.name}
                      className="p-2.5 rounded-lg bg-[#29251d] flex items-center justify-between border border-[#c3a47b]/10"
                    >
                      <span className="font-medium text-[#eee2ca]">
                        {status.name}
                      </span>
                      <span className="text-[10px] text-[#c5b79e]/70">
                        {status.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#c3a47b]/20 bg-[#1d1a15] py-12 px-6 font-sans">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#c5b79e]">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-serif italic text-base text-[#eee2ca]">
              Portal Kawasan Tanpa Rokok (KTR)
            </p>
            <p>Edukasi Bahaya Merokok & Hak Atas Udara Bersih bagi Masyarakat.</p>
          </div>
          <p className="text-[#c5b79e]/60">
            © 2026 Portal KTR. Dilindungi Undang-Undang Kesehatan.
          </p>
        </div>
      </footer>
    </div>
  );
}
