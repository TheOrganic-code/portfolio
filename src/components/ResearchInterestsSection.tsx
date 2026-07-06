const interests = [
  'Scientific machine learning', 'Differentiable programming', 'Computational physics',
  'Condensed matter physics', 'Quantum computing', 'Quantum information',
  'Probabilistic computing', 'PINNs', 'High-performance ML systems',
  'Rust for scientific computing', 'RAG', 'LLM fine-tuning',
  'Stochastic optimization', 'Energy-based models', 'Spin systems',
  'HPC', 'AI-driven scientific discovery', 'Materials discovery',
  'Differentiable physics', 'Inverse problems', 'Numerical optimization',
  'Bayesian methods', 'Scientific software infrastructure',
]

export function ResearchInterestsSection() {
  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {interests.map((interest) => (
          <span key={interest} style={{
            fontSize: 12, color: '#c8d8ff',
            border: '1px solid rgba(200,216,255,.2)', borderRadius: 20,
            padding: '5px 14px', whiteSpace: 'nowrap',
          }}>
            {interest}
          </span>
        ))}
      </div>
    </section>
  )
}
