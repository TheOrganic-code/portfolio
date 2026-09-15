import { useRef, useEffect, useState } from 'react'

const evidence = [
  {
    type: 'publication',
    title: 'Homogeneous to Multi-Scale Inhomogeneous Complex Magnetism in Ba3LnRu2O9 (Ln = Ho, Gd), Probed by μSR',
    venue: 'Physical Review B',
    status: 'Under Review',
    authors: 'S. Ghosh, E. Kushwaha, M. Kumar, G. Roy, K. Sharma, A. Pandey, F. L. Pratt, S. Cottrell, D. T. Adroja, T. Basu',
    year: '2026',
    link: null,
    accent: 'var(--accent-cyan)',
  },
  {
    type: 'publication',
    title: 'Development of a Physics-Informed Neural Framework, MEOWN, for Rapid Prediction of Muon Stopping Sites in Crystalline Materials',
    venue: 'Physical Review B',
    status: 'Under Review (First Author)',
    authors: 'A. Pandey, S. Ghosh, E. Kushwaha, G. Roy, T. Basu',
    year: '2026',
    link: null,
    accent: 'var(--accent-cyan)',
  },
  {
    type: 'award',
    title: 'Spallation Neutron Source / IPTS-36564',
    venue: 'Oak Ridge National Laboratory, USA',
    status: 'Competitive Neutron Beam Time — On-site Principal Investigator',
    authors: '',
    year: '2026',
    link: null,
    accent: 'var(--accent-copper)',
  },
  {
    type: 'award',
    title: 'ISRO Bharatiya Antariksh Hackathon 2026',
    venue: 'Indian Space Research Organisation',
    status: 'Ranked #2 in Problem Statement (India) — Selected for Next Round',
    authors: 'SatFetch: Cross-Modal Satellite Retrieval',
    year: '2026',
    link: null,
    accent: 'var(--accent-copper)',
  },
  {
    type: 'award',
    title: 'Union Bank Ideathon',
    venue: 'Union Bank of India',
    status: 'Finalist — Top 40 of 1,500+ Teams',
    authors: 'Fintech Innovation Track',
    year: '2025',
    link: null,
    accent: 'var(--accent-copper)',
  },
  {
    type: 'achievement',
    title: 'JEE Advanced',
    venue: 'Joint Entrance Examination (Advanced)',
    status: 'Qualified — Top 1–2% among ~1.5 Million Candidates',
    authors: '',
    year: '2025',
    link: null,
    accent: 'var(--text-muted)',
  },
]

export function EvidenceShelf() {
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
      id="evidence"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto 120px', padding: '0 32px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-labelledby="evidence-title"
    >
      <div style={{ marginBottom: 32 }}>
        <span className="section-index">05 / 06</span>
        <h2 id="evidence-title" style={{ marginTop: 8 }}>Evidence Shelf</h2>
        <p style={{ marginTop: 12, color: 'var(--text-muted)', maxWidth: 600, fontSize: 16 }}>
          Research outputs, competitive selections, and verified achievements. No badges — just facts.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {evidence.map((item, index) => (
          <article
            key={item.title}
            className="motion-core-panel"
            style={{
              padding: 24, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24,
              alignItems: 'start', opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 80}ms`,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600,
              color: item.accent, opacity: 0.5, lineHeight: 1,
              writingMode: 'vertical-rl', textOrientation: 'mixed',
              minWidth: 40,
            }}>
              {item.year}
            </div>

            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.3, marginBottom: 6 }}>
                {item.title}
              </h3>
              {item.authors && (
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, lineHeight: 1.5 }}>
                  {item.authors}
                </div>
              )}
              <div style={{ fontSize: 12, color: item.accent, marginBottom: 4, fontWeight: 500 }}>
                {item.venue}
              </div>
              <span style={{
                display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 9,
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1,
                padding: '3px 8px', borderRadius: 3,
                background: 'rgba(113,229,223,0.1)', color: item.accent,
                border: `1px solid ${item.accent}33`,
              }}>
                {item.status}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener"
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: 11 }}
                >
                  View
                </a>
              )}
              {!item.link && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
                  padding: '8px 12px', background: 'rgba(120,132,134,0.1)',
                  border: '1px solid rgba(141,168,168,0.15)', borderRadius: 3,
                }}>
                  Link unavailable
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          article { grid-template-columns: 1fr; grid-template-rows: auto auto auto; }
          div[style*="writingMode"] { writing-mode: horizontal-tb; font-size: 16px; opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}