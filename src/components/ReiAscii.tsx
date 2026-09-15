import { useEffect, useRef, useState } from 'react';

const REI_FRAMES: { rows: string[]; accentRows?: number[] }[] = [
  {
    rows: [
      "             .-::::::::::.             ",
      "          .:+##############+:.          ",
      "        .+##################+.        ",
      "       +######*+==--==+*######+       ",
      "      *#####+:          :+#####*      ",
      "     +####*:    .::.      :*####+     ",
      "     #####:    :####:      :####      ",
      "    *####.     :####:       ####*     ",
      "    ####+       '::'        +####     ",
      "    ####+   .----------.    +####     ",
      "    *####.  /  .    .  \\   ####*     ",
      "     #####: |     __     | :#####     ",
      "      *####+\\   .----.  /+####*      ",
      "       +######+..____..+######+       ",
      "         +##################+         ",
      "          :+##############+:          ",
      "             '::------::'             ",
    ],
    accentRows: [5, 6, 7, 8, 9, 10, 11],
  },
  {
    rows: [
      "             .-::::::::::.             ",
      "          .:+##############+:.          ",
      "        .+##################+.        ",
      "       +######*+==--==+*######+       ",
      "      *#####+:          :+#####*      ",
      "     +####*:     .        :*####+     ",
      "     #####:    :####:      :####      ",
      "    *####.     :####:       ####*     ",
      "    ####+       '::'        +####     ",
      "    ####+   .----------.    +####     ",
      "    *####.  /   .  .   \\   ####*     ",
      "     #####: |     __     | :#####     ",
      "      *####+\\   .--.   /+####*      ",
      "       +######+..____..+######+       ",
      "         +##################+         ",
      "          :+##############+:          ",
      "             '::------::'             ",
    ],
    accentRows: [5, 6, 7, 8, 9, 10],
  },
  {
    rows: [
      "             .-::::::::::.             ",
      "          .:+##############+:.          ",
      "        .+##################+.        ",
      "       +######*+==--==+*######+       ",
      "      *#####+:          :+#####*      ",
      "     +####*:    .::.      :*####+     ",
      "     #####:    :####:      :####      ",
      "    *####.     :####:       ####*     ",
      "    ####+       '::'        +####     ",
      "    ####+   .----------.    +####     ",
      "    *####.  /  .    .  \\   ####*     ",
      "     #####: |     __     | :#####     ",
      "      *####+\\   .----.  /+####*      ",
      "       +######+..____..+######+       ",
      "         +##################+         ",
      "          :+##############+:          ",
      "             '::------::'             ",
    ],
    accentRows: [5, 6, 7, 8, 9, 10, 11],
  },
  {
    rows: [
      "             .-::::::::::.             ",
      "          .:+##############+:.          ",
      "        .+##################+.        ",
      "       +######*+==--==+*######+       ",
      "      *#####+:          :+#####*      ",
      "     +####*:     .        :*####+     ",
      "     #####:    :####:      :####      ",
      "    *####.     :####:       ####*     ",
      "    ####+       '::'        +####     ",
      "    ####+   .----------.    +####     ",
      "    *####.  /   .  .   \\   ####*     ",
      "     #####: |     __     | :#####     ",
      "      *####+\\   .--.   /+####*      ",
      "       +######+..____..+######+       ",
      "         +##################+         ",
      "          :+##############+:          ",
      "             '::------::'             ",
    ],
    accentRows: [5, 6, 7, 8, 9, 10],
  },
];

export function ReiAscii({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const [frame, setFrame] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [sweep, setSweep] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const visible = useIntersectionObserver(hostRef);

  useEffect(() => {
    if (reducedMotion || !visible) return;
    let frameId = 0;
    let last = 0;
    let elapsed = 0;

    const tick = (time: number) => {
      const delta = time - last;
      last = time;
      elapsed += delta;

      if (elapsed > 520) {
        elapsed = 0;
        setFrame((value) => (value + 1) % REI_FRAMES.length);
        if (Math.random() > 0.78) {
          setGlitch(true);
          window.setTimeout(() => setGlitch(false), 80);
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion, visible]);

  useEffect(() => {
    if (reducedMotion) return;
    let frameId = 0;
    const tick = (time: number) => {
      setSweep((time / 6000) % 1);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  const current = REI_FRAMES[frame];

  return (
    <div
      ref={hostRef}
      className={`rei-ascii ${glitch ? "is-glitching" : ""}`}
      role="img"
      aria-label="Stylized animated monochrome portrait inspired by retro anime signal graphics"
      style={{
        position: 'relative',
        minHeight: '28rem',
        overflow: 'hidden',
        display: 'grid',
        placeItems: 'center',
        border: '1px solid rgba(113,229,223,.23)',
        borderRadius: '1.2rem',
        background:
          'linear-gradient(105deg, rgba(255,255,255,.06), transparent 35%),' +
          'radial-gradient(circle at 50% 42%, rgba(185,169,238,.1), transparent 43%),' +
          'rgba(12, 18, 22, .72)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,.14),' +
          '0 20px 80px rgba(0,0,0,.28)',
      }}
    >
      <div
        className="rei-ascii__scanlines"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'repeating-linear-gradient(180deg, transparent 0 3px, rgba(113,229,223,.045) 4px, transparent 5px)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="rei-ascii__sweep"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent, rgba(113,229,223,.12), transparent)',
          transform: `translateX(${lerp(-100, 100, sweep)}%)`,
          opacity: sweep > 0.35 && sweep < 0.7 ? 1 : 0,
          transition: 'opacity 0.1s ease',
        }}
      />
      <pre
        aria-hidden="true"
        style={{
          position: 'relative',
          zIndex: 1,
          margin: 0,
          color: 'rgba(241,238,230,.82)',
          font: 'clamp(.42rem, 1vw, .72rem)/1.02 var(--font-mono)',
          letterSpacing: '.02em',
          textShadow: '0 0 12px rgba(113,229,223,.3)',
          transform: glitch ? 'translateX(2px)' : 'none',
          filter: glitch
            ? 'drop-shadow(-3px 0 rgba(240,165,108,.55)) drop-shadow(3px 0 rgba(113,229,223,.55))'
            : 'none',
          transition: 'transform 0.08s ease, filter 0.08s ease',
        }}
      >
        {current.rows.map((row, index) => (
          <span
            className={current.accentRows?.includes(index) ? "rei-ascii__accent" : ""}
            key={`${frame}-${index}`}
            style={{
              display: 'block',
              color: current.accentRows?.includes(index) ? 'var(--accent-lilac)' : 'inherit',
              textShadow: current.accentRows?.includes(index)
                ? '0 0 14px rgba(185,169,238,.56)'
                : 'inherit',
            }}
          >
            {row}
          </span>
        ))}
      </pre>
      <span
        className="rei-ascii__caption"
        style={{
          position: 'absolute',
          right: '1rem',
          bottom: '.85rem',
          color: 'var(--text-muted)',
          font: '.6rem var(--font-mono)',
          letterSpacing: '.14em',
        }}
      >
        SIGNAL / REI-01 / STANDBY
      </span>
    </div>
  );
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

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