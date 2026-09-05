"use client";

import React from "react";
import { KtrEducationFact } from "../content/ktr";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ShieldCheck, Info } from "lucide-react";

interface EducationModalProps {
  selectedFact: KtrEducationFact | null;
  onClose: () => void;
}

export default function EducationModal({ selectedFact, onClose }: EducationModalProps) {
  return (
    <Dialog open={!!selectedFact} onOpenChange={(open) => !open && onClose()}>
      {selectedFact && (
        <DialogContent className="p-0 border border-slate-200 overflow-hidden">
          {/* Modal Header */}
          <DialogHeader>
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-block mb-2">
                {selectedFact.accent}
              </span>
              <DialogTitle>{selectedFact.title}</DialogTitle>
              <DialogDescription className="mt-1">
                {selectedFact.detail.subtitle}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="p-6 md:p-8 space-y-6 overflow-y-auto font-sans text-slate-700 text-xs max-h-[60vh]">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 leading-relaxed text-slate-700 italic flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>&quot;{selectedFact.body}&quot;</span>
            </div>

            {/* Sections Detail */}
            <div className="space-y-4">
              {selectedFact.detail.sections.map((sec, i) => (
                <div key={i} className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {sec.heading}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlights Bullet List */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Poin Kunci & Riset Penting
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedFact.detail.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention Tip */}
            {/* <div className="p-3.5 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Rekomendasi Utama:
              </span>
              <span className="text-xs text-slate-200 font-normal sm:text-right">
                {selectedFact.detail.preventionTip}
              </span>
            </div> */}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium uppercase tracking-wider transition-colors"
            >
              Tutup Informasi
            </button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
