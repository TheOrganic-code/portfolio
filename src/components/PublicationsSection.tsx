import { useRef, useEffect, useState } from 'react'

const papers = [
  {
    title: 'Homogeneous to Multi-Scale Inhomogeneous Complex Magnetism in Ba3LnRu2O9 (Ln = Ho, Gd), Probed by μSR',
    venue: 'Physical Review B',
    authors: 'S. Ghosh, E. Kushwaha, M. Kumar, G. Roy, K. Sharma, A. Pandey, F. L. Pratt, S. Cottrell, D. T. Adroja, T. Basu',
    status: 'in-progress',
    statusLabel: 'Under Review',
    year: '2026',
    link: null,
  },
  {
    title: 'Accelerated muon-site detection methodology for μSR using modern computational techniques',
    venue: 'Manuscript in preparation',
    authors: 'A. Pandey, S. Ghosh, E. Kushwaha, G. Roy, T. Basu',
    status: 'in-progress',
    statusLabel: 'In Preparation',
    year: '2026',
    link: null,
  },
]

export function PublicationsSection() {
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
      id="publications"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto 120px', padding: '0 32px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-labelledby="publications-title"
    >
      <div style={{ marginBottom: 32 }}>
        <span className="section-index">05 / 06</span>
        <h2 id="publications-title" style={{ marginTop: 8 }}>Publications & Evidence</h2>
        <p style={{ marginTop: 12, color: '#9b9a94', maxWidth: 600, fontSize: 16 }}>
          Peer-reviewed publications and research manuscripts. Links provided where available.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {papers.map((paper, index) => (
          <article
            key={paper.title}
            className="panel"
            style={{
              padding: 28, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24,
              alignItems: 'start', opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 100}ms`,
            }}
          >
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 24, fontWeight: 600,
              color: '#4ecdc4', opacity: 0.4, lineHeight: 1,
              writingMode: 'vertical-rl', textOrientation: 'mixed',
              minWidth: 40,
            }}>
              {paper.year}
            </div>

            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.3, marginBottom: 8 }}>
                {paper.title}
              </h3>
              <div style={{ fontSize: 12, color: '#4ecdc4', marginBottom: 4, fontWeight: 500 }}>
                {paper.venue}
              </div>
              <div style={{ fontSize: 13, color: '#9b9a94', marginBottom: 12, lineHeight: 1.6 }}>
                {paper.authors}
              </div>
              <span style={{
                display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 10,
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1,
                padding: '4px 10px', borderRadius: 4,
                background: 'rgba(245,158,11,0.12)', color: '#f59e0b',
                border: '1px solid rgba(245,158,11,0.2)',
              }}>
                {paper.statusLabel}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener"
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: 12 }}
                >
                  View Paper
                </a>
              )}
              {!paper.link && (
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 11, color: '#6b6a65',
                  padding: '8px 12px', background: 'rgba(155,154,148,0.08)',
                  border: '1px solid rgba(155,154,148,0.15)', borderRadius: 4,
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
          div[style*="writingMode"] { writing-mode: horizontal-tb; font-size: 18px; opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}