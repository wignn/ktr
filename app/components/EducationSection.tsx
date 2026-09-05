"use client";

import { KTR_EDUCATION_FACTS, KtrEducationFact } from "../content/ktr";
import { ArrowUpRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface EducationSectionProps {
  onSelectFact: (fact: KtrEducationFact) => void;
}

export default function EducationSection({ onSelectFact }: EducationSectionProps) {
  return (
    <motion.section
      id="bahaya"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-24 space-y-8"
    >
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          Selamat Datang di website laporktr-karawang
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 font-mono pt-1">
          <Activity className="w-3.5 h-3.5" />
          Fakta Kesehatan & Racun
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Dampak Buruk Merokok & Residu Asap Pasif
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          Asap rokok mengandung zat racun yang merusak organ pernapasan dan pembuluh darah. Bahaya ini tidak berhenti saat rokok dimatikan; residunya menempel dan membahayakan siapa saja di sekitarnya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {KTR_EDUCATION_FACTS.map((fact, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
            onClick={() => onSelectFact(fact)}
            className="p-6 rounded-xl col bg-white border border-slate-200 hover:border-slate-400 transition-colors space-y-3 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                  {fact.accent}
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center justify-between">
                <span>{fact.title}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 transition-colors" />
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {fact.body}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-xs font-medium text-slate-700">
              <span>Baca analisis medis</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
