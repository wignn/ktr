"use client";

import { KTR_REGULATION } from "../content/ktr";
import { ArrowRight, Scale, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function RegulationSection() {
  return (
    <motion.section
      id="regulasi"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-24"
    >
      <div className="p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold font-mono text-emerald-800 uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            Landasan Hukum Resmi
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            {KTR_REGULATION.title}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            {KTR_REGULATION.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Tindakan Yang Dilarang:
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {KTR_REGULATION.prohibitions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Ketentuan Sanksi:
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {KTR_REGULATION.sanctions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 font-mono">
          <span>Rujukan: {KTR_REGULATION.source}</span>
          <a
            href="#lapor"
            className="text-emerald-800 font-semibold hover:underline shrink-0 flex items-center gap-1"
          >
            Laporkan Pelanggaran <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
