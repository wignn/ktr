"use client";

import Image from "next/image";
import { BookOpen, Layers, Scale, AlertCircle } from "lucide-react";

export default function Header() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            KAWASAN TANPA ROKOK
          </span>
        </div>

        {/* Logos Partner */}
        <div className="flex items-center gap-4 overflow-x-auto max-w-full py-0.5">
          <Image
            src="/logo/01_kabupaten_karawang.png"
            alt="Kabupaten Karawang"
            width={120}
            height={120}
            className="object-contain h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/02_universitas_singaperbangsa_karawang.png"
            alt="Universitas Singaperbangsa Karawang"
            width={120}
            height={120}
            className="object-contain h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/03_pebs_feb_ui.png"
            alt="PEBS FEB UI"
            width={150}
            height={120}
            className="object-contain h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/04_johns_hopkins_bloomberg.png"
            alt="Johns Hopkins Bloomberg School of Public Health"
            width={150}
            height={120}
            className="object-contain h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/05_itcrn_karawang.png"
            alt="ITCRN Karawang"
            width={120}
            height={120}
            className="object-contain h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/06_germas.png"
            alt="GERMAS"
            width={150}
            height={100}
            className="object-contain h-7 w-auto shrink-0"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-600 shrink-0">
          <a
            href="#bahaya"
            onClick={(e) => scrollToSection(e, "bahaya")}
            className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            Bahaya Merokok
          </a>
          <a
            href="#tatanan"
            onClick={(e) => scrollToSection(e, "tatanan")}
            className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            7 Tatanan KTR
          </a>
          <a
            href="#regulasi"
            onClick={(e) => scrollToSection(e, "regulasi")}
            className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
          >
            <Scale className="w-3.5 h-3.5 text-slate-400" />
            Regulasi Hukum
          </a>
          <a
            href="#lapor"
            onClick={(e) => scrollToSection(e, "lapor")}
            className="hover:text-slate-900 transition-colors flex items-center gap-1.5 font-semibold text-emerald-800"
          >
            <AlertCircle className="w-3.5 h-3.5 text-emerald-700" />
            Form Lapor
          </a>
        </nav>
      </div>
    </header>
  );
}
