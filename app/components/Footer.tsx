"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Didukung & Bekerja Sama Dengan:
            </span>
            <p className="text-sm font-semibold text-slate-900">
              Instansi Pemerintah Daerah, Perguruan Tinggi, & Konsorsium Kesehatan Publik
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Image
              src="/logo/01_kabupaten_karawang.png"
              alt="Kabupaten Karawang"
              width={120}
              height={120}
              className="object-contain h-9 w-auto"
            />
            <Image
              src="/logo/02_universitas_singaperbangsa_karawang.png"
              alt="Universitas Singaperbangsa Karawang"
              width={120}
              height={120}
              className="object-contain h-9 w-auto"
            />
            <Image
              src="/logo/03_pebs_feb_ui.png"
              alt="PEBS FEB UI"
              width={150}
              height={120}
              className="object-contain h-9 w-auto"
            />
            <Image
              src="/logo/04_johns_hopkins_bloomberg.png"
              alt="Johns Hopkins Bloomberg School of Public Health"
              width={150}
              height={120}
              className="object-contain h-9 w-auto"
            />
            <Image
              src="/logo/05_itcrn_karawang.png"
              alt="ITCRN Karawang"
              width={120}
              height={120}
              className="object-contain h-9 w-auto"
            />
            <Image
              src="/logo/06_germas.png"
              alt="GERMAS"
              width={150}
              height={100}
              className="object-contain h-8 w-auto"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 pt-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <Image
              src="/logo-ktr.png"
              alt="Logo KTR"
              width={36}
              height={36}
              className="w-9 h-9 object-contain shrink-0"
            />
            <div className="space-y-0.5">
              <p className="font-bold text-sm text-slate-900 tracking-tight">
                Portal Kawasan Tanpa Rokok (KTR)
              </p>
              <p className="text-slate-600">Edukasi Bahaya Merokok & Hak Atas Udara Bersih bagi Masyarakat.</p>
            </div>
          </div>
          <p className="text-slate-400 font-mono text-[11px]">
            © 2026 Portal KTR. Dilindungi Undang-Undang Kesehatan.
          </p>
        </div>
      </div>
    </footer>
  );
}
