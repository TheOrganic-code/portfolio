import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

const DENSITY_RAMP = ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
const DENSITY_RAMP_SIMPLE = ' .:-=+*#%@';
const DENSITY_LATTICE = ' ·+ox█';
const DENSITY_ENERGY = ' .:\'`^"-~=+*#%@';
const DENSITY_GRAPH = ' │┌┐└┘├┤┬┴┼─━═║';

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function createFrame(w: number, h: number, fill = ' ') {
  return Array.from({ length: h }, () => Array(w).fill(fill));
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

function fbm(x: number, y: number, octaves = 4, seed = 0) {
  let value = 0, amplitude = 0.5, frequency = 1;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2d(x * frequency, y * frequency, seed + i * 100);
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value;
}

type SceneType = 'field' | 'lattice' | 'energy' | 'graph' | 'satfetch' | 'grokking' | 'systems';

interface AsciiInstrumentProps {
  scene: SceneType;
  width?: number;
  height?: number;
  className?: string;
  'aria-label'?: string;
  interactive?: boolean;
  onStateChange?: (state: string) => void;
  reducedMotion?: boolean;
}

export function AsciiInstrument({
  scene,
  width = 80,
  height = 24,
  className = '',
  'aria-label': ariaLabel,
  interactive = false,
  onStateChange,
  reducedMotion = false,
}: AsciiInstrumentProps) {
  const reduced = reducedMotion;
  const ref = useRef<HTMLPreElement>(null);
  const frameRef = useRef<string[][]>(createFrame(width, height));
  const timeRef = useRef(0);
  const animRef = useRef<number>();
  const visible = useIntersectionObserver(ref);
  const mountedRef = useRef(false);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5, active: false });
  const [pulse, setPulse] = useState<{ x: number; y: number; t: number } | null>(null);
  const [frozen, setFrozen] = useState(false);
  const [stateLabel, setStateLabel] = useState('');

  const renderField = useCallback((t: number) => {
    const frame = frameRef.current;
    const sources = [
      { x: 0.3 + 0.2 * Math.sin(t * 0.3), y: 0.4 + 0.15 * Math.cos(t * 0.25) },
      { x: 0.7 + 0.15 * Math.cos(t * 0.2), y: 0.6 + 0.2 * Math.sin(t * 0.35) },
      { x: 0.5 + 0.25 * Math.sin(t * 0.15), y: 0.25 + 0.1 * Math.cos(t * 0.4) },
    ];

    let state = 'STABLE';

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nx = x / width, ny = y / height;
        let v = 0;

        sources.forEach((s, i) => {
          const dx = nx - s.x, dy = (ny - s.y) * (width / height);
          const d = Math.sqrt(dx * dx + dy * dy);
          v += Math.sin(d * 30 - t * (1.5 + i * 0.2)) * Math.exp(-d * 8) * 0.5;
        });

        v += fbm(nx * 4, ny * 4, 3, 1) * 0.15;

        const pdx = nx - pointer.x, pdy = (ny - pointer.y) * (width / height);
        const pd = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pointer.active && pd < 0.15) {
          v += Math.exp(-pd * 20) * 0.8;
          state = 'PERTURBED';
        }

        if (pulse) {
          const px = nx - pulse.x, py = (ny - pulse.y) * (width / height);
          const pdist = Math.sqrt(px * px + py * py);
          const pulseAge = t - pulse.t;
          if (pulseAge < 1.5 && pdist < 0.1 + pulseAge * 0.15) {
            v += Math.exp(-pdist * 15) * (1 - pulseAge / 1.5) * 1.2;
            state = 'DECAYING';
          }
        }

        v = (v + 1) * 0.5;
        const idx = Math.floor(clamp(v, 0, 0.999) * (DENSITY_RAMP.length - 1));
        frame[y][x] = DENSITY_RAMP[idx];
      }
    }

    if (ref.current) ref.current.textContent = frameToString(frame);
    setStateLabel(state);
    onStateChange?.(state);
  }, [width, height, pointer, pulse, onStateChange]);

  const renderLattice = useCallback((t: number) => {
    const frame = frameRef.current;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) frame[y][x] = ' ';
    }

    const cols = 8, rows = 6;
    const cellW = width / cols, cellH = height / rows;
    const candidates = [
      { x: 1.5, y: 1.5, confidence: 0.3 },
      { x: 3.5, y: 1.5, confidence: 0.4 },
      { x: 5.5, y: 1.5, confidence: 0.25 },
      { x: 2.5, y: 3.5, confidence: 0.5 },
      { x: 4.5, y: 3.5, confidence: 0.6 },
      { x: 6.5, y: 3.5, confidence: 0.35 },
    ];

    const progress = (Math.sin(t * 0.2) + 1) * 0.5;
    candidates.forEach((c, i) => {
      c.confidence = lerp(c.confidence, i === 3 ? 0.9 : 0.2, progress * 0.02);
    });

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = Math.round((c + 0.5) * cellW);
        const cy = Math.round((r + 0.5) * cellH);
        if (cy < height && cx < width) frame[cy][cx] = '·';
        if (c < cols - 1) {
          const cx2 = Math.round((c + 1) * cellW);
          for (let ix = cx; ix <= cx2 && ix < width; ix++) {
            if (cy < height) frame[cy][ix] = '─';
          }
        }
        if (r < rows - 1) {
          const cy2 = Math.round((r + 1) * cellH);
          for (let iy = cy; iy <= cy2 && iy < height; iy++) {
            if (cx < width) frame[iy][cx] = '│';
          }
        }
      }
    }

    candidates.forEach((cand, i) => {
      const cx = Math.round((cand.x + 0.5) * cellW);
      const cy = Math.round((cand.y + 0.5) * cellH);
      if (cy >= 0 && cy < height && cx >= 0 && cx < width) {
        const ch = cand.confidence > 0.7 ? '█' : cand.confidence > 0.4 ? 'o' : '+';
        frame[cy][cx] = ch;
      }
    });

    const metaY = height - 3;
    const meta = `CANDIDATES: ${candidates.length}  SYMMETRY: Pm-3m  LOSS: ${(0.1 + 0.05 * Math.sin(t)).toFixed(4)}  ITER: ${Math.floor(t * 10) % 500}`;
    meta.split('').forEach((ch, i) => { if (metaY < height) frame[metaY][i] = ch; });

    if (ref.current) ref.current.textContent = frameToString(frame);
    setStateLabel('LATTICE OPTIMIZATION');
    onStateChange?.('LATTICE OPTIMIZATION');
  }, [width, height, onStateChange]);

  const renderEnergy = useCallback((t: number) => {
    const frame = frameRef.current;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) frame[y][x] = ' ';
    }

    const gridSize = 12;
    const cellW = Math.floor((width - 10) / gridSize);
    const cellH = Math.floor((height - 6) / gridSize);
    const spins = useMemo(() => Array.from({ length: gridSize * gridSize }, () => Math.random() > 0.5 ? 1 : -1), []);
    const energyTrace = useRef<number[]>([]);

    if (!ref.current) return;

    let accepted = 0;
    const temp = 1.5 + Math.sin(t * 0.1) * 0.5;

    for (let step = 0; step < 3; step++) {
      const i = Math.floor(Math.random() * spins.length);
      const x = i % gridSize, y = Math.floor(i / gridSize);
      let dE = 0;
      const neighbors = [[0,1],[0,-1],[1,0],[-1,0]];
      neighbors.forEach(([nx, ny]) => {
        const nx2 = (x + nx + gridSize) % gridSize;
        const ny2 = (y + ny + gridSize) % gridSize;
        dE += spins[ny2 * gridSize + nx2];
      });
      dE *= 2 * spins[i];
      if (dE < 0 || Math.random() < Math.exp(-dE / temp)) {
        spins[i] *= -1;
        accepted++;
      }
    }

    let energy = 0;
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const s = spins[y * gridSize + x];
        const neighbors = [[0,1],[1,0]];
        neighbors.forEach(([nx, ny]) => {
          const nx2 = (x + nx) % gridSize;
          const ny2 = (y + ny) % gridSize;
          energy -= s * spins[ny2 * gridSize + nx2];
        });
      }
    }
    energyTrace.current.push(energy);
    if (energyTrace.current.length > width - 15) energyTrace.current.shift();

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const s = spins[y * gridSize + x];
        const cx = x * cellW + 5, cy = y * cellH + 2;
        if (cy < height && cx < width) {
          frame[cy][cx] = s > 0 ? '▲' : '▼';
        }
      }
    }

    const traceY = height - 3;
    const minE = Math.min(...energyTrace.current);
    const maxE = Math.max(...energyTrace.current);
    energyTrace.current.forEach((e, i) => {
      const ny = traceY - Math.round(((e - minE) / (maxE - minE || 1)) * (height - 6));
      if (ny >= 0 && ny < height && i + 10 < width) {
        frame[ny][i + 10] = '·';
      }
    });

    const meta = `TEMP: ${temp.toFixed(2)}  ENERGY: ${energy.toFixed(1)}  ACCEPTED: ${accepted}  MAX-CUT SEARCH`;
    meta.split('').forEach((ch, i) => { if (traceY + 1 < height) frame[traceY + 1][i] = ch; });

    if (ref.current) ref.current.textContent = frameToString(frame);
    setStateLabel('STOCHASTIC STATE SEARCH');
    onStateChange?.('STOCHASTIC STATE SEARCH');
  }, [width, height, onStateChange]);

  const renderGraph = useCallback((t: number) => {
    const frame = frameRef.current;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) frame[y][x] = ' ';
    }

    const nodes = [
      { id: 'INPUT', x: 4, y: 7 },
      { id: 'MATMUL', x: 16, y: 3 },
      { id: 'RELU', x: 16, y: 11 },
      { id: 'LOSS', x: 28, y: 7 },
      { id: 'GRAD', x: 40, y: 7 },
      { id: 'OPTIM', x: 52, y: 7 },
      { id: 'TENSOR', x: 4, y: 15 },
      { id: 'AUTODIFF', x: 16, y: 15 },
      { id: 'LAYERS', x: 28, y: 15 },
      { id: 'INFERENCE', x: 40, y: 15 },
      { id: 'RUST', x: 52, y: 15 },
    ];

    const edges = [
      ['INPUT', 'MATMUL'], ['INPUT', 'RELU'],
      ['MATMUL', 'LOSS'], ['RELU', 'LOSS'],
      ['LOSS', 'GRAD'], ['GRAD', 'OPTIM'],
      ['TENSOR', 'AUTODIFF'], ['AUTODIFF', 'LAYERS'],
      ['LAYERS', 'INFERENCE'], ['INFERENCE', 'RUST'],
    ];

    const forwardPhase = Math.sin(t * 0.5) > 0;
    const phaseLabel = forwardPhase ? 'FORWARD' : 'BACKWARD';
    const activePath = forwardPhase
      ? [['INPUT', 'MATMUL'], ['MATMUL', 'LOSS'], ['LOSS', 'GRAD']]
      : [['GRAD', 'LOSS'], ['LOSS', 'MATMUL'], ['MATMUL', 'INPUT']];

    edges.forEach(([a, b]) => {
      const na = nodes.find(n => n.id === a)!;
      const nb = nodes.find(n => n.id === b)!;
      const steps = Math.max(Math.abs(nb.x - na.x), Math.abs(nb.y - na.y)) * 2;
      for (let i = 0; i <= steps; i++) {
        const px = Math.round(lerp(na.x, nb.x, i / steps));
        const py = Math.round(lerp(na.y, nb.y, i / steps));
        if (py >= 0 && py < height && px >= 0 && px < width) {
          const isActive = activePath.some(([aa, bb]) => aa === a && bb === b);
          const pulse = isActive && Math.sin(t * 4 + i * 0.3) > 0.3;
          frame[py][px] = pulse ? '█' : (py === na.y ? '─' : '│');
        }
      }
    });

    nodes.forEach(node => {
      if (node.y >= 0 && node.y < height && node.x >= 0 && node.x < width) {
        frame[node.y][node.x] = '●';
        node.id.split('').forEach((ch, i) => {
          if (node.x + i < width && node.y < height) frame[node.y][node.x + i] = ch;
        });
      }
    });

    const meta = `TENSOR → AUTODIFF → LAYERS → OPTIMIZER → INFERENCE  [${phaseLabel} PASS]`;
    meta.split('').forEach((ch, i) => { if (height - 1 < height) frame[height - 1][i] = ch; });

    if (ref.current) ref.current.textContent = frameToString(frame);
    setStateLabel(`COMPUTATIONAL GRAPH / ${phaseLabel}`);
    onStateChange?.(`COMPUTATIONAL GRAPH / ${phaseLabel}`);
  }, [width, height, onStateChange]);

  const renderSatfetch = useCallback((t: number) => {
    const frame = frameRef.current;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) frame[y][x] = ' ';
    }

    const queryX = 5, queryY = 3;
    const embedX = Math.floor(width * 0.35), embedY = 3;
    const indexX = Math.floor(width * 0.6), indexY = 3;
    const resultX = width - 10, resultY = 3;

    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) * 2;
      for (let i = 0; i <= steps; i++) {
        const px = Math.round(lerp(x1, x2, i / steps));
        const py = Math.round(lerp(y1, y2, i / steps));
        if (py >= 0 && py < height && px >= 0 && px < width) {
          frame[py][px] = i % 3 === 0 ? '·' : '─';
        }
      }
    };

    const drawBox = (cx: number, cy: number, label: string, w: number, h: number) => {
      const x1 = cx - Math.floor(w/2), y1 = cy - Math.floor(h/2);
      const x2 = cx + Math.ceil(w/2), y2 = cy + Math.ceil(h/2);
      for (let x = x1; x <= x2; x++) {
        if (y1 >= 0 && y1 < height && x >= 0 && x < width) frame[y1][x] = '─';
        if (y2 >= 0 && y2 < height && x >= 0 && x < width) frame[y2][x] = '─';
      }
      for (let y = y1; y <= y2; y++) {
        if (y >= 0 && y < height && x1 >= 0 && x1 < width) frame[y][x1] = '│';
        if (y >= 0 && y < height && x2 >= 0 && x2 < width) frame[y][x2] = '│';
      }
      if (y1 >= 0 && y1 < height && x1 >= 0 && x1 < width) frame[y1][x1] = '┌';
      if (y1 >= 0 && y1 < height && x2 >= 0 && x2 < width) frame[y1][x2] = '┐';
      if (y2 >= 0 && y2 < height && x1 >= 0 && x1 < width) frame[y2][x1] = '└';
      if (y2 >= 0 && y2 < height && x2 >= 0 && x2 < width) frame[y2][x2] = '┘';
      label.split('').forEach((ch, i) => {
        const lx = cx - Math.floor(label.length/2) + i;
        if (cy >= 0 && cy < height && lx >= 0 && lx < width) frame[cy][lx] = ch;
      });
    };

    drawBox(queryX, queryY, 'QUERY', 12, 5);
    drawBox(embedX, embedY, 'EMBEDDING', 16, 5);
    drawBox(indexX, indexY, 'FAISS INDEX', 16, 5);
    drawBox(resultX, resultY, 'RESULTS', 12, 8);

    drawLine(queryX + 6, queryY, embedX - 8, embedY);
    drawLine(embedX + 8, embedY, indexX - 8, indexY);
    drawLine(indexX + 8, indexY, resultX - 6, resultY);

    const results = [
      '▓▓░░▓▓░░▓▓░░',
      '░░▓▓░░▓▓░░▓▓',
      '▓▓░░▓▓░░▓▓░░',
      '░░▓▓░░▓▓░░▓▓',
      '▓▓░░▓▓░░▓▓░░',
      '░░▓▓░░▓▓░░▓▓',
    ];
    results.forEach((row, i) => {
      row.split('').forEach((ch, j) => {
        const ry = resultY - 3 + i;
        const rx = resultX - 5 + j;
        if (ry >= 0 && ry < height && rx >= 0 && rx < width) frame[ry][rx] = ch;
      });
    });

    const meta = `QUERY → CLIP → FAISS → H3 FILTER → GEO MATCH`;
    meta.split('').forEach((ch, i) => { if (height - 1 < height) frame[height - 1][i] = ch; });

    if (ref.current) ref.current.textContent = frameToString(frame);
    setStateLabel('CROSS-MODAL RETRIEVAL');
    onStateChange?.('CROSS-MODAL RETRIEVAL');
  }, [width, height, onStateChange]);

  const renderGrokking = useCallback((t: number) => {
    const frame = frameRef.current;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) frame[y][x] = ' ';
    }

    const plotX = 10, plotY = 2, plotW = width - 20, plotH = height - 6;

    for (let x = 0; x < plotW; x++) {
      const px = plotX + x;
      const py = plotY + plotH;
      if (py < height) frame[py][px] = '─';
    }
    for (let y = 0; y < plotH; y++) {
      const py = plotY + y;
      const px = plotX;
      if (px < width) frame[py][px] = '│';
    }

    const kStar = 4.2;
    const steps = 30;
    for (let k = 2; k <= 10; k += 1) {
      const x = plotX + Math.round(((k - 2) / 8) * plotW);
      const grokked = k <= 4;
      const maxSteps = grokked ? 5400 : 30000;
      const progress = Math.min(1, (Math.sin(t * 0.5 + k) + 1) / 2 * 1.5);
      const currentStep = Math.floor(maxSteps * progress);
      const normalizedY = 1 - Math.min(1, currentStep / maxSteps);
      const y = plotY + Math.round(normalizedY * plotH);
      if (y < height && x < width) {
        frame[y][x] = grokked ? '●' : '○';
      }
      if (x < width && plotY + plotH < height) {
        frame[plotY + plotH][x] = `${k}`.charAt(0);
      }
    }

    const kStarX = plotX + Math.round(((kStar - 2) / 8) * plotW);
    for (let y = plotY; y <= plotY + plotH; y++) {
      if (y < height && kStarX < width) frame[y][kStarX] = y % 2 === 0 ? '│' : '·';
    }

    const meta = `GROKKING PHASE TRANSITION  k* ≈ 4.2  x^(1/4) ✓  x^(1/5) ✗`;
    meta.split('').forEach((ch, i) => { if (height - 1 < height) frame[height - 1][i] = ch; });

    if (ref.current) ref.current.textContent = frameToString(frame);
    setStateLabel('PHASE TRANSITION ANALYSIS');
    onStateChange?.('PHASE TRANSITION ANALYSIS');
  }, [width, height, onStateChange]);

  const renderSystems = useCallback((t: number) => {
    const frame = frameRef.current;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) frame[y][x] = ' ';
    }

    const leftX = 8, rightX = width - 20, midY = Math.floor(height / 2);

    const drawBox = (cx: number, cy: number, label: string, lines: string[], w: number) => {
      const x1 = cx - Math.floor(w/2), y1 = cy - Math.floor(lines.length/2) - 1;
      const x2 = cx + Math.ceil(w/2), y2 = cy + Math.ceil(lines.length/2) + 1;
      for (let x = x1; x <= x2; x++) {
        if (y1 >= 0 && y1 < height && x >= 0 && x < width) frame[y1][x] = '─';
        if (y2 >= 0 && y2 < height && x >= 0 && x < width) frame[y2][x] = '─';
      }
      for (let y = y1; y <= y2; y++) {
        if (y >= 0 && y < height && x1 >= 0 && x1 < width) frame[y][x1] = '│';
        if (y >= 0 && y < height && x2 >= 0 && x2 < width) frame[y][x2] = '│';
      }
      if (y1 >= 0 && y1 < height && x1 >= 0 && x1 < width) frame[y1][x1] = '┌';
      if (y1 >= 0 && y1 < height && x2 >= 0 && x2 < width) frame[y1][x2] = '┐';
      if (y2 >= 0 && y2 < height && x1 >= 0 && x1 < width) frame[y2][x1] = '└';
      if (y2 >= 0 && y2 < height && x2 >= 0 && x2 < width) frame[y2][x2] = '┘';
      label.split('').forEach((ch, i) => {
        const lx = cx - Math.floor(label.length/2) + i;
        if (y1 - 1 >= 0 && y1 - 1 < height && lx >= 0 && lx < width) frame[y1 - 1][lx] = ch;
      });
      lines.forEach((line, i) => {
        const ly = y1 + 1 + i;
        line.split('').forEach((ch, j) => {
          const lx = x1 + 2 + j;
          if (ly < height && lx < width) frame[ly][lx] = ch;
        });
      });
    };

    const arrowY = midY;
    for (let x = leftX + 14; x < rightX; x++) {
      if (arrowY < height && x < width) frame[arrowY][x] = x % 4 === 0 ? '▶' : '─';
    }

    drawBox(leftX, midY, 'QINETIC', [
      'QUANTUM ALGO',
      'QUANTUM NET',
      'PINNs 4 QUANTUM',
      'THEORY',
    ], 20);

    drawBox(rightX, midY, 'DIGITWIN', [
      'LORA/QLORA',
      'RAG PIPELINES',
      'KV CACHE OPT',
      'VLLM DEPLOY',
    ], 20);

    const meta = `RESEARCH ↔ PRODUCTION  PINNs → LLM SYSTEMS → PIPELINES`;
    meta.split('').forEach((ch, i) => { if (height - 1 < height) frame[height - 1][i] = ch; });

    if (ref.current) ref.current.textContent = frameToString(frame);
    setStateLabel('DUAL-TRACK SIGNAL CHAIN');
    onStateChange?.('DUAL-TRACK SIGNAL CHAIN');
  }, [width, height, onStateChange]);

  const render = useCallback(() => {
    if (frozen) return;
    const t = timeRef.current;
    switch (scene) {
      case 'field': renderField(t); break;
      case 'lattice': renderLattice(t); break;
      case 'energy': renderEnergy(t); break;
      case 'graph': renderGraph(t); break;
      case 'satfetch': renderSatfetch(t); break;
      case 'grokking': renderGrokking(t); break;
      case 'systems': renderSystems(t); break;
    }
  }, [scene, frozen, renderField, renderLattice, renderEnergy, renderGraph, renderSatfetch, renderGrokking, renderSystems]);

  useEffect(() => {
    if (reduced) {
      render();
      return;
    }
    const targetFps = scene === 'graph' || scene === 'grokking' || scene === 'systems' ? 12 : scene === 'energy' ? 15 : 18;
    const frameMs = 1000 / targetFps;
    let lastTime = 0;
    const animate = (now: number) => {
      animRef.current = requestAnimationFrame(animate);
      if (!visible || frozen) return;
      if (now - lastTime < frameMs) return;
      lastTime = now;
      timeRef.current += 0.03;
      render();
    };
    animRef.current = requestAnimationFrame(animate);
    // Initial render
    if (!mountedRef.current) {
      mountedRef.current = true;
      render();
    }
    return () => cancelAnimationFrame(animRef.current!);
  }, [reduced, visible, frozen, scene, render]);

  // Ensure initial render on mount
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      render();
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!interactive) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: clamp((e.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((e.clientY - rect.top) / rect.height, 0, 1),
      active: true,
    });
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    setPointer(p => ({ ...p, active: false }));
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!interactive) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const t = timeRef.current;
    setPulse({
      x: clamp((e.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((e.clientY - rect.top) / rect.height, 0, 1),
      t,
    });
    setTimeout(() => setPulse(null), 1500);
  }, [interactive]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setFrozen(f => !f);
    }
    if (e.key === 'r' || e.key === 'R') {
      timeRef.current = 0;
    }
  }, []);

  const sceneLabels: Record<SceneType, string> = {
    field: 'INTERFERENCE MODEL',
    lattice: 'LATTICE OPTIMIZATION',
    energy: 'STOCHASTIC STATE SEARCH',
    graph: 'COMPUTATIONAL GRAPH',
    satfetch: 'CROSS-MODAL RETRIEVAL',
    grokking: 'PHASE TRANSITION ANALYSIS',
    systems: 'DUAL-TRACK SIGNAL CHAIN',
  };

  return (
    <div style={{ position: 'relative' }}>
      <pre
        ref={ref}
        className={`ascii-instrument ${className}`}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(7px, 1.2vw, 11px)',
          lineHeight: 1.15,
          color: 'var(--text-muted)',
          whiteSpace: 'pre',
          overflow: 'hidden',
          userSelect: 'none',
          background: 'rgba(6, 9, 12, .68)',
          border: '1px solid rgba(118, 232, 229, .22)',
          borderRadius: '8px',
          padding: '16px',
        }}
        aria-label={ariaLabel}
        role="img"
        tabIndex={interactive ? 0 : -1}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      {stateLabel && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          textTransform: 'uppercase', letterSpacing: 1,
          color: 'var(--accent-cyan)', opacity: 0.8,
          background: 'rgba(18,18,18,0.9)',
          padding: '2px 8px', borderRadius: 4,
          border: '1px solid rgba(113,229,223,0.2)',
        }}>
          {stateLabel}
        </div>
      )}
      {interactive && (
        <div style={{
          position: 'absolute', bottom: 8, left: 12, right: 12,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color: 'var(--text-muted)', pointerEvents: 'none',
        }}>
          <span>SPACE: freeze/unfreeze</span>
          <span>R: reset</span>
        </div>
      )}
      <div style={{
        position: 'absolute', bottom: -20, left: 16,
        fontFamily: 'var(--font-mono)', fontSize: 9,
        textTransform: 'uppercase', letterSpacing: 1.5,
        color: 'var(--text-muted)', opacity: 0.6,
      }}>
        {scene.toUpperCase()} / {sceneLabels[scene]}
      </div>
    </div>
  );
}