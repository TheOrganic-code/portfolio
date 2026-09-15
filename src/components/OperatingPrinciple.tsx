import { useRef, useEffect, useState } from 'react'

const stages = [
  {
    id: 'idea',
    label: 'MATHEMATICAL IDEA',
    description: 'Differential equations, optimization theory, information geometry, and the mathematical structure of physical systems.',
    projects: ['MEOWN', 'Grokking'],
    color: 'var(--accent-cyan)',
  },
  {
    id: 'model',
    label: 'NEURAL MODEL',
    description: 'Physics-informed architectures, energy-based models, PINNs, PhyCNNs, and differentiable simulation.',
    projects: ['MEOWN', 'p-bit', 'Grokking'],
    color: 'var(--accent-cyan)',
  },
  {
    id: 'system',
    label: 'SYSTEM IMPLEMENTATION',
    description: 'Tensor operations, automatic differentiation, computational graphs, Rust memory safety, zero-cost abstractions.',
    projects: ['NeuraRust', 'p-bit'],
    color: 'var(--accent-copper)',
  },
  {
    id: 'gpu',
    label: 'GPU OPTIMIZATION',
    description: 'KV cache, FlashAttention, speculative decoding, quantization (GPTQ/AWQ), torch.compile, vLLM, kernel fusion.',
    projects: ['NeuraRust', 'Applied AI'],
    color: 'var(--accent-copper)',
  },
  {
    id: 'deploy',
    label: 'DEPLOY / BREAK / REPEAT',
    description: 'RAG pipelines, LoRA/QLoRA fine-tuning, production inference, observability, iterative improvement.',
    projects: ['SatFetch', 'Applied AI', 'ICCFGC'],
    color: 'var(--accent-lilac)',
  },
]

export function OperatingPrinciple() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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
      id="principle"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto 120px', padding: '0 32px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-labelledby="principle-title"
    >
      <div style={{ marginBottom: 48, textAlign: 'center' }}>
        <span className="section-index">02 / 06</span>
        <h2 id="principle-title" style={{ marginTop: 8 }}>The Operating Principle</h2>
        <p style={{ marginTop: 12, color: 'var(--text-muted)', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', fontSize: 16 }}>
          Every project follows this chain. Click a stage to see connected work.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            style={{
              display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32,
              alignItems: 'center', padding: '24px 0',
              borderBottom: index < stages.length - 1 ? '1px solid rgba(141,168,168,0.1)' : 'none',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-30px)',
              transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 120}ms`,
            }}
            onMouseEnter={() => setHoveredId(stage.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              style={{
                textAlign: 'right', paddingRight: 24, position: 'relative',
                cursor: 'pointer', userSelect: 'none',
              }}
              onClick={() => {
                const target = document.getElementById(`project-${stage.projects[0]?.toLowerCase()}`)
                target?.scrollIntoView({ behavior: 'smooth' })
              }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.currentTarget.click() } }}
              tabIndex={0}
              role="button"
              aria-label={`View projects for ${stage.label}`}
            >
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
                letterSpacing: 2, color: stage.color, fontWeight: 600,
                transition: 'color 0.2s ease',
              }}>
                {stage.label}
              </div>
              {index < stages.length - 1 && (
                <div style={{
                  position: 'absolute', right: -16, top: 28, bottom: -28,
                  width: 2, background: `linear-gradient(180deg, ${stage.color}, ${stages[index + 1].color})`,
                  opacity: hoveredId === stage.id ? 1 : 0.3,
                  transition: 'opacity 0.3s ease',
                }} />
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: 12 }}>
                {stage.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {stage.projects.map((proj) => (
                  <span
                    key={proj}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
                      letterSpacing: 1, color: 'var(--text-muted)',
                      background: 'rgba(141,168,168,0.08)', border: '1px solid rgba(141,168,168,0.15)',
                      borderRadius: 3, padding: '3px 10px',
                      transition: 'all 0.2s ease', cursor: 'pointer',
                    }}
                    onClick={() => document.getElementById(`project-${proj.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr; gap: 16; }
          div[style*="textAlign: right"] { text-align: left; padding-right: 0; }
          div[style*="right: -16"] { display: none; }
        }
      `}</style>
    </section>
  )
}