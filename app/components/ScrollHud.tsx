"use client";

import React from "react";

interface ScrollHudProps {
  activeSectionIndex: number;
  scrollProgress: number;
}

export default function ScrollHud({ activeSectionIndex, scrollProgress }: ScrollHudProps) {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden sm:flex flex-col items-center gap-3">
      <div className="px-2.5 py-1 rounded bg-white text-slate-900 border border-slate-200 text-[11px] font-mono tracking-wider flex items-center gap-1 font-bold shadow-sm">
        <span className="text-emerald-800">0{activeSectionIndex}</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">05</span>
      </div>

      <div className="relative w-[2px] h-32 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-emerald-800 rounded-full transition-all duration-150 ease-out"
          style={{ height: `${Math.max(5, Math.min(100, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Section Dots */}
      {/* <div className="flex flex-col gap-1.5">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              activeSectionIndex === num
                ? "bg-emerald-800"
                : "bg-slate-300"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
