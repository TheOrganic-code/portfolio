import { useEffect, useRef, useState, useCallback } from 'react';

const CHARS = ' .:\'`^"-~=+*#%@';
const CHARS_DENSE = ' .:-=+*#%@';

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

function createFrame(width: number, height: number, fill = ' ') {
  return Array.from({ length: height }, () => Array(width).fill(fill));
}

function frameToString(frame: string[][]) {
  return frame.map(row => row.join('')).join('\n');
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '50px', threshold: 0.01, ...options }
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [ref, options.rootMargin, options.threshold]);

  return isVisible;
}

export function HeroSignal({ width = 60, height = 24, speed = 1 }: { width?: number; height?: number; speed?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLPreElement>(null);
  const frameRef = useRef<string[][]>(createFrame(width, height));
  const timeRef = useRef(0);
  const animRef = useRef<number>();
  const visible = useIntersectionObserver(ref);

  const render = useCallback(() => {
    const frame = frameRef.current;
    const t = timeRef.current;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nx = (x - width / 2) / (width / 2);
        const ny = (y - height / 2) / (height / 2);
        const d = Math.sqrt(nx * nx + ny * ny * 1.5);

        const wave1 = Math.sin(d * 6 - t * 1.5) * 0.5;
        const wave2 = Math.sin(nx * 8 + t * 0.8) * 0.3;
        const wave3 = Math.sin(ny * 6 - t * 1.2) * 0.2;
        const lattice = Math.sin(nx * 12) * Math.sin(ny * 10) * 0.4;
        const noise = (Math.random() - 0.5) * 0.1;

        let v = wave1 + wave2 + wave3 + lattice + noise;
        v = clamp(v + 0.5, 0, 1);

        const charIndex = Math.floor(v * (CHARS.length - 1));
        frame[y][x] = CHARS[charIndex];
      }
    }

    if (ref.current) {
      ref.current.textContent = frameToString(frame);
    }
  }, [width, height]);

  useEffect(() => {
    if (reduced) {
      render();
      return;
    }

    const targetFps = 18;
    const frameMs = 1000 / targetFps;
    let lastTime = 0;

    const animate = (now: number) => {
      animRef.current = requestAnimationFrame(animate);
      if (!visible) return;
      if (now - lastTime < frameMs) return;
      lastTime = now;
      timeRef.current += 0.035 * speed;
      render();
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current!);
  }, [reduced, visible, speed, render]);

  return (
    <pre
      ref={ref}
      className="ascii-scene ascii-scene--hero"
      aria-label="Animated lattice field visualization representing computational condensed matter research"
      role="img"
    />
  );
}

export function ProjectStateField({ width = 32, height = 16, mode = 'stable' }: { width?: number; height?: number; mode?: 'stable' | 'stochastic' | 'transition' }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLPreElement>(null);
  const frameRef = useRef<string[][]>(createFrame(width, height));
  const timeRef = useRef(0);
  const animRef = useRef<number>();
  const visible = useIntersectionObserver(ref);
  const [internalMode, setInternalMode] = useState(mode);

  useEffect(() => { setInternalMode(mode); }, [mode]);

  const render = useCallback(() => {
    const frame = frameRef.current;
    const t = timeRef.current;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let v = 0;
        const cx = width / 2;
        const cy = height / 2;
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (internalMode === 'stable') {
          const lattice = Math.sin(x * 1.2) * Math.sin(y * 1.2);
          v = (lattice + 1) / 2;
        } else if (internalMode === 'stochastic') {
          const thermal = (Math.random() - 0.5) * 1.2;
          const spin = Math.sin(x * 1.5 + t * 0.5) * Math.sin(y * 1.5 + t * 0.3);
          v = clamp((spin + thermal + 1) / 2, 0, 1);
        } else {
          const progress = (Math.sin(t * 0.8) + 1) / 2;
          const lattice = Math.sin(x * 1.2) * Math.sin(y * 1.2);
          const thermal = (Math.random() - 0.5) * 1.2;
          const spin = Math.sin(x * 1.5 + t * 0.5) * Math.sin(y * 1.5 + t * 0.3);
          v = clamp(lerp((lattice + 1) / 2, (spin + thermal + 1) / 2, progress), 0, 1);
        }

        const charIndex = Math.floor(v * (CHARS_DENSE.length - 1));
        frame[y][x] = CHARS_DENSE[charIndex];
      }
    }

    if (ref.current) {
      ref.current.textContent = frameToString(frame);
    }
  }, [width, height, internalMode]);

  useEffect(() => {
    if (reduced) {
      render();
      return;
    }

    const targetFps = 15;
    const frameMs = 1000 / targetFps;
    let lastTime = 0;

    const animate = (now: number) => {
      animRef.current = requestAnimationFrame(animate);
      if (!visible) return;
      if (now - lastTime < frameMs) return;
      lastTime = now;
      timeRef.current += 0.05;
      render();
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current!);
  }, [reduced, visible, render]);

  return (
    <pre
      ref={ref}
      className="ascii-scene ascii-scene--project"
      aria-label={`Animated ${internalMode} spin lattice for p-bit probabilistic computing simulation`}
      role="img"
    />
  );
}

export function SystemGraph({ width = 40, height = 14 }: { width?: number; height?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLPreElement>(null);
  const frameRef = useRef<string[][]>(createFrame(width, height));
  const timeRef = useRef(0);
  const animRef = useRef<number>();
  const visible = useIntersectionObserver(ref);

  const nodes = [
    { x: 4, y: 6, label: 'Tensor' },
    { x: 14, y: 2, label: 'Autograd' },
    { x: 24, y: 6, label: 'Graph' },
    { x: 34, y: 6, label: 'Layers' },
    { x: 14, y: 10, label: 'Optim' },
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [2, 4]];

  const render = useCallback(() => {
    const frame = frameRef.current;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) { frame[y][x] = ' '; }
    }

    const t = timeRef.current;

    edges.forEach(([a, b]) => {
      const n1 = nodes[a], n2 = nodes[b];
      const steps = Math.max(Math.abs(n2.x - n1.x), Math.abs(n2.y - n1.y)) * 2;
      for (let i = 0; i <= steps; i++) {
        const px = Math.round(lerp(n1.x, n2.x, i / steps));
        const py = Math.round(lerp(n1.y, n2.y, i / steps));
        if (py >= 0 && py < height && px >= 0 && px < width) {
          const pulse = Math.sin(t * 2 + i * 0.5) > 0.3 ? '━' : '═';
          if (frame[py][px] === ' ') frame[py][px] = pulse;
        }
      }
    });

    nodes.forEach((node, i) => {
      const pulse = Math.sin(t * 3 + i) > 0 ? '◆' : '◇';
      if (node.y >= 0 && node.y < height && node.x >= 0 && node.x < width) {
        frame[node.y][node.x] = pulse;
      }
      const label = node.label;
      for (let j = 0; j < label.length; j++) {
        const lx = node.x - Math.floor(label.length / 2) + j;
        const ly = node.y + 2;
        if (ly < height && lx >= 0 && lx < width) {
          frame[ly][lx] = label[j];
        }
      }
    });

    if (ref.current) {
      ref.current.textContent = frameToString(frame);
    }
  }, [width, height]);

  useEffect(() => {
    if (reduced) {
      render();
      return;
    }

    const targetFps = 12;
    const frameMs = 1000 / targetFps;
    let lastTime = 0;

    const animate = (now: number) => {
      animRef.current = requestAnimationFrame(animate);
      if (!visible) return;
      if (now - lastTime < frameMs) return;
      lastTime = now;
      timeRef.current += 0.04;
      render();
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current!);
  }, [reduced, visible, render]);

  return (
    <pre
      ref={ref}
      className="ascii-scene ascii-scene--project"
      aria-label="Animated computational graph showing tensor operations, automatic differentiation, and neural network layers for NeuraRust"
      role="img"
    />
  );
}