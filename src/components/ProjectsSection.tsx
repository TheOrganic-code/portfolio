const projects = [
  {
    title: 'Accelerated muon-site detection for μSR experiments',
    domain: 'Computational Materials Science — QM Lab, RGIPT',
    desc: 'Primary research project at the Quantum Materials Lab under Dr. Tathamay Basu, with collaborators Mr. Sayan Ghosh (PhD Scholar), Mr. Gourab Roy, and Ms. Ekta Kushwaha (PhD Scholar). Developing an accelerated computational framework for muon-site detection that replaces expensive traditional workflows using modern optimization, scientific computing, crystallographic symmetry, and physics-guided algorithms. Integrates Pymatgen, NumPy, SciPy, PyTorch, crystallographic tools, and differentiable optimization techniques with physically meaningful constraints rather than framing the problem purely as machine learning.',
    tags: ['PyTorch', 'Pymatgen', 'NumPy', 'SciPy', 'μSR', 'Differentiable optimization', 'Crystallography', 'Scientific computing'],
    featured: true,
  },
  {
    title: 'p-bit simulator',
    domain: 'Probabilistic Computing',
    desc: 'Probabilistic-bit simulator built in PyTorch modeling stochastic Ising spins, Boltzmann machines, and thermal noise with asynchronous updates and energy minimization. Applied to MAX-CUT optimization problems. Evolving into a reusable research library supporting hybrid deterministic-stochastic computing architectures.',
    tags: ['PyTorch', 'Stochastic systems', 'Ising models', 'Boltzmann machines', 'MAX-CUT', 'Simulated annealing'],
    featured: false,
  },
  {
    title: 'NeuraRust',
    domain: 'High-Performance ML Systems — Systems Programming',
    desc: 'Neural network framework built entirely from scratch in Rust without depending on existing machine learning frameworks. Implements tensors, automatic differentiation, computational graphs, neural network layers, optimization algorithms, and efficient numerical computation. Leverages Rust\'s ownership model, memory safety, and zero-cost abstractions.',
    tags: ['Rust', 'Autograd', 'Computational graphs', 'Tensors', 'Systems programming', 'Zero-cost abstractions'],
    featured: false,
  },
]

export function ProjectsSection() {
  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {projects.map((p) => (
          <div
            key={p.title}
            className="project-card"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${p.featured ? '#7b68ee' : 'rgba(255,255,255,0.1)'}`,
              background2: p.featured ? 'rgba(123,104,238,.04)' : undefined,
              borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column',
              gridColumn: p.featured ? '1 / -1' : undefined,
              ...(p.featured ? { background: 'rgba(123,104,238,.04)' } : {}),
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,216,255,0.3)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = p.featured ? '#7b68ee' : 'rgba(255,255,255,0.1)'
            }}
          >
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
              {p.title}
            </h3>
            <div style={{
              fontSize: 12, color: '#7b68ee', textTransform: 'uppercase',
              letterSpacing: 1, marginBottom: 12, fontWeight: 500,
            }}>
              {p.domain}
            </div>
            <p style={{ fontSize: 14, color: 'rgba(240,239,248,0.55)', lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
              {p.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.tags.map((t) => (
                <span key={t} style={{
                  fontSize: 11, color: 'rgba(240,239,248,0.55)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20,
                  padding: '3px 12px', whiteSpace: 'nowrap',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
