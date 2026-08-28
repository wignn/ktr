"use client";

import Image from "next/image";
import { KTR_SETTINGS } from "../content/ktr";
import { motion } from "framer-motion";

export default function SettingsSection() {
  return (
    <motion.section
      id="tatanan"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-24 space-y-8"
    >
      <div className="max-w-2xl space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 font-mono">
          Area Wajib Bebas Asap Rokok
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          7 Tatanan Kawasan Tanpa Rokok (KTR)
        </h2>
        <p className="text-sm text-slate-600 font-normal leading-relaxed">
          Alur tatanan lingkungan publik yang secara bertahap dan menyeluruh wajib steril dari aktivitas merokok, penjualan, serta promosi produk tembakau.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative pl-7 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
        {KTR_SETTINGS.map((setting, idx) => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
            className="relative flex flex-col md:flex-row gap-4 items-start"
          >
            {/* Node Dot Timeline */}
            <div className="absolute -left-7 sm:-left-8 top-4 w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-mono text-xs font-semibold text-slate-600 z-10 shrink-0">
              {idx + 1}
            </div>

            {/* Card Content */}
            <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-5">
              {/* Gambar */}
              <div className="md:col-span-2 relative h-48 md:h-full min-h-[180px] bg-slate-100">
                <Image
                  src={setting.image}
                  alt={setting.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white px-2 py-0.5 rounded text-[10px] font-mono">
                  Tatanan #{idx + 1}
                </div>
              </div>

              {/* Detail Text */}
              <div className="md:col-span-3 p-4 sm:p-5 flex flex-col justify-between space-y-3 bg-white">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                    Area Terproteksi
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">
                    {setting.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {setting.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Cakupan Contoh Lokasi:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {setting.examples.map((ex, i) => (
                      <span
                        key={i}
                        className="text-[11px] sm:text-xs px-2.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
