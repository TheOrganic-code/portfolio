import { useState, useRef, useEffect, useCallback } from 'react'
import { ProjectStateField, SystemGraph } from './AsciiScenes'

interface ProjectSlideData {
  index: number
  category: string
  title: string
  question: string
  built: string
  methods: string[]
  status: string
  visual: 'lattice' | 'pbit-stable' | 'pbit-stochastic' | 'graph' | 'quantum'
  links: { label: string; href: string }[]
}

const projects: ProjectSlideData[] = [
  {
    index: 1,
    category: 'COMPUTATIONAL CONDENSED MATTER',
    title: 'Accelerated Muon-Site Detection for μSR',
    question: 'How can muon-site detection be accelerated using physics-guided optimization and crystallographic symmetry?',
    built: 'Developed a computational framework that replaces expensive traditional μSR workflows by combining Pymatgen for crystal structure handling, NumPy/SciPy for numerical optimization, and PyTorch for differentiable optimization with physically meaningful constraints. The system leverages crystallographic symmetry operations to reduce the candidate search space and uses gradient-based optimization to identify energetically favorable muon stopping sites in complex oxide lattices.',
    methods: ['Pymatgen', 'NumPy', 'SciPy', 'PyTorch', 'Differentiable Optimization', 'Crystallographic Symmetry', 'μSR Physics'],
    status: 'Active research · Quantum Materials Lab, RGIPT · Under Dr. Tathamay Basu',
    visual: 'lattice',
    links: [
      { label: 'View Repository', href: 'https://github.com/TheOrganic-code/muon-site-detection' },
      { label: 'Read Publication', href: '#' },
    ],
  },
  {
    index: 2,
    category: 'PROBABILISTIC COMPUTING',
    title: 'p-bit Simulator',
    question: 'How can stochastic computing primitives model Ising systems, Boltzmann machines, and MAX-CUT optimization?',
    built: 'Built a probabilistic-bit simulator in PyTorch modeling stochastic Ising spins with thermal noise, asynchronous updates, and energy minimization dynamics. The simulator implements Boltzmann machine sampling and applies it to MAX-CUT optimization problems. Designed as a reusable research library supporting hybrid deterministic-stochastic computing architectures with configurable temperature schedules and update rules.',
    methods: ['PyTorch', 'Stochastic Ising Models', 'Boltzmann Machines', 'Asynchronous Dynamics', 'Simulated Annealing', 'MAX-CUT Optimization', 'Energy-Based Models'],
    status: 'Active development · Evolving into reusable research library',
    visual: 'pbit-stochastic',
    links: [
      { label: 'View Repository', href: 'https://github.com/TheOrganic-code/pbit-simulator' },
    ],
  },
  {
    index: 3,
    category: 'HIGH-PERFORMANCE ML SYSTEMS',
    title: 'NeuraRust',
    question: 'What becomes visible when a neural-network framework is implemented from the tensor level upward?',
    built: 'Implemented a neural network framework entirely from scratch in Rust without depending on existing ML libraries. The system includes a tensor abstraction with automatic differentiation, dynamic computational graphs, neural network layers (Linear, Conv2d, Activation), optimization algorithms (SGD, Adam), and efficient numerical computation. Leverages Rust\'s ownership model, memory safety guarantees, and zero-cost abstractions for performant, correct-by-construction ML infrastructure.',
    methods: ['Rust', 'Automatic Differentiation', 'Computational Graphs', 'Tensor Operations', 'Memory Safety', 'Zero-Cost Abstractions', 'Systems Programming'],
    status: 'Active development · Core framework operational',
    visual: 'graph',
    links: [
      { label: 'View Repository', href: 'https://github.com/TheOrganic-code/neurarust' },
    ],
  },
  {
    index: 4,
    category: 'QUANTUM & APPLIED AI SYSTEMS',
    title: 'Quantum Information & Applied AI Engineering',
    question: 'How do quantum information protocols and production AI systems intersect in real-world deployment?',
    built: 'Research at Qinetic Research Lab on quantum computing algorithms, quantum networking protocols, and physics-informed neural networks (PINNs) for quantum systems. In parallel, engineering production AI systems at DigiTwin Technology: fine-tuning LLMs, building RAG pipelines, data engineering for training/inference, and deploying scalable AI applications. Both tracks emphasize rigorous evaluation, reproducibility, and bridging research prototypes to deployed systems.',
    methods: ['Quantum Computing', 'Quantum Networking', 'PINNs', 'LLM Fine-tuning', 'RAG Systems', 'Data Engineering', 'Production Deployment', 'MLOps'],
    status: 'Ongoing research · Qinetic Research Lab & DigiTwin Technology',
    visual: 'quantum',
    links: [
      { label: 'Quantum Research', href: '#' },
      { label: 'AI Engineering', href: '#' },
    ],
  },
]

function LatticeVisual() {
  const [frame, setFrame] = useState<string>('')
  const timeRef = useRef(0)
  const animRef = useRef<number>()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setFrame(generateLatticeFrame(0))
      return
    }
    const targetFps = 12
    const frameMs = 1000 / targetFps
    let lastTime = 0
    const animate = (now: number) => {
      animRef.current = requestAnimationFrame(animate)
      if (now - lastTime < frameMs) return
      lastTime = now
      timeRef.current += 0.04
      setFrame(generateLatticeFrame(timeRef.current))
    }
    animate(0)
    return () => cancelAnimationFrame(animRef.current!)
  }, [reduced])

  return <pre className="ascii-scene ascii-scene--project" aria-label="Animated crystal lattice with candidate muon sites">{frame}</pre>
}

function generateLatticeFrame(t: number) {
  const w = 48, h = 16
  const CHARS = ' .:\'`^"-~=+*#%@'
  let out = ''
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = (x - w/2) / (w/2)
      const ny = (y - h/2) / (h/2)
      let v = 0
      v += Math.sin(nx * 4 + t) * Math.sin(ny * 4 + t) * 0.4
      v += Math.sin(nx * 8 - t * 1.5) * 0.2
      v += Math.sin(ny * 6 + t * 1.2) * 0.2
      const cx = Math.round(w/2 + Math.cos(t * 0.7) * 6)
      const cy = Math.round(h/2 + Math.sin(t * 0.7) * 3)
      const d = Math.sqrt((x - cx)**2 + (y - cy)**2)
      if (d < 2.5) v = 1
      v = Math.max(0, Math.min(1, v + 0.5))
      out += CHARS[Math.floor(v * (CHARS.length - 1))]
    }
    out += '\n'
  }
  return out.trimEnd()
}

function QuantumVisual() {
  const [frame, setFrame] = useState<string>('')
  const timeRef = useRef(0)
  const animRef = useRef<number>()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setFrame(generateQuantumFrame(0))
      return
    }
    const targetFps = 12
    const frameMs = 1000 / targetFps
    let lastTime = 0
    const animate = (now: number) => {
      animRef.current = requestAnimationFrame(animate)
      if (now - lastTime < frameMs) return
      lastTime = now
      timeRef.current += 0.05
      setFrame(generateQuantumFrame(timeRef.current))
    }
    animate(0)
    return () => cancelAnimationFrame(animRef.current!)
  }, [reduced])

  return <pre className="ascii-scene ascii-scene--project" aria-label="Quantum state evolution and entanglement visualization">{frame}</pre>
}

function generateQuantumFrame(t: number) {
  const w = 48, h = 16
  const CHARS = ' .:\'`^"-~=+*#%@'
  let out = ''
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = (x - w/2) / (w/2)
      const ny = (y - h/2) / (h/2)
      let v = 0
      v += Math.sin(nx * 6 + t * 2) * Math.cos(ny * 6 - t * 1.5) * 0.3
      v += Math.sin((nx*nx + ny*ny) * 10 - t * 3) * 0.4
      const r = Math.sqrt(nx*nx + ny*ny)
      v += Math.sin(r * 15 - t * 4) / (1 + r * 3) * 0.5
      v = Math.max(0, Math.min(1, v + 0.5))
      out += CHARS[Math.floor(v * (CHARS.length - 1))]
    }
    out += '\n'
  }
  return out.trimEnd()
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sliderRef.current) observer.observe(sliderRef.current)
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrentIndex((prev) => {
      const next = (index + projects.length) % projects.length
      return next
    })
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(currentIndex - 1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex + 1) }
  }, [currentIndex, goTo])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const dx = e.changedTouches[0].clientX - touchStart
    if (Math.abs(dx) > 40) {
      goTo(currentIndex + (dx > 0 ? -1 : 1))
    }
    setTouchStart(null)
  }

  const currentProject = projects[currentIndex]

  const renderVisual = () => {
    switch (currentProject.visual) {
      case 'lattice': return <LatticeVisual />
      case 'pbit-stable': return <ProjectStateField width={50} height={14} mode="stable" />
      case 'pbit-stochastic': return <ProjectStateField width={50} height={14} mode="stochastic" />
      case 'graph': return <SystemGraph width={55} height={16} />
      case 'quantum': return <QuantumVisual />
      default: return null
    }
  }

  return (
    <section
      ref={sliderRef}
      id="work"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 120px', padding: '0 32px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-labelledby="work-title"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <span className="section-index">03 / 06</span>
          <h2 id="work-title" style={{ marginTop: 8 }}>Featured Work</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: 10, height: 10, borderRadius: '50%',
                border: `2px solid ${i === currentIndex ? '#4ecdc4' : 'rgba(155,154,148,0.3)'}`,
                background: i === currentIndex ? '#4ecdc4' : 'transparent',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              aria-label={`Go to project ${i + 1}`}
              aria-current={i === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex', transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        role="region"
        aria-label="Project slides"
        aria-roledescription="slide"
      >
        {projects.map((project) => (
          <article
            key={project.index}
            className="panel"
            style={{
              width: '100%', minWidth: '100%', boxSizing: 'border-box',
              padding: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
              alignItems: 'start',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="meta-label">
                  {String(project.index).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <span className="category-tag">{project.category}</span>
                <h3 style={{ fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.15 }}>
                  {project.title}
                </h3>
              </div>

              <div style={{ borderTop: '1px solid rgba(155,154,148,0.15)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <span className="meta-label">Research Question</span>
                  <p style={{ marginTop: 8, fontSize: 15, color: '#9b9a94', lineHeight: 1.7, fontStyle: 'italic' }}>
                    {project.question}
                  </p>
                </div>

                <div>
                  <span className="meta-label">What I Built</span>
                  <p style={{ marginTop: 8, fontSize: 14, color: '#f2eee7', lineHeight: 1.7 }}>
                    {project.built}
                  </p>
                </div>

                <div>
                  <span className="meta-label">Methods & Tools</span>
                  <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {project.methods.map((m) => (
                      <span key={m} style={{
                        fontFamily: 'var(--mono)', fontSize: 11, color: '#9b9a94',
                        background: 'rgba(155,154,148,0.08)', border: '1px solid rgba(155,154,148,0.15)',
                        borderRadius: 4, padding: '4px 10px',
                      }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: 8 }}>
                  <span className="meta-label">Status</span>
                  <p style={{ marginTop: 8, fontSize: 13, color: '#6b6a65', lineHeight: 1.6 }}>
                    {project.status}
                  </p>
                </div>

                {project.links.length > 0 && (
                  <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingTop: 16, borderTop: '1px solid rgba(155,154,148,0.15)' }}>
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener' : undefined}
                        className="btn-secondary"
                        style={{ padding: '10px 20px', fontSize: 12 }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
              <div style={{
                width: '100%', maxWidth: 480, background: '#0d0d0d', border: '1px solid rgba(155,154,148,0.15)',
                borderRadius: 8, padding: 20, fontFamily: 'var(--mono)', fontSize: 10, lineHeight: 1.2,
                color: '#9b9a94', overflow: 'auto',
              }}>
                {renderVisual()}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)',
        display: 'flex', justifyContent: 'space-between', padding: '0 16px', pointerEvents: 'none',
      }}>
        <button
          onClick={() => goTo(currentIndex - 1)}
          style={{
            pointerEvents: 'auto', width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(22,22,22,0.9)', border: '1px solid rgba(155,154,148,0.2)',
            color: '#f2eee7', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(10px)', opacity: 0.8,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = '#4ecdc4' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.borderColor = 'rgba(155,154,148,0.2)' }}
          aria-label="Previous project"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          onClick={() => goTo(currentIndex + 1)}
          style={{
            pointerEvents: 'auto', width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(22,22,22,0.9)', border: '1px solid rgba(155,154,148,0.2)',
            color: '#f2eee7', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(10px)', opacity: 0.8,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = '#4ecdc4' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.borderColor = 'rgba(155,154,148,0.2)' }}
          aria-label="Next project"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          article { grid-template-columns: 1fr; gap: 32; }
          div[style*="minHeight: 320"] { min-height: 200; }
        }
        @media (max-width: 600px) {
          article { padding: 24; }
          .meta-label { font-size: 10px; }
        }
      `}</style>
    </section>
  )
}