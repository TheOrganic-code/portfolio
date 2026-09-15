import { useState, useRef, useEffect } from 'react'
import { ProjectStateField } from './AsciiScenes'

const disciplines = [
  {
    id: 'sci-ml',
    title: 'Scientific Machine Learning',
    tag: 'PINNs · Differentiable Physics · Inverse Problems',
    description: 'Physics-informed neural networks, differentiable programming, and computational methods that bridge machine learning with physical sciences. Developing original algorithms rather than applying models as black boxes.',
    scene: null,
  },
  {
    id: 'cond-matter',
    title: 'Computational Condensed Matter',
    tag: 'μSR · Crystallography · Differentiable Optimization',
    description: 'Accelerated muon-site detection for μSR experiments. Replacing expensive traditional workflows with modern optimization, crystallographic symmetry, and physics-guided computational frameworks.',
    scene: 'lattice',
  },
  {
    id: 'quantum-info',
    title: 'Quantum Information',
    tag: 'Quantum Computing · Quantum Networking · PINNs',
    description: 'Research on quantum computing, quantum networking, and physics-informed computation for next-generation quantum technologies.',
    scene: null,
  },
  {
    id: 'hp-systems',
    title: 'High-Performance ML Systems',
    tag: 'Rust · Autograd · Computational Graphs · Tensors',
    description: 'Building neural network frameworks from scratch in Rust — tensors, automatic differentiation, computational graphs. Understanding systems under the hood while building performant alternatives.',
    scene: 'graph',
  },
  {
    id: 'prob-computing',
    title: 'Probabilistic Computing',
    tag: 'p-bit · Ising · Boltzmann · MAX-CUT · Annealing',
    description: 'Stochastic Ising systems, Boltzmann machines, p-bit simulation, asynchronous dynamics, and energy-based optimization as a reusable research library.',
    scene: 'pbit',
  },
  {
    id: 'applied-ai',
    title: 'Applied Industrial AI',
    tag: 'LLM Fine-tuning · RAG · Data Engineering · Production',
    description: 'Fine-tuning large language models, building Retrieval-Augmented Generation systems, data engineering pipelines, and deploying production-ready AI applications.',
    scene: null,
  },
]

export function ResearchMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const getScene = (id: string | null) => {
    if (!id) return null
    const d = disciplines.find(x => x.id === id)
    return d?.scene
  }

  return (
    <section
      ref={containerRef}
      id="research-map"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 120px', padding: '0 32px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-labelledby="research-map-title"
    >
      <div style={{ marginBottom: 40 }}>
        <span className="section-index">02 / 06</span>
        <h2 id="research-map-title" style={{ marginTop: 8 }}>Research Map</h2>
        <p style={{ marginTop: 12, color: '#9b9a94', maxWidth: 600, fontSize: 16 }}>
          Six interconnected disciplines. Each combines theoretical depth with implementation rigor.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {disciplines.map((d) => {
          const isHovered = hoveredId === d.id || focusedId === d.id
          const sceneType = getScene(d.id)

          return (
            <article
              key={d.id}
              className="panel panel-highlight"
              style={{
                padding: 28, display: 'flex', flexDirection: 'column', gap: 16,
                minHeight: 280,
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                transform: isHovered ? 'translateY(-4px)' : 'none',
                boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.3), 0 0 60px rgba(78,205,196,0.08)' : 'none',
              }}
              onMouseEnter={() => setHoveredId(d.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setFocusedId(d.id)}
              onBlur={() => setFocusedId(null)}
              tabIndex={0}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="category-tag">{d.tag}</span>
                <h3 style={{ fontSize: 20, fontWeight: 600 }}>{d.title}</h3>
                <p style={{ fontSize: 14, color: '#9b9a94', lineHeight: 1.7, flex: 1 }}>
                  {d.description}
                </p>
              </div>

              {sceneType && isHovered && (
                <div style={{
                  marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(155,154,148,0.15)',
                  opacity: 1, transition: 'opacity 0.3s ease',
                }}>
                  {sceneType === 'lattice' && (
                    <ProjectStateField width={40} height={12} mode="stable" />
                  )}
                  {sceneType === 'pbit' && (
                    <ProjectStateField width={40} height={12} mode="stochastic" />
                  )}
                  {sceneType === 'graph' && (
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, lineHeight: 1.2, color: '#6b6a65' }}>
                      Tensor ──┬── Autograd ── Graph ── Layers
                               │
                               └── Optim
                    </div>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          article { min-height: auto; }
        }
      `}</style>
    </section>
  )
}