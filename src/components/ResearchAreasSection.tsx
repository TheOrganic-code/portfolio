const areas = [
  {
    title: 'Scientific machine learning',
    body: 'Physics-informed neural networks, differentiable programming, and computational methods that bridge machine learning with physical sciences. Developing original algorithms rather than applying models as black boxes.',
  },
  {
    title: 'Computational condensed matter',
    body: 'Accelerated muon-site detection for μSR experiments. Replacing expensive traditional workflows with modern optimization, crystallographic symmetry, and physics-guided computational frameworks.',
  },
  {
    title: 'Quantum information',
    body: 'Research at Qinetic Research Lab on quantum computing, quantum networking, and physics-informed computation for next-generation quantum technologies.',
  },
  {
    title: 'High-performance ML systems',
    body: 'Building neural network frameworks from scratch in Rust — tensors, automatic differentiation, computational graphs. Understanding systems under the hood while building performant alternatives.',
  },
  {
    title: 'Probabilistic computing',
    body: 'Stochastic Ising systems, Boltzmann machines, p-bit simulation, asynchronous dynamics, and energy-based optimization as a reusable research library.',
  },
  {
    title: 'Applied industrial AI',
    body: 'Fine-tuning LLMs, building RAG systems, data engineering pipelines, and deploying production-ready AI applications that bridge research with practical deployment.',
  },
]

export function ResearchAreasSection() {
  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {areas.map((a) => (
          <div
            key={a.title}
            className="research-card"
            style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: 24, cursor: 'default',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,216,255,0.3)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          >
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
              {a.title}
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(240,239,248,0.55)', lineHeight: 1.6 }}>
              {a.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
