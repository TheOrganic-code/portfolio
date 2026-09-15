import { useRef, useEffect, useState } from 'react'

const timelineItems = [
  {
    date: 'Jan 2026 – Present',
    title: 'Undergraduate Researcher',
    org: 'Quantum Materials Lab, RGIPT',
    location: 'Jais, Amethi, Uttar Pradesh, India',
    type: 'research',
    description: 'Developing accelerated muon-site detection methodology for μSR experiments under Dr. Tathamay Basu. Physics-informed neural framework (MEOWN) for rapid prediction of muon stopping sites. First-author manuscript under review at Physical Review B. Competitive neutron beam time awarded at Spallation Neutron Source, ORNL (IPTS-36564) as On-site Principal Investigator.',
  },
  {
    date: 'May 2026 – Jul 2026',
    title: 'AI Engineer Intern',
    org: 'Digitwin Technology',
    location: 'Chennai, Tamil Nadu, India',
    type: 'industry',
    description: 'LoRA/QLoRA fine-tuning on industrial datasets, RAG pipelines over proprietary knowledge bases, KV cache optimization, FlashAttention, speculative decoding, vLLM deployment, translation of research-grade methods into production inference systems.',
  },
  {
    date: 'Jun 2026 – Present',
    title: 'Researcher',
    org: 'Qinetic Research Labs',
    location: 'Remote (US-based)',
    type: 'research',
    description: 'Quantum computing algorithms, quantum networking protocols, physics-informed neural networks for non-classical systems, theoretical foundations for quantum information processing.',
  },
  {
    date: 'Jul 2026 – Present',
    title: 'Data Scientist',
    org: 'ICCFGC',
    location: 'Coimbatore, Tamil Nadu, India',
    type: 'industry',
    description: 'ML and data-science work for urban planning and remote sensing applications. Spatial data analysis, satellite imagery processing, and predictive modeling for civic infrastructure.',
  },
  {
    date: 'Ongoing',
    title: 'Training & Placement Coordinator',
    org: 'Mathematical Sciences Department, RGIPT',
    location: 'Jais, Amethi, Uttar Pradesh, India',
    type: 'leadership',
    description: 'Coordinating placement activities, industry outreach, and student preparation for the Mathematical Sciences department.',
  },
  {
    date: '2025 – 2029',
    title: 'B.Tech. Mathematics and Computing',
    org: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)',
    location: 'Jais, Amethi, Uttar Pradesh, India',
    type: 'education',
    description: 'CPI: 8.22/10.0. Relevant coursework: real analysis, differential equations, number theory, optimization, numerical methods, computational physics, probability theory, linear algebra, systems programming.',
  },
]

const typeStyles: Record<string, { color: string; bg: string; border: string; label: string }> = {
  research: { color: 'var(--accent-cyan)', bg: 'rgba(113,229,223,0.1)', border: 'rgba(113,229,223,0.2)', label: 'RESEARCH' },
  industry: { color: 'var(--accent-copper)', bg: 'rgba(240,165,108,0.1)', border: 'rgba(240,165,108,0.2)', label: 'INDUSTRY' },
  leadership: { color: 'var(--accent-lilac)', bg: 'rgba(185,169,238,0.1)', border: 'rgba(185,169,238,0.2)', label: 'LEADERSHIP' },
  education: { color: 'var(--text-muted)', bg: 'rgba(120,132,134,0.1)', border: 'rgba(120,132,134,0.2)', label: 'EDUCATION' },
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const items = containerRef.current?.querySelectorAll('[data-index]')
    items?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      id="timeline"
      style={{
        position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto 120px', padding: '0 32px',
      }}
      aria-labelledby="timeline-title"
    >
      <div style={{ marginBottom: 40 }}>
        <span className="section-index">04 / 06</span>
        <h2 id="timeline-title" style={{ marginTop: 8 }}>Research & Experience Timeline</h2>
        <p style={{ marginTop: 12, color: 'var(--text-muted)', maxWidth: 600, fontSize: 16 }}>
          Chronological record of research positions, engineering roles, leadership, and education.
        </p>
      </div>

      <div style={{ position: 'relative', paddingLeft: 32 }}>
        <div className="timeline-line" />

        {timelineItems.map((item, index) => {
          const isVisible = visibleItems.has(index)
          const styles = typeStyles[item.type]
          const dotColor = styles.color

          return (
            <div
              key={`${item.date}-${item.title}`}
              data-index={index}
              style={{
                position: 'relative', marginBottom: 40, paddingLeft: 24,
                opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <div style={{
                position: 'absolute', left: -32, top: 6, width: 12, height: 12,
                borderRadius: '50%', background: dotColor, border: `3px solid var(--bg-void)`,
                boxShadow: `0 0 0 1px ${styles.border}`,
                zIndex: 1,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                <span className="meta-label" style={{ whiteSpace: 'nowrap' }}>{item.date}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
                  letterSpacing: 1, color: styles.color, background: styles.bg,
                  border: `1px solid ${styles.border}`, borderRadius: 3, padding: '2px 8px',
                }}>
                  {styles.label}
                </span>
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{item.title}</h3>
              <div style={{
                fontSize: 14, color: styles.color, marginBottom: 4,
                display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
              }}>
                <span>{item.org}</span>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{item.location}</span>
              </div>

              <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.7 }}>
                {item.description}
              </p>
            </div>
          )
        })}

        <div style={{
          position: 'absolute', left: 11, bottom: -20, width: 12, height: 12,
          borderRadius: '50%', background: 'var(--bg-void)', border: '1px solid rgba(141,168,168,0.2)',
        }} />
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          div[style*="paddingLeft: 32"] { padding-left: 24; }
          div[style*="left: -32"] { left: -24; }
          .timeline-line { left: 11; }
        }
      `}</style>
    </section>
  )
}