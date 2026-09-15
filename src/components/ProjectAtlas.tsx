import { useCallback, useEffect, useRef, useState } from 'react'
import { AsciiInstrument } from './AsciiInstrument'

type Project = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  question: string;
  mechanism: string;
  implementation: string;
  evidence: string;
  scene: "lattice" | "satfetch" | "graph" | "energy" | "grokking" | "systems";
};

const projects: Project[] = [
  {
    id: "meown",
    number: "01",
    eyebrow: "RESEARCH / QUANTUM MATERIALS LAB / FIRST AUTHOR",
    title: "MEOWN / Accelerated μSR Detection",
    question: "Can physics-informed learning reduce the cost of identifying muon stopping sites in crystalline materials?",
    mechanism: "CRYSTAL STRUCTURE → SYMMETRY REDUCTION → PHYSICS-INFORMED PREDICTION",
    implementation: "A physics-informed neural framework for rapid muon-site prediction using Pymatgen, PyTorch, PINN/PhyCNN strategies, differentiable optimization, NumPy, SciPy, and Pandas.",
    evidence: "First-author manuscript under review at Physical Review B, according to the supplied résumé.",
    scene: "lattice",
  },
  {
    id: "satfetch",
    number: "02",
    eyebrow: "REMOTE SENSING / PERSONAL PROJECT / ISRO BAH",
    title: "SatFetch / Cross-Modal Retrieval",
    question: "Can optical, SAR, multispectral, and text queries retrieve the same geographic evidence?",
    mechanism: "QUERY → CROSS-SENSOR EMBEDDING → SPATIAL SEARCH",
    implementation: "A CLIP-based retrieval system using FAISS, Uber H3, SatCLIP, DOFA-CLIP, and SARCLIP over Indian Earth-observation data.",
    evidence: "Selected for the next round of ISRO Bharatiya Antariksh Hackathon 2026; ranked #2 in the problem statement in India, according to the supplied résumé.",
    scene: "satfetch",
  },
  {
    id: "neurarust",
    number: "03",
    eyebrow: "SYSTEMS / OPEN SOURCE / PERSONAL PROJECT",
    title: "NeuraRust / Neural Infrastructure",
    question: "What becomes visible when the neural-network abstraction is rebuilt from the tensor level upward?",
    mechanism: "TENSOR OPS → AUTODIFF → LAYERS → OPTIMIZER → INFERENCE",
    implementation: "A neural-network library built from scratch in Rust with tensor operations, automatic differentiation, modular layer APIs, memory safety, and zero-cost abstractions.",
    evidence: "Personal project with the public repository linked from the GitHub profile when available.",
    scene: "graph",
  },
  {
    id: "pbit",
    number: "04",
    eyebrow: "PROBABILISTIC COMPUTING / PERSONAL PROJECT",
    title: "Physics-Informed p-bit Simulator",
    question: "How can stochastic bits explore energy landscapes and combinatorial solutions?",
    mechanism: "THERMAL NOISE → ASYNCHRONOUS SPINS → ENERGY SEARCH",
    implementation: "A PyTorch and NumPy simulator for stochastic Ising systems and Boltzmann machines with tunable thermal noise and MAX-CUT benchmark verification.",
    evidence: "Evolving into a reusable PyTorch-compatible p-bit library.",
    scene: "energy",
  },
  {
    id: "grokking",
    number: "05",
    eyebrow: "RESEARCH / GENERALIZATION / ONGOING",
    title: "Grokking in Root-Function Networks",
    question: "Does a critical exponent determine whether a network eventually generalizes?",
    mechanism: "FUNCTION FAMILY → DELAYED GENERALIZATION → PHASE TRANSITION",
    implementation: "Experiments on networks trained on x^(1/k), with k from 2 to 10, studying a hypothesized critical threshold k*.",
    evidence: "x^(1/4) grokked after approximately 5,400 steps; x^(1/5) failed within 30,000 steps, according to the supplied résumé.",
    scene: "grokking",
  },
  {
    id: "applied-ai",
    number: "06",
    eyebrow: "RESEARCH + INDUSTRY / MULTI-TRACK",
    title: "Quantum + Applied AI Systems",
    question: "How do research-grade methods move between non-classical systems and deployed AI?",
    mechanism: "PHYSICS-INFORMED LEARNING → LLM SYSTEMS → PRODUCTION PIPELINES",
    implementation: "Quantum research with Qinetic Research Labs and applied AI engineering at Digitwin Technology, including PINN strategies, LoRA/QLoRA fine-tuning, RAG pipelines, and production systems.",
    evidence: "Separate research and industry tracks. Do not present them as one employer or one combined product.",
    scene: "systems",
  },
];

export function ProjectAtlas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setIsReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goTo = useCallback((index: number) => {
    const next = (index + projects.length) % projects.length;
    setActiveIndex(next);
    window.history.replaceState(null, "", `#project-${next + 1}`);
  }, []);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(projects.length - 1);
      }
    };

    const stage = stageRef.current;
    stage?.addEventListener("keydown", onKeyDown);
    return () => stage?.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, previous]);

  const active = projects[activeIndex];

  return (
    <section
      ref={stageRef}
      id="atlas"
      className="atlas"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Featured research projects"
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        if (start == null || end == null) return;
        const distance = end - start;
        if (Math.abs(distance) > 48) distance < 0 ? next() : previous();
        touchStartX.current = null;
      }}
      style={{
        position: 'relative',
        isolation: 'isolate',
        width: 'min(100%, 1440px)',
        marginInline: 'auto',
        padding: 'clamp(1.25rem, 3vw, 3rem)',
        outline: 'none',
      }}
    >
      <div className="atlas__topline" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        color: 'var(--text-muted)',
        font: '600 0.68rem/1 var(--font-mono)',
        letterSpacing: '0.16em',
      }}>
        <span>PROJECT ATLAS</span>
        <span className="atlas__count" aria-live="polite" style={{ fontFamily: 'var(--font-mono)' }}>
          {active.number} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div className="atlas__stage" style={{
        position: 'relative',
        isolation: 'isolate',
        minHeight: '36rem',
        overflow: 'clip',
        border: '1px solid color-mix(in srgb, var(--glass-line) 72%, transparent)',
        borderRadius: '1.2rem',
        background:
          'linear-gradient(115deg, rgba(255,255,255,.07), transparent 23%, transparent 72%, rgba(106,219,224,.045)),' +
          'rgba(22, 25, 30, .64)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,.12),' +
          'inset 0 -1px 0 rgba(0,0,0,.4),' +
          '0 24px 80px rgba(0,0,0,.25)',
        backdropFilter: 'blur(18px) saturate(120%)',
      }}>
        <button
          className="atlas__arrow atlas__arrow--previous"
          onClick={previous}
          aria-label="Previous project"
          style={{
            position: 'absolute',
            zIndex: 5,
            top: '50%',
            display: 'grid',
            width: '3.25rem',
            height: '3.25rem',
            placeItems: 'center',
            border: '1px solid rgba(126,235,232,.38)',
            borderRadius: '999px',
            color: 'var(--text-main)',
            background: 'rgba(18, 26, 31, .82)',
            boxShadow: '0 10px 30px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.13)',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transform: 'translateY(-50%)',
            transition: 'background 180ms ease, border-color 180ms ease, transform 180ms ease',
            left: '.7rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            e.currentTarget.style.background = 'rgba(37, 59, 63, .92)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(126,235,232,.38)';
            e.currentTarget.style.background = 'rgba(18, 26, 31, .82)';
            e.currentTarget.style.transform = 'translateY(-50%)';
          }}
        >
          <span aria-hidden="true">←</span>
        </button>

        <article
          className="atlas__active"
          key={active.id}
          aria-live="polite"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(18rem, .9fr)',
            gap: 'clamp(2rem, 5vw, 6rem)',
            minHeight: '36rem',
            padding: 'clamp(1.4rem, 4vw, 4rem)',
            animation: isReducedMotion ? 'none' : 'atlas-enter 480ms cubic-bezier(.2,.8,.2,1) both',
          }}
        >
          <div className="atlas__copy" style={{ maxWidth: '42rem' }}>
            <p className="eyebrow">{active.eyebrow}</p>
            <h2 style={{
              maxWidth: '14ch',
              margin: '.7rem 0 3rem',
              color: 'var(--text-main)',
              font: '400 clamp(2rem, 4vw, 4.8rem)/.98 var(--font-display)',
              letterSpacing: '-.045em',
            }}>
              {active.title}
            </h2>
            <p className="atlas__label" style={{
              margin: '1.8rem 0 .55rem',
              color: 'var(--accent-copper)',
              font: '600 .62rem/1 var(--font-mono)',
              letterSpacing: '.18em',
            }}>QUESTION</p>
            <p className="atlas__question" style={{
              maxWidth: '42ch',
              color: 'var(--text-soft)',
              font: 'italic 1.05rem/1.65 var(--font-serif)',
            }}>{active.question}</p>
            <p className="atlas__label" style={{
              margin: '1.8rem 0 .55rem',
              color: 'var(--accent-copper)',
              font: '600 .62rem/1 var(--font-mono)',
              letterSpacing: '.18em',
            }}>MECHANISM</p>
            <p className="atlas__mechanism" style={{
              color: 'var(--accent-cyan)',
              font: '600 .76rem/1.6 var(--font-mono)',
              letterSpacing: '.07em',
            }}>{active.mechanism}</p>
            <p className="atlas__label" style={{
              margin: '1.8rem 0 .55rem',
              color: 'var(--accent-copper)',
              font: '600 .62rem/1 var(--font-mono)',
              letterSpacing: '.18em',
            }}>IMPLEMENTATION</p>
            <p style={{ color: 'var(--text-soft)', lineHeight: 1.7 }}>{active.implementation}</p>
            <p className="atlas__label" style={{
              margin: '1.8rem 0 .55rem',
              color: 'var(--accent-copper)',
              font: '600 .62rem/1 var(--font-mono)',
              letterSpacing: '.18em',
            }}>EVIDENCE</p>
            <p style={{ color: 'var(--text-soft)', lineHeight: 1.7 }}>{active.evidence}</p>
          </div>
          <div className="atlas__visual" aria-label={`${active.title} animated system visualization`} style={{
            alignSelf: 'start',
            minWidth: 0,
            marginTop: '2rem',
            border: '1px solid rgba(118, 232, 229, .22)',
            borderRadius: '.85rem',
            background: 'rgba(6, 9, 12, .68)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.09), 0 16px 50px rgba(0,0,0,.28)',
          }}>
            <AsciiInstrument scene={active.scene} reducedMotion={isReducedMotion} />
          </div>
        </article>

        <button
          className="atlas__arrow atlas__arrow--next"
          onClick={next}
          aria-label="Next project"
          style={{
            position: 'absolute',
            zIndex: 5,
            top: '50%',
            display: 'grid',
            width: '3.25rem',
            height: '3.25rem',
            placeItems: 'center',
            border: '1px solid rgba(126,235,232,.38)',
            borderRadius: '999px',
            color: 'var(--text-main)',
            background: 'rgba(18, 26, 31, .82)',
            boxShadow: '0 10px 30px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.13)',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transform: 'translateY(-50%)',
            transition: 'background 180ms ease, border-color 180ms ease, transform 180ms ease',
            right: '.7rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            e.currentTarget.style.background = 'rgba(37, 59, 63, .92)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(126,235,232,.38)';
            e.currentTarget.style.background = 'rgba(18, 26, 31, .82)';
            e.currentTarget.style.transform = 'translateY(-50%)';
          }}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="atlas__pagination" role="tablist" aria-label="Select project" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '.4rem',
        marginTop: '1.25rem',
      }}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Open project ${index + 1}: ${project.title}`}
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => goTo(index)}
            style={{
              width: '2.5rem',
              padding: '.55rem .3rem',
              border: index === activeIndex ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,.14)',
              borderRadius: '.35rem',
              color: index === activeIndex ? 'var(--accent-cyan)' : 'var(--text-muted)',
              background: index === activeIndex ? 'rgba(73,218,220,.08)' : 'transparent',
              font: '.62rem var(--font-mono)',
              cursor: 'pointer',
            }}
          >
            <span aria-hidden="true">{project.number}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes atlas-enter {
          from { opacity: 0; transform: translate3d(18px, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @media (max-width: 800px) {
          .atlas__stage { min-height: auto; }
          .atlas__active { grid-template-columns: 1fr; min-height: auto; padding: 1.4rem 3.8rem; }
          .atlas__visual { margin-top: 0; }
          .atlas__copy h2 { margin-bottom: 2rem; }
        }

        @media (max-width: 500px) {
          .atlas { padding-inline: .8rem; }
          .atlas__active { padding-inline: 2.9rem; }
          .atlas__arrow { width: 2.5rem; height: 2.5rem; }
          .atlas__arrow--previous { left: .35rem; }
          .atlas__arrow--next { right: .35rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas__active { animation: none; }
          .atlas__arrow { transition: none; }
        }
      `}</style>
    </section>
  )
}