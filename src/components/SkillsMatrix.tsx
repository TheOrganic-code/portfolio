import { useRef, useEffect, useState } from 'react'

const skillCategories = [
  {
    category: 'Languages',
    items: [
      { name: 'Python', projects: ['μSR Detection', 'p-bit Simulator', 'AI Engineering'] },
      { name: 'Rust', projects: ['NeuraRust'] },
      { name: 'C / C++', projects: ['Systems Programming', 'HPC'] },
      { name: 'MATLAB', projects: ['Computational Physics'] },
    ],
  },
  {
    category: 'AI & Scientific Computing',
    items: [
      { name: 'PyTorch', projects: ['μSR Detection', 'p-bit Simulator', 'PINNs', 'LLM Fine-tuning'] },
      { name: 'NumPy / SciPy', projects: ['μSR Detection', 'Computational Physics'] },
      { name: 'Pymatgen', projects: ['μSR Detection', 'Crystallography'] },
      { name: 'JAX', projects: ['Differentiable Physics'] },
      { name: 'RAG / LLM Fine-tuning', projects: ['AI Engineering', 'Production Systems'] },
      { name: 'Scientific Visualization', projects: ['μSR', 'Quantum Systems'] },
    ],
  },
  {
    category: 'Systems & Tooling',
    items: [
      { name: 'Linux / WSL', projects: ['All Projects'] },
      { name: 'Git / GitHub', projects: ['All Projects'] },
      { name: 'Docker', projects: ['AI Engineering', 'Deployment'] },
      { name: 'Data Engineering', projects: ['AI Engineering', 'RAG Pipelines'] },
      { name: 'LaTeX', projects: ['Publications', 'Documentation'] },
      { name: 'VS Code / Neovim', projects: ['Daily Driver'] },
    ],
  },
  {
    category: 'Research Methods',
    items: [
      { name: 'Differentiable Optimization', projects: ['μSR Detection'] },
      { name: 'Crystallographic Symmetry', projects: ['μSR Detection'] },
      { name: 'Stochastic Ising Models', projects: ['p-bit Simulator'] },
      { name: 'Boltzmann Sampling', projects: ['p-bit Simulator'] },
      { name: 'Automatic Differentiation', projects: ['NeuraRust', 'PINNs'] },
      { name: 'Computational Graphs', projects: ['NeuraRust'] },
      { name: 'Physics-Informed NNs', projects: ['Quantum Research'] },
      { name: 'Quantum Algorithms', projects: ['Quantum Research'] },
      { name: 'Simulated Annealing', projects: ['p-bit Simulator', 'Optimization'] },
    ],
  },
]

export function SkillsMatrix() {
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

  return (
    <section
      ref={containerRef}
      id="skills"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 120px', padding: '0 32px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-labelledby="skills-title"
    >
      <div style={{ marginBottom: 40 }}>
        <span className="section-index">06 / 06</span>
        <h2 id="skills-title" style={{ marginTop: 8 }}>Skills Matrix</h2>
        <p style={{ marginTop: 12, color: '#9b9a94', maxWidth: 600, fontSize: 16 }}>
          Organized by domain with project associations. Not a keyword list — a map of where each tool has been applied.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {skillCategories.map((cat, catIndex) => (
          <div key={cat.category} className="panel" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 18, fontWeight: 500 }}>{cat.category}</h3>
              <span className="meta-label">{cat.items.length} areas</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cat.items.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr auto', gap: 16,
                    alignItems: 'start', padding: '12px 0',
                    borderTop: skillIndex > 0 ? '1px solid rgba(155,154,148,0.1)' : 'none',
                    paddingTop: skillIndex > 0 ? 16 : 0,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${(catIndex * 4 + skillIndex) * 50}ms`,
                  }}
                >
                  <div>
                    <div style={{
                      fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500,
                      color: '#f2eee7', marginBottom: 4,
                    }}>
                      {skill.name}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {skill.projects.map((proj) => (
                        <span
                          key={proj}
                          style={{
                            fontFamily: 'var(--mono)', fontSize: 10, color: '#6b6a65',
                            background: 'rgba(155,154,148,0.08)', border: '1px solid rgba(155,154,148,0.15)',
                            borderRadius: 3, padding: '2px 8px',
                          }}
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4ecdc4, #b87333)',
                    marginTop: 4, flexShrink: 0,
                  }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}