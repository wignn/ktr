'use client';

import { useEffect, useRef, useState } from 'react';

export interface SylvaNavItem {
  id: string;
  label: string;
  href: string;
}

interface SylvaDockProps {
  navItems?: SylvaNavItem[];
  className?: string;
}

const DEFAULT_NAV_ITEMS: SylvaNavItem[] = [
  { id: 'hero', label: 'Beranda', href: '#hero' },
  { id: 'edukasi', label: 'Edukasi', href: '#edukasi' },
  { id: 'tatanan', label: '7 Tatanan', href: '#tatanan' },
  { id: 'lapor', label: 'Lapor', href: '#lapor' },
  { id: 'pantau', label: 'Pantau', href: '#pantau' },
];

const ICONS = ['leaf', 'leaf', 'path', 'page', 'arrow'] as const;
type IconName = (typeof ICONS)[number];

function NavIcon({ type }: { type: IconName }) {
  if (type === 'path') {
    return <><path d="M1.6 12.4c2.4-3.4 4.3-5.1 5.7-5.1 2 0 3 3.6 5 3.6 1.1 0 1.9-.5 2.4-1.4" /><path d="M4.3 6.2C5.5 4.4 6.6 3.5 7.6 3.5c1.5 0 2.2 2.4 3.7 2.4" /></>;
  }
  if (type === 'page') {
    return <><path d="M4 2.4h5.3L12 5.1v8.5H4z" /><path d="M9.2 2.4V5h2.7" /><path d="M6 8.4h4M6 10.8h2.8" /></>;
  }
  if (type === 'arrow') {
    return <><path d="M6.6 2.5h5.1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6.6" /><path d="M2.6 8h6.6" /><path d="m7 5.6 2.4 2.4L7 10.4" /></>;
  }
  return <><path d="M8 14V9" /><path d="M8 9c0-2.4 1.7-4.3 4-4.3.2 2.6-1.6 4.6-4 4.3Z" /><path d="M8 10.5C7.9 8.4 6.4 6.8 4.4 6.8 4.3 8.9 5.9 10.6 8 10.5Z" /></>;
}

export function SylvaDock({ navItems = DEFAULT_NAV_ITEMS, className = '' }: SylvaDockProps) {
  const dockRef = useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState(navItems[0]?.id ?? 'hero');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.35, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    const root = dockRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrow = window.matchMedia('(max-width: 900px)');
    const canHover = () => !reduced && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-dock]')).map((el) => ({ el, w: 0, h: 0, value: 0, velocity: 0, target: 0 }));
    const specItems = Array.from(root.querySelectorAll<HTMLElement>('[data-spec]')).map((el) => ({ el, angle: 2.4, targetAngle: 2.4, brightness: 0, targetBrightness: 0, reach: 185 }));
    let raf = 0;
    let disposed = false;
    let pointerX = 0;
    let pointerY = 0;
    let pointerSeen = false;
    let pointerMoved = false;

    const measure = () => {
      const stage = document.querySelector('.stage');
      const unit = (stage?.getBoundingClientRect().width ?? root.getBoundingClientRect().width) / (narrow.matches ? 760 : 1600);
      items.forEach((item) => {
        item.el.style.width = '';
        item.el.style.height = '';
        item.el.style.transform = '';
        const rect = item.el.getBoundingClientRect();
        item.w = rect.width;
        item.h = rect.height;
        item.value = 0;
        item.velocity = 0;
        item.target = 0;
        item.el.dataset.near = 'false';
      });
      return unit;
    };

    let unit = measure();
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerSeen = true;
      pointerMoved = true;
    };
    const onLeave = () => {
      pointerSeen = false;
      pointerMoved = true;
      items.forEach((item) => { item.target = 0; item.el.dataset.near = 'false'; });
      specItems.forEach((item) => { item.targetBrightness = 0; });
    };
    const onResize = () => { unit = measure(); };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);

    let last = performance.now();
    const tick = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (canHover() && pointerSeen && pointerMoved) {
        const dockRect = root.getBoundingClientRect();
        const inside = pointerX > dockRect.left - 48 && pointerX < dockRect.right + 48 && pointerY > dockRect.top - 44 && pointerY < dockRect.bottom + 104;
        items.forEach((item) => {
          const rect = item.el.getBoundingClientRect();
          const proximity = inside ? Math.max(0, Math.min(1, 1 - Math.abs(pointerX - (rect.left + rect.width / 2)) / (128 * unit))) : 0;
          item.target = proximity * proximity * (3 - 2 * proximity);
          item.el.dataset.near = item.target > 0.08 ? 'true' : 'false';
        });
        specItems.forEach((item) => {
          const rect = item.el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const distance = Math.hypot(Math.max(rect.left - pointerX, 0, pointerX - rect.right), Math.max(rect.top - pointerY, 0, pointerY - rect.bottom));
          item.targetAngle = Math.atan2(cy - pointerY, pointerX - cx);
          const proximity = Math.max(0, Math.min(1, 1 - distance / (item.reach * unit)));
          item.targetBrightness = proximity * proximity * (3 - 2 * proximity);
        });
      }
      pointerMoved = false;

      items.forEach((item) => {
        item.velocity += (item.target - item.value) * 190 * dt;
        item.velocity *= Math.exp(-23 * dt);
        item.value += item.velocity * dt;
        const value = Math.min(Math.max(item.value, 0), 1.08);
        const extraWidth = item.el.classList.contains('dock-mark') ? 14 * unit : Math.min(18 * unit, item.w * 0.24);
        item.el.style.width = `${(item.w + extraWidth * value).toFixed(2)}px`;
        item.el.style.height = `${(item.h + (item.el.classList.contains('dock-mark') ? 14 * unit : 16 * unit) * value).toFixed(2)}px`;
        item.el.style.transform = `translateY(${(value * 3.5 * unit).toFixed(2)}px)`;
      });
      specItems.forEach((item) => {
        const difference = ((item.targetAngle - item.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        item.angle += difference * (1 - Math.exp(-dt * 8));
        item.brightness += (item.targetBrightness - item.brightness) * (1 - Math.exp(-dt * 9));
        item.el.style.setProperty('--spec-angle', `${item.angle.toFixed(4)}rad`);
        item.el.style.setProperty('--spec-bright', `${Math.min(1, item.brightness) * 0.92}`);
      });
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [navItems]);

  const scrollTo = (item: SylvaNavItem) => {
    setActiveId(item.id);
    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`dock-wrap ${className}`}>
      <nav ref={dockRef} className="dock par-dock par" style={{ ['--pd' as string]: 5 }} data-spec aria-label="Navigasi utama">
        <button type="button" className="dock-item dock-mark cursor-pointer" data-dock data-spec aria-label="Kembali ke beranda" onClick={() => scrollTo(navItems[0] ?? DEFAULT_NAV_ITEMS[0])}>
          <svg viewBox="0 0 22 24" aria-hidden="true" className="w-3.5 h-3.75 fill-current"><path d="M11 1.3c-2.1 0-3.95 1.2-4.75 2.95C3.95 4.55 2.3 6.25 2.3 8.35c0 2.3 1.9 4.2 4.3 4.2h8.8c2.4 0 4.3-1.9 4.3-4.2 0-2.1-1.65-3.8-4-4.1C14.95 2.5 13.1 1.3 11 1.3Z" /><path d="M9.6 12.55h2.8v4.2c1.35.3 2.45 1.15 3.15 2.4-1.35.4-2.4.15-3.15-.4v4.15H9.6v-4.15c-.75.55-1.8.8-3.15.4.7-1.25 1.8-2.1 3.15-2.4v-4.2Z" /></svg>
        </button>
        {navItems.map((item, index) => (
          <a key={item.id} href={item.href} className={`dock-item ${activeId === item.id ? 'is-active' : ''}`} data-dock data-spec onClick={(event) => { event.preventDefault(); scrollTo(item); }}>
            <span className="glyph" aria-hidden="true"><svg viewBox="0 0 16 16" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="1.3"><NavIcon type={ICONS[index % ICONS.length]} /></svg></span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
