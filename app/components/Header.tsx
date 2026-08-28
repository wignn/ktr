"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, Layers, Scale, AlertCircle, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-4">
        {/* Top Header Row: Brand Title & Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full lg:w-auto shrink-0">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-ktr.png"
              alt="Logo KTR"
              width={32}
              height={32}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
            />
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-900">
              KAWASAN TANPA ROKOK
            </span>
          </div>

          {/* Mobile Menu Hamburger Button (< lg) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Logos Partner */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto max-w-full py-0.5 no-scrollbar scrollbar-none">
          <Image
            src="/logo/01_kabupaten_karawang.png"
            alt="Kabupaten Karawang"
            width={120}
            height={120}
            className="object-contain h-6 sm:h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/02_universitas_singaperbangsa_karawang.png"
            alt="Universitas Singaperbangsa Karawang"
            width={120}
            height={120}
            className="object-contain h-6 sm:h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/03_pebs_feb_ui.png"
            alt="PEBS FEB UI"
            width={150}
            height={120}
            className="object-contain h-6 sm:h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/04_johns_hopkins_bloomberg.png"
            alt="Johns Hopkins Bloomberg School of Public Health"
            width={150}
            height={120}
            className="object-contain h-6 sm:h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/05_itcrn_karawang.png"
            alt="ITCRN Karawang"
            width={120}
            height={120}
            className="object-contain h-6 sm:h-7 w-auto shrink-0"
          />
          <Image
            src="/logo/06_germas.png"
            alt="GERMAS"
            width={150}
            height={100}
            className="object-contain h-6 sm:h-7 w-auto shrink-0"
          />
        </div>

        {/* Desktop Navigation (>= lg) */}
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

      {/* Mobile Navigation Drawer / Dropdown (< lg) */}
      {mobileMenuOpen && (
        <nav className="lg:hidden pt-3 pb-2 border-t border-slate-100 mt-2 flex flex-col space-y-1 text-xs font-medium text-slate-700">
          <a
            href="#bahaya"
            onClick={(e) => scrollToSection(e, "bahaya")}
            className="px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            Bahaya Merokok
          </a>
          <a
            href="#tatanan"
            onClick={(e) => scrollToSection(e, "tatanan")}
            className="px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            7 Tatanan KTR
          </a>
          <a
            href="#regulasi"
            onClick={(e) => scrollToSection(e, "regulasi")}
            className="px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <Scale className="w-4 h-4 text-slate-400" />
            Regulasi Hukum
          </a>
          <a
            href="#lapor"
            onClick={(e) => scrollToSection(e, "lapor")}
            className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-semibold flex items-center gap-2 transition-colors"
          >
            <AlertCircle className="w-4 h-4 text-emerald-700" />
            Form Lapor
          </a>
        </nav>
      )}
    </header>
  );
}
