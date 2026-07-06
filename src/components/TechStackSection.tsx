const categories = [
  {
    name: 'Languages',
    items: ['Python', 'Rust', 'C', 'C++', 'MATLAB'],
  },
  {
    name: 'AI & Scientific Computing',
    items: ['PyTorch', 'NumPy', 'SciPy', 'Pandas', 'Pymatgen', 'RAG', 'LLM fine-tuning', 'Scientific visualization', 'Jupyter'],
  },
  {
    name: 'Tools & Systems',
    items: ['Linux', 'Git', 'VS Code', 'WSL', 'Docker', 'Data engineering', 'LaTeX'],
  },
]

export function TechStackSection() {
  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 500, letterSpacing: '-.3px', marginBottom: 28 }}>
        Technical skills
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {categories.map((cat) => (
          <div key={cat.name}>
            <h3 style={{
              fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5,
              color: 'rgba(240,239,248,0.55)', marginBottom: 16, fontWeight: 500,
            }}>
              {cat.name}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {cat.items.map((item) => (
                <span key={item} style={{
                  fontSize: 12, color: '#c8d8ff',
                  border: '1px solid rgba(200,216,255,.2)', borderRadius: 20,
                  padding: '5px 14px', whiteSpace: 'nowrap',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
