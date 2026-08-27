'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SylvaScene } from './SylvaScene';
import { LiquidMetalButton } from './LiquidMetalButton';
import { SylvaDock } from './SylvaDock';
import { SylvaCard } from './SylvaCard';
import { SylvaVariant, SYLVA_VARIANTS } from './types';
import { KTR_HERO, KtrHeroContent } from '../../content/ktr';

interface SylvaHeroProps {
  initialVariant?: SylvaVariant;
  className?: string;
  content?: KtrHeroContent;
  showThemeSwitcher?: boolean;
}

export function SylvaHero({
  initialVariant = 'living-green',
  className = '',
  content = KTR_HERO,
  showThemeSwitcher = false,
}: SylvaHeroProps) {
  const [variant, setVariant] = useState<SylvaVariant>(initialVariant);
  const [isReady, setIsReady] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  const currentTheme = SYLVA_VARIANTS[variant] || SYLVA_VARIANTS['living-green'];

  // Pointer Parallax Handler
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    let isDisposed = false;
    let animationFrameId: number;
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let lastX: number | null = null;
    let lastY: number | null = null;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || REDUCED) return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onPointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    function tick() {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(tick);

      if (!REDUCED) {
        smooth.x += (pointer.x - smooth.x) * 0.055;
        smooth.y += (pointer.y - smooth.y) * 0.055;

        const nx = Math.round(smooth.x * 1000) / 1000;
        const ny = Math.round(smooth.y * 1000) / 1000;

        if (nx !== lastX || ny !== lastY) {
          lastX = nx;
          lastY = ny;
          heroEl?.style.setProperty('--px', String(nx));
          heroEl?.style.setProperty('--py', String(ny));
        }
      }
    }

    tick();

    // Mark as ready after a slight mount delay
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 150);

    return () => {
      isDisposed = true;
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <main
      ref={heroRef}
      id="hero"
      className={`hero js ${isReady ? 'is-ready' : ''} ${className}`}
      style={{
        backgroundColor: currentTheme.bgHex,
        ['--ink' as any]: currentTheme.ink,
        ['--ink-soft' as any]: currentTheme.inkSoft,
        ['--ink-faint' as any]: currentTheme.inkFaint,
        ['--rule' as any]: currentTheme.rule,
        ['--card' as any]: currentTheme.cardBg,
        ['--card-ink' as any]: currentTheme.cardInk,
        ['--card-label' as any]: currentTheme.cardLabel,
        ['--dock-bg' as any]: currentTheme.dockBg,
        backgroundImage: `
          radial-gradient(64% 52% at 27% 84%, ${currentTheme.bgGradA} 0%, rgba(232, 238, 222, 0) 72%),
          radial-gradient(70% 60% at 92% 8%, ${currentTheme.bgGradB} 0%, rgba(24, 28, 20, 0) 68%)
        `,
      }}
    >
      {/* Dynamic Floor of Light */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
          background: `
            radial-gradient(72% 44% at 50% 117%, ${currentTheme.floorLight} 0%, rgba(238, 243, 231, 0.21) 42%, rgba(238, 243, 231, 0.04) 72%, rgba(238, 243, 231, 0) 88%),
            linear-gradient(180deg, rgba(238, 243, 231, 0) 54%, rgba(238, 243, 231, 0.03) 78%, rgba(238, 243, 231, 0.085) 100%)
          `,
        }}
      />

      {/* Procedural Three.js Living Scene (Roots, Moss Fur, Ferns, Butterfly, Motes) */}
      <SylvaScene variant={variant} onReady={() => setIsReady(true)} />

      {/* Top Floating Glass Proximity Dock */}
      <SylvaDock currentVariant={variant} onVariantChange={setVariant} />

      {/* Optional visual theme switcher; hidden for the public KTR experience by default. */}
      {showThemeSwitcher && <aside className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5 p-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/25">
        {(Object.keys(SYLVA_VARIANTS) as SylvaVariant[]).map((vKey) => {
          const item = SYLVA_VARIANTS[vKey];
          const active = variant === vKey;
          return (
            <button
              key={vKey}
              type="button"
              onClick={() => setVariant(vKey)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                active
                  ? 'bg-white/20 text-white shadow-sm border border-white/20'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title={item.subtitle}
            >
              {item.name}
            </button>
          );
        })}
      </aside>}

      {/* 1600x880 Centered Responsive Stage */}
      <div className="stage" id="stage">
        {/* Column Guides (z 1) */}
        <div className="guides fade" style={{ ['--d' as any]: '900ms' }} aria-hidden="true">
          <i style={{ left: 'calc(405 * var(--u))' }} />
          <i style={{ left: 'calc(748 * var(--u))' }} />
          <i style={{ left: 'calc(1091 * var(--u))' }} />
        </div>

        {/* Quiet visual mark keeps the original composition while branding the portal. */}
        <div className="ghost fade" style={{ ['--d' as any]: '1150ms' }} aria-hidden="true">
          KTR
        </div>

        {/* Card 1: KTR overview (keeps the reference composition intact). */}
        <SylvaCard
          type="about"
          label="Tentang KTR"
          title="Udara bersih adalah hak bersama."
          delay={760}
          portalDelay={920}
        />

        <p className="hero-eyebrow" aria-label={content.eyebrow}>{content.eyebrow}</p>

        {/* Headline */}
        <h1
          className="headline par"
          style={{
            ['--pd' as any]: 18,
            ['--pr' as any]: 1.2,
          }}
        >
          <span>
            <i style={{ ['--d' as any]: '260ms' }}>{content.headline}</i>
          </span>
        </h1>

        {/* Lede */}
        <p
          className="lede mask par"
          style={{
            ['--d' as any]: '480ms',
            ['--pd' as any]: 14,
            ['--pr' as any]: 1,
          }}
        >
          {content.description}
        </p>

        {/* Explore Button (Liquid Metal WebGL2 Dispersion Shader) */}
        <div className="pill-clip">
          <div
            className="pill mask par"
            style={{
              ['--d' as any]: '600ms',
              ['--pd' as any]: 15,
              ['--pr' as any]: 1.4,
            }}
          >
            <LiquidMetalButton
              variant="explore"
              label={content.primaryCta}
              onClick={() => document.querySelector('#lapor')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </div>
        </div>

        {/* Play Button (Circular Liquid Metal WebGL2 Dispersion Shader) */}
        <span
          className="play-wrap par"
          style={{
            ['--pd' as any]: 20,
          }}
        >
          <span className="play-clip">
            <span className="play-glass mask-circle" style={{ ['--d' as any]: '900ms' }}>
              <LiquidMetalButton
                variant="play"
                onClick={() => document.querySelector('#edukasi')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </span>
          </span>
          <span className="play-ring mask-circle" style={{ ['--d' as any]: '840ms' }} aria-hidden="true" />
        </span>

        {/* Stat A */}
        <dl
          className="stat stat--a mask par"
          style={{
            ['--d' as any]: '700ms',
            ['--pd' as any]: 12,
          }}
        >
          <span className="mark" aria-hidden="true">
            <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <circle cx="15" cy="15" r="10.5" strokeDasharray="0.6 3.6" />
              <circle cx="15" cy="15" r="5.6" strokeDasharray="0.6 3.2" />
              <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <div>
            <dt>Canopy restored</dt>
            <dd>282 ha</dd>
          </div>
        </dl>

        {/* Stat B */}
        <dl
          className="stat stat--b mask par"
          style={{
            ['--d' as any]: '770ms',
            ['--pd' as any]: 13,
          }}
        >
          <span className="mark" aria-hidden="true">
            <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <g id="rays">
                <path d="M15 3.5v5" />
                <path d="M15 21.5v5" />
                <path d="M3.5 15h5" />
                <path d="M21.5 15h5" />
                <path d="M6.9 6.9l3.5 3.5" />
                <path d="M19.6 19.6l3.5 3.5" />
                <path d="M23.1 6.9l-3.5 3.5" />
                <path d="M10.4 19.6l-3.5 3.5" />
              </g>
              <circle cx="15" cy="15" r="3.6" />
            </svg>
          </span>
          <div>
            <dt>Native species</dt>
            <dd>43 mapped</dd>
          </div>
        </dl>

        {/* Card 2: reporting guide */}
        <SylvaCard
          type="stove"
          label="Panduan Warga"
          title="Lapor dengan aman."
          delay={880}
          portalDelay={1080}
          onKnobClick={() => document.querySelector('#lapor')?.scrollIntoView({ behavior: 'smooth' })}
        />

        {/* Scroll Cue */}
        <a
          className="scroll mask par"
          style={{
            ['--d' as any]: '1040ms',
            ['--pd' as any]: 9,
          }}
          href="#edukasi"
        >
          Edukasi
          <span className="track" />
        </a>
      </div>
    </main>
  );
}
