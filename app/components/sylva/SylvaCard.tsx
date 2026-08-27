'use client';

import React, { useEffect, useRef } from 'react';

interface SylvaCardProps {
  type: 'about' | 'stove';
  label: string;
  title: string;
  delay?: number;
  portalDelay?: number;
  className?: string;
  onKnobClick?: () => void;
}

export function SylvaCard({
  type,
  label,
  title,
  delay = 760,
  portalDelay = 920,
  className = '',
  onKnobClick,
}: SylvaCardProps) {
  const portalRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const portal = portalRef.current;
    const canvasEl = canvasRef.current;
    if (!portal || !canvasEl) return;

    const img = portal.querySelector('img');
    const media = portal.querySelector('.portal-media') as HTMLElement;
    if (!img || !media) return;

    let isDisposed = false;
    let animationFrameId: number;

    const CUT_STEPS = 12;
    const CUT_MS = 1450;
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (REDUCED) return;

    const launch = () => {
      setTimeout(() => {
        if (isDisposed) return;
        const box = canvasEl.getBoundingClientRect();
        if (!box.width || !box.height) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasEl.width = Math.max(1, Math.round(box.width * dpr));
        canvasEl.height = Math.max(1, Math.round(box.height * dpr));
        const ctx = canvasEl.getContext('2d');
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cols = 52;
        const rows = Math.max(18, Math.round((cols * box.height) / box.width));

        const sample = document.createElement('canvas');
        sample.width = cols;
        sample.height = rows;
        const sg = sample.getContext('2d', { willReadFrequently: true });
        let rgba: Uint8ClampedArray | null = null;
        try {
          if (sg) {
            sg.drawImage(img, 0, 0, cols, rows);
            rgba = sg.getImageData(0, 0, cols, rows).data;
          }
        } catch {
          // Fallback if cross-origin or canvas read error
        }

        const over = -media.offsetLeft;
        const span = media.offsetWidth;
        const reach = box.width;

        canvasEl.style.opacity = '1';
        const startedAt = performance.now();

        function paint(now: number) {
          if (isDisposed) return;
          const t = Math.min(1, (now - startedAt) / CUT_MS);
          const stepped = Math.floor(t * CUT_STEPS) / CUT_STEPS;
          const front = (stepped * span - over) / reach;
          const tailFade = t < 0.88 ? 1 : (1 - t) / 0.12;
          ctx!.clearRect(0, 0, box.width, box.height);

          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const an = (x + 0.5) / cols;
              const delta = an - front;
              if (delta < -0.16 || delta > 0.16) continue;

              const band = 1 - Math.abs(delta) / 0.16;
              const pulse = 0.68 + 0.32 * Math.sin(x * 2.71 + y * 1.93 + t * 26);
              const alpha = Math.max(0, band * pulse * tailFade);
              if (alpha < 0.08) continue;

              let r = 220;
              let g = 238;
              let b = 202;
              if (rgba) {
                const q = (y * cols + x) * 4;
                r = Math.min(255, rgba[q] * 1.18 + 20);
                g = Math.min(255, rgba[q + 1] * 1.18 + 24);
                b = Math.min(255, rgba[q + 2] * 1.12 + 14);
              }

              let px = ((x + 0.5) * box.width) / cols;
              let py = ((y + 0.5) * box.height) / rows;
              const jitter = (1 - band) * 5;
              px += Math.sin(y * 3.17 + x) * jitter;
              py += Math.cos(x * 2.41 - y) * jitter;
              const radius = (0.55 + band * 1.25) * Math.max(0.75, reach / 300);

              ctx!.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${alpha * 0.92})`;
              ctx!.beginPath();
              ctx!.arc(px, py, radius, 0, Math.PI * 2);
              ctx!.fill();
            }
          }

          if (t < 1) {
            animationFrameId = requestAnimationFrame(paint);
          } else {
            ctx!.clearRect(0, 0, box.width, box.height);
            canvasEl.style.opacity = '0';
          }
        }
        animationFrameId = requestAnimationFrame(paint);
      }, portalDelay);
    };

    if (img.complete && img.naturalWidth) {
      launch();
    } else {
      img.addEventListener('load', launch, { once: true });
    }

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, [portalDelay]);

  const isStove = type === 'stove';
  const imgBg = isStove
    ? "radial-gradient(ellipse at center, #2e4432 0%, #152217 60%, #0d160f 100%)"
    : "radial-gradient(ellipse at center, #3a4b36 0%, #202b1f 60%, #121911 100%)";

  return (
    <>
      <article
        className={`card card--${type} mask par ${className}`}
        style={{
          ['--d' as any]: `${delay}ms`,
          ['--pd' as any]: isStove ? 22 : 10,
          ['--pr' as any]: isStove ? 2.4 : 2.2,
        }}
      >
        <p className="label">{label}</p>
        <h2>{title}</h2>

        <figure ref={portalRef} className="portal" data-delay={portalDelay}>
          <span className="portal-media">
            <div
              className="w-full h-full object-cover transition-transform duration-1000 scale-[1.08] relative overflow-hidden"
              style={{ background: imgBg }}
            >
              {/* Botanical procedural moss illustration canvas/svg fallback if jpg is local */}
              <svg className="w-full h-full absolute inset-0 opacity-80" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id={`glow-${type}`} cx="40%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#8db865" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#3d562b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#142010" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill={`url(#glow-${type})`} />
                <path d="M-20 180 Q60 110 140 150 T320 130 L320 220 L-20 220 Z" fill="#202c1a" opacity="0.9" />
                <path d="M10 190 Q90 140 180 165 T340 140 L340 220 L10 220 Z" fill="#304324" opacity="0.8" />
                <circle cx="80" cy="135" r="3" fill="#d9f0c2" opacity="0.6" />
                <circle cx="160" cy="148" r="2.5" fill="#e8f8d6" opacity="0.7" />
                <circle cx="230" cy="138" r="2" fill="#c4e6a0" opacity="0.5" />
              </svg>
            </div>
          </span>
          <canvas ref={canvasRef} className="pixel-reveal" aria-hidden="true" />
        </figure>

        {isStove && (
          <button
            className="knob"
            type="button"
            onClick={onKnobClick}
            aria-label={`Open field note: ${title}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21v-7" />
              <path d="M12 14c0-3.3 2.4-6 5.5-6 .3 3.6-2.2 6.4-5.5 6Z" />
              <path d="M12 16c-.1-2.9-2.2-5.2-4.9-5.2C6.8 13.7 9 16 12 16Z" />
            </svg>
          </button>
        )}
      </article>

      {!isStove && (
        <span
          className="knob-float par"
          style={{
            ['--pd' as any]: 10,
            ['--pr' as any]: 2.2,
          }}
        >
          <button
            className="knob knob--about mask-circle"
            type="button"
            style={{ ['--d' as any]: '1100ms' }}
            onClick={onKnobClick}
            aria-label="Read about Sylva"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21v-7" />
              <path d="M12 14c0-3.3 2.4-6 5.5-6 .3 3.6-2.2 6.4-5.5 6Z" />
              <path d="M12 16c-.1-2.9-2.2-5.2-4.9-5.2C6.8 13.7 9 16 12 16Z" />
            </svg>
          </button>
        </span>
      )}
    </>
  );
}
