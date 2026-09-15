import { useEffect, useRef, useState, useCallback } from 'react';

function useIntersectionObserver(
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
      { rootMargin: '100px', threshold: 0.01, ...options }
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [ref, options.rootMargin, options.threshold]);
  return isVisible;
}

function hash2(x: number, y: number, seed = 0) {
  let n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

function noise2d(x: number, y: number, seed = 0) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy, seed);
  const b = hash2(ix + 1, iy, seed);
  const c = hash2(ix, iy + 1, seed);
  const d = hash2(ix + 1, iy + 1, seed);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

function fbm(x: number, y: number, octaves = 3, seed = 0) {
  let value = 0, amplitude = 0.5, frequency = 1;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2d(x * frequency, y * frequency, seed + i * 100);
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

const DENSITY = ' .:-=+*#%@';

export function PhysicsAscii({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const visible = useIntersectionObserver(hostRef);
  const timeRef = useRef(0);
  const animRef = useRef<number>();
  const frameRef = useRef<string[][]>([]);
  const W = 72;
  const H = 28;
  const [reduced] = useState(reducedMotion);

  const initFrame = useCallback(() => {
    frameRef.current = Array.from({ length: H }, () => Array(W).fill(' '));
  }, []);

  const renderScene = useCallback((t: number) => {
    const frame = frameRef.current;
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) frame[y][x] = ' ';

    const cx = W / 2, cy = H / 2;

    // Condensed matter lattice background
    const latticeSpacing = 8;
    for (let ly = 0; ly < H; ly += latticeSpacing) {
      for (let lx = 0; lx < W; lx += latticeSpacing) {
        if (ly < H && lx < W) {
          const n = fbm(lx * 0.1, ly * 0.1, 2, Math.floor(t * 0.3));
          const idx = Math.floor(clamp(n, 0, 0.99) * DENSITY.length);
          frame[ly][lx] = DENSITY[idx];
        }
      }
    }

    // Scientific ML inference paths
    const paths = [
      { sx: 4, sy: 14, ex: 22, ey: 8, label: 'EMBED' },
      { sx: 22, sy: 8, ex: 40, ey: 14, label: 'TRANSFORMER' },
      { sx: 40, sy: 14, ex: 58, ey: 10, label: 'INFER' },
      { sx: 4, sy: 16, ex: 22, ey: 22, label: 'QUERY' },
      { sx: 22, sy: 22, ex: 40, ey: 18, label: 'ATTN' },
      { sx: 40, sy: 18, ex: 58, ey: 22, label: 'OUTPUT' },
    ];

    paths.forEach((p, pi) => {
      const steps = Math.max(Math.abs(p.ex - p.sx), Math.abs(p.ey - p.sy)) * 2;
      for (let i = 0; i <= steps; i++) {
      const px = Math.round(lerp(p.sx, p.ex, i / steps));
        const py = Math.round(lerp(p.sy, p.ey, i / steps));
        if (py >= 0 && py < H && px >= 0 && px < W) {
          const pulse = Math.sin(t * 3 + pi * 1.5 + i * 0.2) > 0.2;
          frame[py][px] = pulse ? '█' : '·';
        }
      }
    });

    paths.forEach(p => {
      if (p.ey >= 0 && p.ey < H && p.ex >= 0 && p.ex < W) {
        frame[p.ey][p.ex] = '●';
        p.label.split('').forEach((ch, i) => {
          if (p.ex + i < W && p.ey < H) frame[p.ey][p.ex + i] = ch;
        });
      }
    });

    // Phase diagram scatter
    for (let i = 0; i < 20; i++) {
      const px = Math.floor(55 + hash2(i, 7) * 16);
      const py = Math.floor(3 + hash2(i, 13) * 20);
      if (py < H && px < W) {
        const n = fbm(px * 0.05, py * 0.05, 2, Math.floor(t * 2 + i));
        const isActive = n > 0.6;
        frame[py][px] = isActive ? '█' : '○';
      }
    }

    // Bottom meta line
    const temp = (1.5 + Math.sin(t * 0.1) * 0.5).toFixed(2);
    const meta = `CONDENSED MATTER × SCIENTIFIC ML  T=${temp}  ORDER PARAMETER Φ≠0`;
    meta.split('').forEach((ch, i) => { if (H - 1 < H && i < W) frame[H - 1][i] = ch; });

    const pre = preRef.current;
    if (pre) pre.textContent = frame.map(r => r.join('')).join('\n');
  }, []);

  useEffect(() => {
    initFrame();
    if (reduced) {
      renderScene(0);
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
      timeRef.current += 0.03;
      renderScene(timeRef.current);
    };
    animRef.current = requestAnimationFrame(animate);
    renderScene(0);
    return () => cancelAnimationFrame(animRef.current!);
  }, [reduced, visible, renderScene, initFrame]);

  return (
    <div ref={hostRef} style={{ position: 'relative', width: '100%', maxWidth: 580, aspectRatio: '1' }}>
      <pre
        ref={preRef}
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(5px, 1vw, 8px)',
          lineHeight: 1.1,
          color: 'var(--accent-cyan)',
          whiteSpace: 'pre',
          overflow: 'hidden',
          userSelect: 'none',
          background: 'rgba(6, 9, 12, .68)',
          border: '1px solid rgba(113, 229, 229, .22)',
          borderRadius: '8px',
          padding: '8px',
          opacity: reduced ? 1 : 0.85,
        }}
      />
      <div style={{
        position: 'absolute', bottom: 4, right: 8,
        fontFamily: 'var(--font-mono)', fontSize: 8,
        color: 'var(--text-muted)', letterSpacing: 1,
      }}>
        PHYSICS SIM / v0.1
      </div>
    </div>
  );
}
