'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SylvaVariant } from './types';

interface SylvaDockProps {
  currentVariant: SylvaVariant;
  onVariantChange: (variant: SylvaVariant) => void;
  className?: string;
}

export function SylvaDock({ currentVariant, onVariantChange, className = '' }: SylvaDockProps) {
  const dockRef = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<'grove' | 'habitats' | 'journal' | 'enter'>('grove');

  useEffect(() => {
    const root = dockRef.current;
    if (!root) return;

    let isDisposed = false;
    let animationFrameId: number;

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const NARROW = window.matchMedia('(max-width: 900px)');

    function fineHover() {
      return !REDUCED && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    }

    const DOCK: {
      root: HTMLElement | null;
      items: Array<{
        el: HTMLElement;
        w: number;
        h: number;
        v: number;
        vel: number;
        target: number;
      }>;
      on: boolean;
      live: boolean;
      key: boolean;
      dirty: boolean;
      u: number;
    } = {
      root,
      items: [],
      on: fineHover(),
      live: false,
      key: false,
      dirty: false,
      u: 1,
    };

    const SPEC: {
      items: Array<{
        el: HTMLElement;
        ang: number;
        tAng: number;
        br: number;
        tBr: number;
        focused: boolean;
        reach: number;
      }>;
      on: boolean;
      dirty: boolean;
    } = {
      items: [],
      on: fineHover(),
      dirty: false,
    };

    let aimX = 0;
    let aimY = 0;
    let aimSeen = false;
    let aimMoved = false;

    function clamp01(x: number) {
      return x < 0 ? 0 : x > 1 ? 1 : x;
    }

    function measureDock() {
      if (!DOCK.root) return;
      DOCK.on = fineHover();
      const stageEl = document.querySelector('.stage') || DOCK.root;
      DOCK.u = stageEl.getBoundingClientRect().width / (NARROW.matches ? 760 : 1600);
      for (let i = 0; i < DOCK.items.length; i++) {
        const st = DOCK.items[i];
        st.el.style.width = st.el.style.height = st.el.style.transform = '';
        st.el.dataset.near = 'false';
        st.v = st.vel = st.target = 0;
      }
      for (let i = 0; i < DOCK.items.length; i++) {
        const r = DOCK.items[i].el.getBoundingClientRect();
        DOCK.items[i].w = r.width;
        DOCK.items[i].h = r.height;
      }
      DOCK.live = false;
      DOCK.dirty = true;
      aimMoved = aimSeen;
    }

    function dockRest() {
      DOCK.live = false;
      DOCK.dirty = true;
      for (let i = 0; i < DOCK.items.length; i++) {
        DOCK.items[i].target = 0;
        DOCK.items[i].el.dataset.near = 'false';
      }
    }

    function drawDock(dt: number) {
      if (!DOCK.root || !DOCK.on) return;

      if (aimSeen && aimMoved && !DOCK.key) {
        const rr = DOCK.root.getBoundingClientRect();
        if (aimX > rr.left - 48 && aimX < rr.right + 48 && aimY > rr.top - 44 && aimY < rr.bottom + 104) {
          for (let i = 0; i < DOCK.items.length; i++) {
            const st = DOCK.items[i];
            const r = st.el.getBoundingClientRect();
            const prox = clamp01(1 - Math.abs(aimX - (r.left + r.width * 0.5)) / (128 * DOCK.u));
            st.target = prox * prox * (3 - 2 * prox);
            st.el.dataset.near = st.target > 0.08 ? 'true' : 'false';
          }
          DOCK.live = true;
          DOCK.dirty = true;
        } else if (DOCK.live) {
          dockRest();
        }
      }

      if (!DOCK.dirty) return;
      let moving = false;
      for (let i = 0; i < DOCK.items.length; i++) {
        const st = DOCK.items[i];
        st.vel += (st.target - st.v) * 190 * dt;
        st.vel *= Math.exp(-23 * dt);
        st.v += st.vel * dt;
        if (Math.abs(st.target - st.v) < 0.001 && Math.abs(st.vel) < 0.004) {
          st.v = st.target;
          st.vel = 0;
        } else {
          moving = true;
        }

        const v = Math.min(Math.max(st.v, 0), 1.08);
        const mark = st.el.classList.contains('dock-mark');
        const ew = mark ? 14 * DOCK.u : Math.min(18 * DOCK.u, st.w * 0.24);
        const eh = mark ? 14 * DOCK.u : 16 * DOCK.u;
        st.el.style.width = (st.w + ew * v).toFixed(2) + 'px';
        st.el.style.height = (st.h + eh * v).toFixed(2) + 'px';
        st.el.style.transform = 'translateY(' + (v * 3.5 * DOCK.u).toFixed(2) + 'px)';
      }
      if (!moving) DOCK.dirty = false;
    }

    function drawSpec(dt: number) {
      if (!SPEC.on) return;

      if (aimSeen && aimMoved) {
        for (let i = 0; i < SPEC.items.length; i++) {
          const st = SPEC.items[i];
          const r = st.el.getBoundingClientRect();
          const cx = r.left + r.width * 0.5;
          const cy = r.top + r.height * 0.5;
          const dx = Math.max(r.left - aimX, 0, aimX - r.right);
          const dy = Math.max(r.top - aimY, 0, aimY - r.bottom);
          const d = Math.sqrt(dx * dx + dy * dy);
          st.tAng =
            d === 0
              ? Math.atan2(2 / Math.max(r.height, 1), -2 / Math.max(r.width, 1)) +
                ((aimX - cx) / Math.max(r.width * 0.5, 1)) * 0.3 +
                ((cy - aimY) / Math.max(r.height * 0.5, 1)) * 0.15
              : Math.atan2(cy - aimY, aimX - cx);
          const raw = clamp01(1 - d / (st.reach * DOCK.u));
          st.tBr = Math.max(raw * raw * (3 - 2 * raw), st.focused ? 0.9 : 0);
        }
        SPEC.dirty = true;
      }

      if (!SPEC.dirty) return;
      let moving = false;
      for (let i = 0; i < SPEC.items.length; i++) {
        const st = SPEC.items[i];
        const diff = ((st.tAng - st.ang + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        st.ang += diff * (1 - Math.exp(-dt * 8));
        st.br += (st.tBr - st.br) * (1 - Math.exp(-dt * 9));
        if (Math.abs(diff) < 0.001 && Math.abs(st.tBr - st.br) < 0.002) {
          st.ang = st.tAng;
          st.br = st.tBr;
        } else {
          moving = true;
        }
        st.el.style.setProperty('--spec-angle', st.ang.toFixed(4) + 'rad');
        st.el.style.setProperty('--spec-bright', (clamp01(st.br) * 0.92).toFixed(3));
      }
      if (!moving) SPEC.dirty = false;
    }

    // Init
    DOCK.items = Array.from(root.querySelectorAll('[data-dock]')).map((el) => ({
      el: el as HTMLElement,
      w: 0,
      h: 0,
      v: 0,
      vel: 0,
      target: 0,
    }));

    SPEC.items = Array.from(document.querySelectorAll('[data-spec]')).map((el) => ({
      el: el as HTMLElement,
      ang: 2.4,
      tAng: 2.4,
      br: 0,
      tBr: 0,
      focused: false,
      reach: el.classList.contains('dock') ? 250 : 185,
    }));

    measureDock();

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      aimX = e.clientX;
      aimY = e.clientY;
      aimSeen = true;
      aimMoved = true;
      DOCK.key = false;
    };

    const onPointerLeave = () => {
      aimSeen = false;
      aimMoved = true;
      dockRest();
    };

    const onResize = () => {
      measureDock();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', onResize);

    let lastTick = performance.now();
    function tick() {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min((now - lastTick) / 1000, 0.05);
      lastTick = now;
      drawDock(dt);
      drawSpec(dt);
      aimMoved = false;
    }
    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={`dock-wrap ${className}`}>
      <nav ref={dockRef} className="dock par-dock par" style={{ ['--pd' as any]: 5 }} data-spec aria-label="Primary">
        <button
          type="button"
          className="dock-item dock-mark cursor-pointer"
          data-dock
          data-spec
          data-burst
          style={{ ['--d' as any]: '120ms' }}
          aria-label="Sylva — home"
          onClick={() => {}}
        >
          <svg viewBox="0 0 22 24" aria-hidden="true" className="w-[14px] h-[15px] fill-current">
            <path d="M11 1.3c-2.1 0-3.95 1.2-4.75 2.95C3.95 4.55 2.3 6.25 2.3 8.35c0 2.3 1.9 4.2 4.3 4.2h8.8c2.4 0 4.3-1.9 4.3-4.2 0-2.1-1.65-3.8-4-4.1C14.95 2.5 13.1 1.3 11 1.3Z" />
            <path d="M9.6 12.55h2.8v4.2c1.35.3 2.45 1.15 3.15 2.4-1.35.4-2.4.15-3.15-.4v4.15H9.6v-4.15c-.75.55-1.8.8-3.15.4.7-1.25 1.8-2.1 3.15-2.4v-4.2Z" />
          </svg>
        </button>

        <button
          type="button"
          className={`dock-item cursor-pointer ${activeTab === 'grove' ? 'is-active' : ''}`}
          data-dock
          data-spec
          data-burst
          style={{ ['--d' as any]: '180ms' }}
          onClick={() => setActiveTab('grove')}
        >
          <span className="glyph" aria-hidden="true">
            <svg viewBox="0 0 16 16" className="w-[14px] h-[14px] stroke-current fill-none" strokeWidth="1.3">
              <path d="M8 14V9" />
              <path d="M8 9c0-2.4 1.7-4.3 4-4.3.2 2.6-1.6 4.6-4 4.3Z" />
              <path d="M8 10.5C7.9 8.4 6.4 6.8 4.4 6.8 4.3 8.9 5.9 10.6 8 10.5Z" />
            </svg>
          </span>
          <span>Grove</span>
        </button>

        <button
          type="button"
          className={`dock-item cursor-pointer ${activeTab === 'habitats' ? 'is-active' : ''}`}
          data-dock
          data-spec
          data-burst
          style={{ ['--d' as any]: '230ms' }}
          onClick={() => setActiveTab('habitats')}
        >
          <span className="glyph" aria-hidden="true">
            <svg viewBox="0 0 16 16" className="w-[14px] h-[14px] stroke-current fill-none" strokeWidth="1.3">
              <path d="M1.6 12.4c2.4-3.4 4.3-5.1 5.7-5.1 2 0 3 3.6 5 3.6 1.1 0 1.9-.5 2.4-1.4" />
              <path d="M4.3 6.2C5.5 4.4 6.6 3.5 7.6 3.5c1.5 0 2.2 2.4 3.7 2.4" />
            </svg>
          </span>
          <span>Habitats</span>
        </button>

        <button
          type="button"
          className={`dock-item cursor-pointer ${activeTab === 'journal' ? 'is-active' : ''}`}
          data-dock
          data-spec
          data-burst
          style={{ ['--d' as any]: '280ms' }}
          onClick={() => setActiveTab('journal')}
        >
          <span className="glyph" aria-hidden="true">
            <svg viewBox="0 0 16 16" className="w-[14px] h-[14px] stroke-current fill-none" strokeWidth="1.3">
              <path d="M4 2.4h5.3L12 5.1v8.5H4z" />
              <path d="M9.2 2.4V5h2.7" />
              <path d="M6 8.4h4M6 10.8h2.8" />
            </svg>
          </span>
          <span>Journal</span>
        </button>

        <button
          type="button"
          className={`dock-item dock-item--enter cursor-pointer ${activeTab === 'enter' ? 'is-active' : ''}`}
          data-dock
          data-spec
          data-burst
          style={{ ['--d' as any]: '330ms' }}
          onClick={() => setActiveTab('enter')}
        >
          <span className="glyph" aria-hidden="true">
            <svg viewBox="0 0 16 16" className="w-[14px] h-[14px] stroke-current fill-none" strokeWidth="1.3">
              <path d="M6.6 2.5h5.1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6.6" />
              <path d="M2.6 8h6.6" />
              <path d="m7 5.6 2.4 2.4L7 10.4" />
            </svg>
          </span>
          <span>Enter</span>
        </button>
      </nav>
    </div>
  );
}
