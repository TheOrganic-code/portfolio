const papers = [
  {
    title: 'Homogeneous to Multi-Scale Inhomogeneous Complex Magnetism in Ba3LnRu2O9 (Ln = Ho, Gd), Probed by μSR',
    venue: 'Physical Review B',
    authors: 'S. Ghosh, E. Kushwaha, M. Kumar, G. Roy, K. Sharma, A. Pandey, F. L. Pratt, S. Cottrell, D. T. Adroja, T. Basu',
    status: 'in-progress' as const,
    statusLabel: 'Under Review',
  },
  {
    title: 'Accelerated muon-site detection methodology for μSR using modern computational techniques',
    venue: 'Upcoming manuscript',
    authors: 'First author · Quantum Materials Lab, RGIPT',
    status: 'in-progress' as const,
    statusLabel: 'In Preparation',
  },
]

export function PublicationsSection() {
  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 500, letterSpacing: '-.3px', marginBottom: 28 }}>
        Publications
      </h2>
      {papers.map((p) => (
        <div
          key={p.title}
          className="pub-card"
          style={{
            padding: 24, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
            marginBottom: 16, background: 'rgba(255,255,255,0.04)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,216,255,0.3)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
          }}
        >
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 600, marginBottom: 6 }}>
            {p.title}
          </h3>
          <div style={{ fontSize: 12, color: '#7b68ee', marginBottom: 4, fontWeight: 500 }}>
            {p.venue}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(240,239,248,0.55)', marginBottom: 8 }}>
            {p.authors}
          </div>
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 1, padding: '3px 8px', borderRadius: 4,
            background: 'rgba(245,158,11,0.12)', color: '#f59e0b',
          }}>
            {p.statusLabel}
          </span>
        </div>
      ))}
    </section>
  )
}
