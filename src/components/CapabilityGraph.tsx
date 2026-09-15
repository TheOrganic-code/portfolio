import { useRef, useEffect, useState } from 'react'

const layers = [
  {
    id: 'mathematics',
    label: 'MATHEMATICS',
    description: 'Theoretical foundation for modeling physical and computational systems.',
    color: 'var(--accent-cyan)',
    skills: [
      { name: 'Real Analysis', projects: ['Grokking', 'MEOWN'] },
      { name: 'Differential Equations', projects: ['MEOWN', 'p-bit', 'PINNs'] },
      { name: 'Number Theory', projects: ['Grokking'] },
      { name: 'Optimization Theory', projects: ['MEOWN', 'NeuraRust', 'p-bit'] },
      { name: 'Information Geometry', projects: ['Grokking', 'NeuraRust'] },
      { name: 'Linear Algebra / Numerical Methods', projects: ['All Projects'] },
    ],
  },
  {
    id: 'models',
    label: 'MODELS',
    description: 'Architectures and learning paradigms for scientific and applied AI.',
    color: 'var(--accent-cyan)',
    skills: [
      { name: 'PyTorch', projects: ['MEOWN', 'p-bit', 'SatFetch', 'Grokking', 'Applied AI'] },
      { name: 'Physics-Informed NNs (PINNs/PhyCNNs)', projects: ['MEOWN', 'Qinetic'] },
      { name: 'Energy-Based Models / Boltzmann', projects: ['p-bit'] },
      { name: 'CLIP / Cross-Modal Retrieval', projects: ['SatFetch'] },
      { name: 'LoRA / QLoRA Fine-tuning', projects: ['Applied AI', 'Digitwin'] },
      { name: 'CNNs / Transformers', projects: ['MEOWN', 'SatFetch', 'Grokking'] },
    ],
  },
  {
    id: 'systems',
    label: 'SYSTEMS',
    description: 'Low-level implementation, memory management, and compute infrastructure.',
    color: 'var(--accent-copper)',
    skills: [
      { name: 'Rust (ownership, zero-cost abstractions)', projects: ['NeuraRust'] },
      { name: 'C++ / Systems Programming', projects: ['NeuraRust', 'HPC'] },
      { name: 'Tensor Operations & Autodiff', projects: ['NeuraRust', 'MEOWN'] },
      { name: 'Computational Graphs', projects: ['NeuraRust'] },
      { name: 'Linux / Git / Tooling', projects: ['All Projects'] },
      { name: 'CUDA / Kernel Optimization (learning)', projects: ['NeuraRust', 'Applied AI'] },
    ],
  },
  {
    id: 'deployment',
    label: 'DEPLOYMENT',
    description: 'Inference optimization, serving, and production hardening.',
    color: 'var(--accent-copper)',
    skills: [
      { name: 'KV Cache / FlashAttention', projects: ['Applied AI', 'Digitwin'] },
      { name: 'Speculative Decoding', projects: ['Applied AI'] },
      { name: 'Quantization (GPTQ / AWQ)', projects: ['Applied AI'] },
      { name: 'vLLM / torch.compile', projects: ['Applied AI'] },
      { name: 'RAG Pipelines / FAISS', projects: ['SatFetch', 'Applied AI'] },
      { name: 'MLOps / Observability', projects: ['Applied AI', 'ICCFGC'] },
    ],
  },
  {
    id: 'scientific-data',
    label: 'SCIENTIFIC & SPATIAL DATA',
    description: 'Tools for physical datasets, crystallography, and geospatial intelligence.',
    color: 'var(--text-muted)',
    skills: [
      { name: 'NumPy / SciPy / Pandas', projects: ['MEOWN', 'p-bit', 'Grokking', 'ICCFGC'] },
      { name: 'Pymatgen / Crystallography', projects: ['MEOWN'] },
      { name: 'FAISS / Vector Search', projects: ['SatFetch', 'Applied AI'] },
      { name: 'Uber H3 / Spatial Indexing', projects: ['SatFetch', 'ICCFGC'] },
      { name: 'Matplotlib / Seaborn / Visualization', projects: ['MEOWN', 'Grokking', 'ICCFGC'] },
      { name: 'MATLAB', projects: ['Computational Physics'] },
    ],
  },
]

export function CapabilityGraph() {
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
      id="capabilities"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto 120px', padding: '0 32px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-labelledby="capabilities-title"
    >
      <div style={{ marginBottom: 40 }}>
        <span className="section-index">06 / 06</span>
        <h2 id="capabilities-title" style={{ marginTop: 8 }}>Capability Graph</h2>
        <p style={{ marginTop: 12, color: 'var(--text-muted)', maxWidth: 600, fontSize: 16 }}>
          Five connected layers from mathematical foundation to production deployment. Each capability shows where it has been applied.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {layers.map((layer, layerIndex) => (
          <div
            key={layer.id}
            className="motion-core-panel"
            style={{
              padding: 28, display: 'flex', flexDirection: 'column', gap: 20,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-20px)',
              transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${layerIndex * 100}ms`,
              borderLeft: `3px solid ${layer.color}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: layer.color, boxShadow: `0 0 12px ${layer.color}`,
                }} />
                <h3 style={{ fontSize: 18, fontWeight: 500 }}>{layer.label}</h3>
              </div>
              <span className="meta-label">{layer.skills.length} capabilities</span>
            </div>

            <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.7, marginTop: -8 }}>
              {layer.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {layer.skills.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr auto', gap: 16,
                    alignItems: 'start', padding: '12px 0',
                    borderTop: skillIndex > 0 ? '1px solid rgba(141,168,168,0.1)' : 'none',
                    paddingTop: skillIndex > 0 ? 16 : 0,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${(layerIndex * 6 + skillIndex) * 40}ms`,
                  }}
                >
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
                      color: 'var(--text-main)', marginBottom: 4,
                    }}>
                      {skill.name}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {skill.projects.map((proj) => (
                        <span
                          key={proj}
                          style={{
                            fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
                            background: 'rgba(141,168,168,0.08)', border: '1px solid rgba(141,168,168,0.15)',
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
                    background: layer.color, flexShrink: 0, marginTop: 4,
                  }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr; gap: 8; }
        }
      `}</style>
    </section>
  )
}